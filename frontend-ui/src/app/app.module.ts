import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@src/app/shared/shared.module';
import { AppRoutingModule } from '@src/app/app-routing.module';

import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/views/home/home.component';

import { HttpInterceptorProviders } from '@src/app/shared/interceptors';
import { StockPriceService } from '@src/app/shared/services/stock-price.service';
import { HttpProgressService } from '@src/app/shared/services/http-progress.service';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '../assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  providers: [StockPriceService, HttpProgressService, HttpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
