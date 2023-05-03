import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { AuthentictaionService } from './authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthentictaionService, private loadingService: LoaderService,private toastr:ToastrService) { }
    private totalRequests = 0;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalRequests++;
        this.loadingService.setLoading(true);
        
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
            }
        });
         next.handle(request);
        return next.handle(request).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests == 0) {
                    this.loadingService.setLoading(false);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                if (error.error instanceof ErrorEvent) {
                   errorMsg = `Error: ${error.error.message}`;
                   this.toastr.error(errorMsg)
                } else {
                    // ${error.status} :
                   this.toastr.error(` ${error.error.message ? error.error.message : error.statusText } `)
                }
                return throwError(errorMsg);
             })
        );
    }
}  