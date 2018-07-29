import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  constructor(private http: HttpClient) { }

  public translate = (data: any) => {
    return this.http.post('http://localhost:8080/translate', data);
  }
}
