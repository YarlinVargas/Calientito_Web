import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconDefinition, faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FieldErros } from '../../global/getFieldErros';
import { timer } from 'rxjs';

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss'],
  providers:[{provide:NG_VALUE_ACCESSOR, useExisting: FieldInputComponent, multi:true}]
})
export class FieldInputComponent implements ControlValueAccessor {

  @Input() holder:string='';
  @Input()
  parentForm!: FormGroup;
  @Input()
  fieldName!: string;
  @Input()
  control!: FormControl;
  @Input() disabled: boolean=false;
  @Input() color = 'sky';
  @Input() directive: string = "";
  @Input() maxDate:string='';

  @Input({
    required: false,
    alias: 'permitirIcono'
  }) allowIcon: boolean = false;

  @Input({
    required: false,
    alias: 'iconoBuscador'
  }) iconInput: IconDefinition = faSearch;

  @Input({
    required: false,
    alias: 'sugerencias'
  }) suggestions: string[] = [];

  public typeInput = {
    init: 'text',
    change: 'text'
  }

  @Input() set type(value: string) {
    this.typeInput = {
      change: value || 'text',
      init: value || 'text'
    };
  }

  @Output() public selectSuggestion: EventEmitter<string> = new EventEmitter<string>();
  @Output() value: EventEmitter<string> = new EventEmitter();

  @ViewChild('passwordInput')
  public passwordInput!: ElementRef<HTMLInputElement>;

  campo='';
  private onChangefn!: Function;
  public iconEye: IconDefinition = faEye;
  // public iconEyeSlash: IconDefinition = faEyeSlash;


  fieldError = new FieldErros();

  get formFiled(): FormControl{
    if(this.control!=undefined){
      return this.control;
    }else{
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

  Change($event:any):void{
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

  public selectSuggestionEvent(suggestion: string) {
    this.selectSuggestion.emit(suggestion);
  }

  public allowOrDisallowPassword() {
    this.passwordInput.nativeElement.classList.remove('show-text');
    this.passwordInput.nativeElement.classList.add('hide-password');

    timer(300).subscribe(() => {
      this.iconEye = this.iconEye == faEye ? faEyeSlash : faEye;
      this.passwordInput.nativeElement.classList.remove('hide-password');
      this.passwordInput.nativeElement.classList.add('show-text');
      this.typeInput.change = this.typeInput.change == 'password' ? 'text' : 'password';
    });
  }

  get colors() {
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
