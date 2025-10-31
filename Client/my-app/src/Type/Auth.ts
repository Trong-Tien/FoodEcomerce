export interface Register {
  email: string;
  otp: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface OtpResponse {
  status: number;
  message: string;
  success: boolean;
}
