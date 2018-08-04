import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHeaderOptions } from '../../interfaces/IHeaderOptions';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  public setup: BehaviorSubject<any> = new BehaviorSubject<IHeaderOptions>(undefined);

  constructor() { }
}
