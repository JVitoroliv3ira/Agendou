import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractHttpService {
  protected readonly BASE_API_URL = environment.apiUrl;

  protected constructor(protected http: HttpClient) {
  }

  get<T>(url: string, params?: any, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, {params, headers});
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, {headers});
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, {headers});
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, {headers});
  }
}
