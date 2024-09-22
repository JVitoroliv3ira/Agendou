import {Injectable} from "@angular/core";
import {AbstractHttpService} from "../abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../domain/dtos/responses/api-response";
import {UserRegistrationRequest} from "../../domain/dtos/requests/user-registration-request";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  public register(request: UserRegistrationRequest): Observable<ApiResponse<string>> {
    return this.post<ApiResponse<string>>(
      "http://localhost:8080/api/v1/auth/register",
      request
    );
  }
}
