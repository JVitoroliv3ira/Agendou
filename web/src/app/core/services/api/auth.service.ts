import {Injectable} from "@angular/core";
import {AbstractHttpService} from "../abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../domain/dtos/responses/api-response";
import {UserRegistrationRequest} from "../../domain/dtos/requests/user-registration-request";
import {UserAuthenticationRequest} from "../../domain/dtos/requests/user-authentication-request";
import {AuthenticatedUserResponse} from "../../domain/dtos/responses/authenticated-user-response";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractHttpService {
  private readonly path = '/auth';

  constructor(http: HttpClient) {
    super(http);
  }

  public register(request: UserRegistrationRequest): Observable<ApiResponse<string>> {
    return this.post<ApiResponse<string>>(
      `${this.BASE_API_URL}${this.path}/register`,
      request
    );
  }

  public login(request: UserAuthenticationRequest): Observable<ApiResponse<AuthenticatedUserResponse>> {
    return this.post<ApiResponse<AuthenticatedUserResponse>>(
      `${this.BASE_API_URL}${this.path}/token`,
      request
    );
  }
}
