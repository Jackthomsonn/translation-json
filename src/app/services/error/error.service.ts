import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {
  public exceptionCaught: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }
}
