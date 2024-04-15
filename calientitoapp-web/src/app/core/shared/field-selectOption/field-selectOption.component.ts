import { Component, Input, forwardRef } from '@angular/core';
import { ValueSelect } from '../../models/value-select.model';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-field-selectOption',
  templateUrl: './field-selectOption.component.html',
  styleUrls: ['./field-selectOption.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldSelectOptionComponent),
      multi: true
    }
  ]
})
export class FieldSelectOptionComponent implements ControlValueAccessor {

  @Input() id: string = 'select';
  @Input() defaultValue: string='Seleccione una opción';
  @Input() allValues: ValueSelect[] = [];
  @Input()
  parentForm!: FormGroup;
  @Input()
  fieldName!: string;
  // @Input() control:FormControl;
  @Input() disabled:boolean=false;
  @Input() color = 'sky';

  public campo: string = '';
  private onChangefn!: Function;

  constructor() {}

  writeValue(value: any): void {
    this.campo = value;
  }

  registerOnChange(fn: any): void {
    this.onChangefn = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  public get colors() {
    return {
      'text-sky500': this.color == 'sky',
      'ring-sky500': this.color == 'sky',
      'focus:ring-sky500':this.color =='sky',

      'text-sky700': this.color == 'primary',
      'ring-sky700': this.color == 'primary',
      'focus:ring-sky700':this.color =='primary',

      'text-teal500': this.color == 'cyan',
      'ring-teal-500': this.color == 'cyan',
      'focus:ring-teal-500':this.color =='cyan'
    };
  }
}
