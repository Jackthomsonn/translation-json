import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {
  public exceptionCaught: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }
}
