import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeTranslator'
})

export class LocaleTranslatorPipe implements PipeTransform {
  transform(value: string, args?: { [key: string]: any }): string {
    for (const key in args.langs) {
      if (key === value.split('-').pop()) {
        return args.langs[key];
      }
    }
  }
}
