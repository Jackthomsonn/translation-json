import { Component, OnInit, Input, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})

export class SwitchComponent implements OnInit {
  @Input() option: string;

  @Output() chosenOption: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('class.selected')
  @Input() isSelected: boolean;

  @HostListener('click') detectClick() {
    this.isSelected = !this.isSelected;
    this.chosenOption.next(this.option);
  }

  constructor() { }

  ngOnInit() {
  }

}
