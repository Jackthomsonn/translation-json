import { ITranslation } from './../../interfaces/ITranslation';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  constructor(private http: HttpClient) { }

  public translate = (data: ITranslation) => {
    return this.http.post('api/translate', data);
  }
}
