import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeTranslator'
})

export class LocaleTranslatorPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    for (const key in args.langs) {
      if (key === value.split('-').pop()) {
        return args.langs[key];
      }
    }
  }
}
