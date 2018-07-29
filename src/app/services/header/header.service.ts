import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  public setup: Subject<any> = new Subject<any>();

  constructor() { }
}
