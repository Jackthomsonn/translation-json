import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {
  @Input()
  public options: string[];

  @Input()
  public multiple: boolean;

  @Input()
  public text: string;

  @Output()
  public chosenLocales: EventEmitter<any> = new EventEmitter<any>();

  public shouldShowOptions: boolean;
  public chosenLocalesList: string[] = [];

  @HostListener('click', ['$event'])
  public onClick(event) {
    if (event.target.className === 'select-container') {
      this.shouldShowOptions = !this.shouldShowOptions;
    }
  }

  public addOption = (option: string) => {
    if (!this.multiple) {
      this.chosenLocalesList = [];
    }

    if (this.chosenLocalesList.includes(option)) {
      const index = this.chosenLocalesList.indexOf(option);
      this.chosenLocalesList.splice(index, 1);
    } else {
      this.chosenLocalesList.push(option);
    }

    this.chosenLocales.next(this.chosenLocalesList);
  }

  public isSelected = (option: string) => {
    return this.chosenLocalesList.includes(option);
  }
}
