import {Injectable} from "@angular/core";
import {AbstractHttpService} from "../abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../domain/dtos/responses/api-response";

@Injectable({
  providedIn: 'root',
})
export class VersionService extends AbstractHttpService {
  private readonly path = '/version';

  constructor(http: HttpClient) {
    super(http);
  }

  public getVersion(): Observable<ApiResponse<string>> {
    return this.get<ApiResponse<string>>(
      `${this.BASE_API_URL}${this.path}`
    );
  }
}
