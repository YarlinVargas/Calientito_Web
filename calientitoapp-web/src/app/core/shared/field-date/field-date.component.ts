import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-field-date',
  templateUrl: './field-date.component.html',
  styleUrls: ['./field-date.component.scss'],
  providers:[{provide:NG_VALUE_ACCESSOR, useExisting: FieldDateComponent, multi:true}]
})
export class FieldDateComponent implements ControlValueAccessor {


  @Input()
  control!: FormControl;
  @Input() disabled:boolean=false;

  @Input()
  parentForm!: FormGroup;
  @Input()
  fieldName!: string;

  @Input() clearDate:boolean = false;
  @Input() startDate:string='';
  @Input() endDate:string='';

  @Input()
  dateEmitir!: 'initialDate' | 'finalDate';

  showDatePicker: boolean = true;

  @Output() dateEnd = new EventEmitter<string>();
  @Output() dateInitial = new EventEmitter<string>();

  campo='';

  date:string =''
  rangeDate:string =''

  validInput=true
  private onChangefn!: Function;

  get formFiled(): FormControl{
    if(this.control!=undefined){
      return this.control;
    }else{
      return this.parentForm.get(this.fieldName) as FormControl;
    }
  }

  dateSelected() {
    if(this.startDate==''){
      this.startDate=this.date
    }else if(this.endDate == '' && this.startDate!=''){

      var fechaInicial = new Date(this.startDate);
      var fechaFinal = new Date(this.date);
      if (fechaInicial <= fechaFinal) {
        this.endDate=this.date
        this.showDatePicker = !this.showDatePicker;
      }else{
        this.endDate=''
        this.validInput=false
      }

    }else if(this.startDate!='' && this.endDate!=''){
      this.showDatePicker = !this.showDatePicker;
    }
    this.validInput=false
    this.date=''
  }
  // dateSelected() {

  //   var fechaInicial = new Date(this.startDate);
  //   var fechaFinal = new Date(this.endDate);
  //   if (fechaInicial <= fechaFinal) {
  //     this.showDatePicker = !this.showDatePicker;
  //     this.rangeDate = this.startDate + ' - ' + this.endDate
  //   } else {
  //     this.endDate = ''
  //     this.validInput = false
  //   }
  // }

  toggleDatePicker() {
    this.startDate=''
    this.endDate=''
    this.showDatePicker = !this.showDatePicker;
  }

  Change($event:any):void{
    // if(this.dateEmitir == 'initialDate'){
    //   this.dateInitial.emit( this.startDate);
    // }else{
    //   if(this.dateEmitir == 'finalDate'){
    //     this.dateEnd.emit( this.endDate);
    //   }
    // }
    this.dateInitial.emit(this.startDate);
    this.dateEnd.emit(this.endDate);
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
