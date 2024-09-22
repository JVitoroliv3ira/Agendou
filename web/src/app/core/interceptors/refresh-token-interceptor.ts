import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {AuthenticatedUserService} from "../services/authenticated-user.service";
import {catchError, finalize, Observable, switchMap, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticatedUserResponse} from "../domain/dtos/responses/authenticated-user-response";
import {AuthService} from "../services/api/auth.service";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthenticatedUserService,
    private http: HttpClient,
    private authApiService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !this.isRefreshing) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;

    const refreshToken = this.authService.getRefreshToken();
    if (refreshToken) {
      return this.authApiService.refreshToken(refreshToken).pipe(
        switchMap((response) => {
          this.authService.saveUser({
            ...this.authService.getUser() ?? {} as AuthenticatedUserResponse,
            token: response.content ?? ''
          });

          return next.handle(this.addTokenHeader(request, response.content ?? ''));
        }),
        catchError((err) => {
          this.authService.clearUser();
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }

    return throwError(() => new Error('No refresh token available'));
  }
}
