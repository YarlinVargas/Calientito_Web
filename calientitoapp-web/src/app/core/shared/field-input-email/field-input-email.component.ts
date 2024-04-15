import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldErros } from '../../global/getFieldErros';

@Component({
  selector: 'app-field-input-email',
  templateUrl: './field-input-email.component.html',
  styleUrls: ['./field-input-email.component.scss'],
  providers:[{ provide:NG_VALUE_ACCESSOR, useExisting: FieldInputEmailComponent, multi:true}]
})
export class FieldInputEmailComponent implements ControlValueAccessor {

  @Input() holder:string='';
  @Input()
  parentForm!: FormGroup;
  @Input()
  control!: FormControl;
  @Input() disabled: boolean=false;
  @Input()
  fieldName!: string;

  private onChangefn!: Function;

  public campo: string = '';
  fieldError = new FieldErros();

  get formFiled(): FormControl {
    if (this.control!=undefined) {
      return this.control;
    } else {
      return this.parentForm.get(this.fieldName) as FormControl;
    }
  }

  get formFieldValue() {
    if(this.control!=undefined){
      return this.control.value;
    }else{
      return this.parentForm?.get(this.fieldName)?.value;
    }
  }

  Change($event: any): void {
    let campo: string = $event.target.value;
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!emailRegex.test(campo))
      this.formFiled.setErrors({ emailinvalid: true });

    this.onChangefn($event.target.value);
  }

  writeValue(value: any): void {
    this.campo = value;
  }

  registerOnChange(fn: any): void {
    this.onChangefn=fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
