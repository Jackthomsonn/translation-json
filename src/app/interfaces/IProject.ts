import { ITranslation } from './ITranslation';
export interface IProject {
  _id?: string;
  name: string;
  baseLocale: string;
  translations: ITranslation[];
  status: string;
}
