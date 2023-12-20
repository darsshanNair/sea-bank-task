export interface AuthenticationState {
  loading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}
