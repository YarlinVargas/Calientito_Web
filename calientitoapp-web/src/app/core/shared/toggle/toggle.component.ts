import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleComponent, multi:true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {

  @Input()
  identity!: string;
  @Input()
  active!: boolean;
  @Input() size:string='normal';
  @Input()
  textTooltip!: string;
  @Input()
  parentForm!: FormGroup;
  @Input() fieldName: string='none';
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  public iconCheck = faCheck;
  public iconMark = faXmark;

  a:boolean = true;

  private onChangefn!: Function;
  campo='';

  get formField(): FormControl{
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  constructor() { }

  writeValue(value: any): void {
    this.active=value
  }

  registerOnChange(fn: any): void {
    this.onChangefn=fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  public SendChange(event:any) {
    this.active = event.target.checked;
    if (this.fieldName != 'none')
      this.onChangefn(event.target.checked);

    this.getValue.emit(event.target.checked);
  }

  public onCheckboxClick(event: any): void {
    event.preventDefault();
    this.getValue.emit(event.target.checked);
  }
}
