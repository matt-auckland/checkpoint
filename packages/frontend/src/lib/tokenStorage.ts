// Lets just store the token in memory
let token: string | null = null;

export function clearAuthToken() {
  token = null;
}

export function setAuthToken(newToken: string | null) {
  token = newToken;
}

export function getAuthToken(): string | null {
  return token;
}
