import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.translateService.setDefaultLang('en');

    this.translate('en');
  }

  translate(lang: string): void {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
