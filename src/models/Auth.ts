export interface IAuthInputs {
  username: string;
  password: string;
}

export interface AuthRequest extends IAuthInputs {
  fingerprint: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRefreshRequest {
  fingerprint: string;
  refreshToken: string;
}
