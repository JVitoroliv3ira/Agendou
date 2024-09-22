export interface ApiResponse<T> {
  content: T | null;
  errors: { [key: string]: string[] } | null;
}
