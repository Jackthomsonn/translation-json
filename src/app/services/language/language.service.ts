import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  constructor(private http: HttpClient) { }

  public getLanguages = (languagesForChosenLocale?: string) => {
    let data: string;

    if (languagesForChosenLocale) {
      data = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=${languagesForChosenLocale}`;
    } else {
      data = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?';
    }

    return this.http.post('http://localhost:8080/languages', { url: data });
  }
}
