import { Directive } from '@angular/core';

@Directive({
  selector: '[appThousandsSeparator]',
  standalone: true
})
export class ThousandsSeparatorDirective {

  constructor() { }

}
