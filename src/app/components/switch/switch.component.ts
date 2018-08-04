import { Component, Input, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})

export class SwitchComponent {
  @Input() option: string;

  @Output() chosenOption: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('class.selected') @Input() isSelected: boolean;

  @HostListener('click')
  public onClick() {
    this.isSelected = !this.isSelected;
    this.chosenOption.next(this.option);
  }
}
