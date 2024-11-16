import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ListModel } from '../../models/general/general.model';
import { FieldErros } from '../../global/getFieldErros';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FieldSelectComponent, multi: true }]
})
export class FieldSelectComponent implements OnInit, OnDestroy, ControlValueAccessor , OnChanges{

  public optionsList: ListModel[] = [];

  @Input() set options(value: ListModel[]) {
      this.optionsList = value;
      this.listFilter = [];
  };

  @Input()
  parentForm!: FormGroup;
  @Input()
  fieldName!: string;
  @Input()
  control!: FormControl;

  @Input() set defaultSelectOption(value: number | undefined) {
    if (value != null && this.optionsList?.length) {
      this.selectedIndex = this.optionsList.findIndex((option) => option.id === value);
    }
  }

  @Output() valor: EventEmitter<any> = new EventEmitter();

  private onChangefn!: Function;

  selectedIndex: any = -1;
  isExpanded = false;
  id = Math.random().toString(36).substring(7); // Generar un ID único
  campo = '';
  textValue = 'Seleccione una opción';

  down = faSortDown; // FELCHA HACIA ABAJO
  dropdownLeft!: string;
  dropdownTop!: string;
  dropdownWidth!: string;
  fieldError = new FieldErros();

  /* control */
  filter: FormControl = new FormControl('');
  listFilter: ListModel[] = [];

  public destroy$: EventEmitter<void> = new EventEmitter<void>();

  constructor(private renderer: Renderer2, private el: ElementRef) { }


  ngOnChanges(changes: SimpleChanges) {
    debugger
    if(changes['options'] && changes['options'].currentValue != undefined){
      this.optionsList = [{ id: '', name: 'Seleccione una opción', }, ...this.optionsList];
      this.listFilter = this.optionsList;
      if (this.formField.value != null && this.formField.value != undefined && this.optionsList.length>0) {
        const index = this.optionsList.findIndex(item => item.id === this.formField.value);
        if (index >= 0) {
          this.selectedIndex = index;
          this.selectedOption;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.renderer.destroy();
    this.destroy$.emit();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target)) {
        this.isExpanded = false;
      }
    });

    this.changeField();
    this.changeFilter();
  }

  get selectedOption(): string {

    if (this.formField.value != null && this.formField.value != undefined && this.listFilter.length>0) {
      return this.listFilter.filter(item => item.id === this.formField.value)[0].name;
    }
    return '';
  }

  get formField(): FormControl {
    if (this.control != undefined) {
      return this.control;
    } else {
      return this.parentForm.get(this.fieldName) as FormControl;
    }
  }

  changeField() {
    this.formField.valueChanges.subscribe((resp) => {

      if (resp == null || resp == undefined) {
        this.selectedIndex = -1;
        this.selectedOption;
      }else{
        this.selectedOption;
      }
    })
  }

  changeFilter() {
    this.filter.valueChanges
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(resp => {
      if (resp !== "") {
        if (this.listFilter.length == 0)
          this.listFilter = this.optionsList;

        this.optionsList = this.listFilter.filter(opcion =>
          opcion.name?.toLowerCase()?.includes(resp.toLowerCase())
        );
      } else if (this.listFilter.length > 0) {
        this.optionsList = this.listFilter;
      }
    });
  }

  toggleOptions(): void {
    this.isExpanded = !this.isExpanded;
    this.filter.setValue("");
    setTimeout(() => {
      this.calculateDropdownPosition();
    }, 50);
  }

  selectOption(index: number | string): void {
    this.selectedIndex = this.listFilter.findIndex((i:ListModel)  => i.id == index);
    const id: number | string = this.listFilter[this.selectedIndex].id;
    this.onChangefn(id);
    this.valor.emit(id);
    this.isExpanded = !this.isExpanded;
    this.filter.setValue("");
  }

  get elementRef(): ElementRef {
    return new ElementRef(this.el.nativeElement);
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        this.selectNextOption();
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.selectPreviousOption();
        event.preventDefault();
        break;
      case 'Tab':
        this.closeOptions();
        break;
      case 'Enter':
        this.closeOptions();
        break;
      default:
        // Otro manejo de teclas si es necesario
        break;
    }
  }

  selectNextOption() {
    if (this.selectedIndex < this.optionsList?.length - 1) {
      this.selectedIndex++; // Incrementa el índice de la opción seleccionada
      //this.selectedOption; // Actualiza el texto del botón
      //this.selectOption(this.selectedIndex);
    }
  }

  selectPreviousOption() {
    if (this.selectedIndex > -1) {
      this.selectedIndex--; // Decrementa el índice de la opción seleccionada
      //this.selectedOption; // Actualiza el texto del botón
      //this.selectOption(this.selectedIndex);
    }
  }

  closeOptions() {
    this.isExpanded = !this.isExpanded; // Cierra la lista de opciones
    const id = this.listFilter[this.selectedIndex].id;
    this.selectOption(id);
  }

  writeValue(value: any): void {
    this.campo = value;
  }

  registerOnChange(fn: any): void {
    this.onChangefn = fn;
  }

  registerOnTouched(_: any): void { }

  setDisabledState?(_: boolean): void { }

  calculateDropdownPosition() {
    const buttonEl = this.el.nativeElement.querySelector('.custom-select-button');
    const dropdownEl = this.el.nativeElement.querySelector('.custom-select-options');
    if (buttonEl && dropdownEl) {
      const buttonRect = buttonEl.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.dropdownLeft = buttonRect.left + 'px';
      this.dropdownTop = buttonRect.bottom + scrollTop + 'px';
      this.dropdownWidth = buttonRect.width + 'px';
    }
  }

}
