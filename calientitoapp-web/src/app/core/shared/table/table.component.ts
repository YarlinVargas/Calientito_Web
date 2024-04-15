import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Actions } from '../../models/general/actions-table.model';
import { faPen, faXmark, faList, faLink, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TootilpOption } from '../../models/tooltip-options.model';
import { ScrollIndicatorService } from '../../services/gen/scroll-indicator.service';
import { Subject, delay, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public defaultOptionsTooltip: TootilpOption = {
    enable: false,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0
  }

  @Input()
  headers!: string[];
  @Input() data: { [key: string]: any }[] = [];
  @Input() keyMap: { [header: string]: string } = {};
  @Input() actions: Actions[] = [];
  @Input() positionTable: 'center' | 'left' = 'center';
  @Input() maxWidthTable: string = '91.66%';
  @Input({
    required: false,
    alias: 'nombreCampoAEmitir'
  }) idOut: string = 'id_usuario';
  @Input()
  listaEmitir!: 'listPaciente' | 'detalleResultado';
  @Input({ required: false }) close: boolean = false;

  public seePdf: boolean = false;

  @Input() set viewPDF(value: boolean) {
    this.seePdf = value;
    if (value) this.activeButtonIndex = -1;
  }

  @Input({
    required: false,
    alias: 'acortadorTexto'
  }) quantityShortText: number = 0;

  @Input({
    required: false,
    alias: 'opcionesParaTooltip'
  }) tooltipOptions: TootilpOption = this.defaultOptionsTooltip;

  @Output() ouputId: EventEmitter<any> = new EventEmitter();
  @Output() result: EventEmitter<number> = new EventEmitter();
  @Output() resultWithHeader: EventEmitter<{ id: number, header: string }> = new EventEmitter();
  @Output() resultWithHeaderPatient: EventEmitter<{ id: number, header: string, row: any }> = new EventEmitter();
  @Output() resultAction: EventEmitter<number[] | string[]> = new EventEmitter();
  @Output() resultCheck: EventEmitter<boolean[] | string[]> = new EventEmitter();
  @Output() activeChange: EventEmitter<[boolean, number]> = new EventEmitter();
  @Output() changeWithHeader: EventEmitter<[boolean, number, string]> = new EventEmitter();

  public active!: boolean;
  public changeCheckbox: boolean = false;
  public changeButton: boolean = false;

  public allowHeaders: string[] = [];
  public iconEdit = faPen;
  public iconDelete = faXmark;
  public iconDetails = faList;
  public iconLink = faLink;
  public iconChevronLeft = faChevronLeft;
  public iconChevronRight = faChevronRight;

  public activeButtonIndex: number = -1;
  public openIdAction: any = null;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private scrollService: ScrollIndicatorService) { }

  public ngOnInit(): void {
    this.allowHeaders = [
      'Check',
      'Editar',
      'Resultados',
      'Activo',
      'Acciones',
      'Eliminar',
      'Detalles',
      'DetalleProducto',
      'Desasociar',
      'ResultPatient',
      'Estado en espera de resultados',
      'Estado resultado parcial',
      'Estado finalizado'
    ];

    // observo que exista un scroll en un lugar determinado para cerrar el menu de acciones
    this.scrollService.getScrollObservable()
    .pipe(
      takeUntil(this.destroy$),
      filter(() => this.openIdAction !== null),
      delay(100),
      tap(() => this.openIdAction = null)
    )
    .subscribe();
  }

  public changeSelectedAction(id: number) {
    // si se hace click en el mismo boton lo cierro
    this.openIdAction = this.openIdAction === id ? null : id;
  }

  public emitOutputs(id: number, header?: any) {
    this.result.emit(id);
    this.resultWithHeader.emit({ id, header });
  }
  public emitOutputsPatient(id: number, row: any, header?: any) {

    this.resultWithHeaderPatient.emit({ id, row, header });
  }

  public selectCheckbox() {
    this.changeCheckbox = !this.changeCheckbox;
    this.resultCheck.emit([true, this.changeCheckbox]);
  }

  public changeStatus(event: any, indexData: number) {
    this.activeChange.emit([event, indexData]);
  }

  public changeHeader(event: any, indexData: number, header: string) {
    this.changeWithHeader.emit([event, indexData, header]);
  }

  public toggleButton(index: number, row: any, idn: number) {
    this.seePdf = false;

    if (this.activeButtonIndex === index) {
      this.activeButtonIndex = -1;
    } else {
      this.activeButtonIndex = index;
    }

    const data = {
      row: row,
      idn: idn
    }

    !row['changeButton'] ? this.ouputId.emit(data) : this.ouputId.emit(data)
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
