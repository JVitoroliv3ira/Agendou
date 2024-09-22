export interface AuthenticatedUserResponse {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}
