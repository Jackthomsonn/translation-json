import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {
  @Input() options: any[];
  @Output() chosenLocales: EventEmitter<any> = new EventEmitter<any>();
  @Input() multiple: boolean;
  @Input() text: string;
  public shouldShowOptions: boolean;
  public chosenLocalesList: any[] = [];

  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.target.className === 'select-container') {
      this.shouldShowOptions = !this.shouldShowOptions;
    }
  }

  public addOption = (option: any) => {
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

  public isSelected = (option: any) => {
    return this.chosenLocalesList.includes(option);
  }

  constructor() { }

  ngOnInit() {
  }
}
