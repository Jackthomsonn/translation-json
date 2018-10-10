import { ITeamLink } from './ITeamLink';

export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  phoneNumber?: number;
  teamId?: string;
  twoFactorAuthEnabled?: boolean;
  properties?: {
    team: ITeamLink
  };
  permissions?: any[];
}
