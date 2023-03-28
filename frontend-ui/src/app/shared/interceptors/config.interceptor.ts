import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '@src/environments/environment';
import { HttpProgressService } from '@src/app/shared/services/http-progress.service';

@Injectable()
export class ConfigInterceptor implements HttpInterceptor {
  constructor(private httpProgressService: HttpProgressService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Accept: request.headers.get('Accept') || `application/json`,
        'Content-Type': request.headers.get('Content-Type') || `application/json; charset=utf-8`,
      },
      url: request.url.replace('$BASE_URL', environment.api.baseUrl),
    });

    return next.handle(request).pipe(
      tap((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.httpProgressService.updateProgressCheck(true);
        } else if (event.type === HttpEventType.Response) {
          setInterval(() => {
            this.httpProgressService.updateProgressCheck(false);
          }, 300);
        }
      }),
    );
  }
}
