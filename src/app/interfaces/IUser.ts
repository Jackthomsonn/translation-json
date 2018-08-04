export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  phoneNumber?: number;
  twoFactorAuthEnabled?: boolean;
  properties?: { [key: string]: any };
}
