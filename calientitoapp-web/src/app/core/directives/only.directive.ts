import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnly]'
})
export class OnlyDirective {

  @Input('appOnly')
  type!: string;
  @Input('appOnlyOption')
  option!: 'Lower' | 'Upper';

  constructor(private el: ElementRef, private render: Renderer2, private control: NgControl) {
  }

  @HostListener('input') oninput() {
    const abstractControl  = this.control.control;
    let value = this.el.nativeElement.value;
    let applyRegs: RegExp[] = [];

    if (this.type === 'Letters')// no permite caracteres
      applyRegs = [/[0-9_-]+/g, /[\\#+\[\]@$~%'":*¿?<°(),.&/|¨´;>{}!¡=]/g];
    else if (this.type === 'LettersOnly') // permite caracteres -(&)/
      applyRegs = [/[0-9_]+/g, /[\\#+\[\]@$~%'":*¿?<°|¨´;>{}!¡=]/g];
    else if (this.type === 'Numbers') // Permite solo valores númericos
      applyRegs = [/\D/g]
    else if (this.type === 'NumbersLetters')// No permite caracteres
      applyRegs = [/[\\#+\[\]@$~|¬^°¨%'"_;&:*¿?<>(/´)\-,.{}!¡=]/g];
    else if (this.type === 'NumbersLettersOnly')// permite caracteres ()-/&.,
      applyRegs = [/[\\#+\[\]@$~|¬^°¨%'"_;:*¿?<>{}!¡=]/g];
    else if (this.type === 'NumbersLettersDot')// permite .
      applyRegs = [/[\\#+\[\]@$~|¬^°¨%'"_;&:*¿?<>(/´)\-,{}!¡=]/g];

    if (this.type && applyRegs.length) {
      value = this.applyRegex(value, applyRegs);
      this.render.setProperty(this.el.nativeElement, 'value', value);
      abstractControl?.setValue(value);
    }

    if (this.option === 'Lower') {
      value = value.toLowerCase();
      this.render.setProperty(this.el.nativeElement, 'value', value);
      this.setValueControl(abstractControl, value);
    } else if (this.option === 'Upper') {
      value = value.toUpperCase();
      this.render.setProperty(this.el.nativeElement, 'value', value);
      this.setValueControl(abstractControl, value);
    }
  }

  @HostListener('change') onchange() {
    let value = this.el.nativeElement.value;
    value = value.trim();
    if (value === '') {
      value = null;
      const abstractControl = this.control.control;
      abstractControl?.setValue(value);
      abstractControl?.updateValueAndValidity();
    }
    this.render.setProperty(this.el.nativeElement, 'value', value);
  }

  private setValueControl(abstractControl:any, value:any) {
    if (abstractControl)
      abstractControl.setValue(value);
  }

  private applyRegex(text: string, patterns: string[] | RegExp[]) {
    let result = text;

    patterns.forEach(pattern => {
      result = typeof pattern === 'string' ?
        result.replace(new RegExp(pattern), '') :
        result.replace(pattern, '');
    });

    return result;
  }

}
