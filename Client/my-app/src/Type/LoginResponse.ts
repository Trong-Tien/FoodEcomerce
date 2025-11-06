export interface LoginResponse {
  id: string;
  userName: string;
  phoneNumber: string | null;
  email: string;
  address: string | null;
  cartId: string;
  roleId: string;
  accessToken: string;
  refeshToken: string;
  status: number;
  message: string | number;
  expires: string;
}