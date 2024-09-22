import {Injectable} from '@angular/core';
import {AuthenticatedUserResponse} from "../domain/dtos/responses/authenticated-user-response";
import {LocalStorageUtils} from "../utils/local-storage.utils";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  private readonly USER_KEY = 'AUTHENTICATED_USER';

  saveUser(user: AuthenticatedUserResponse): void {
    LocalStorageUtils.add(this.USER_KEY, user);
  }

  getUser(): AuthenticatedUserResponse | null {
    return LocalStorageUtils.get<AuthenticatedUserResponse>(this.USER_KEY);
  }

  clearUser(): void {
    LocalStorageUtils.remove(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  getToken(): string | null {
    const user = this.getUser();
    return user ? user.token : null;
  }

  getRefreshToken(): string | null {
    const user = this.getUser();
    return user ? user.refreshToken : null;
  }
}
