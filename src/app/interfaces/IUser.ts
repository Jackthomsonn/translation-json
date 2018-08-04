import { ITeamLink } from './ITeamLink';

export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  phoneNumber?: number;
  twoFactorAuthEnabled?: boolean;
  properties?: {
    team: ITeamLink
  };
}
