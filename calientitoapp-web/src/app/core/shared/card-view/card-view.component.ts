import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPen, faXmark, faList } from '@fortawesome/free-solid-svg-icons';
import { TootilpOption } from '../../models/tooltip-options.model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {

  public defaultOptionsTooltip: TootilpOption = {
    enable: false,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0
  }

  @Input({
    required: false,
  }) set headers(data: string[]) {
    data.forEach(header => {
      if (this.allowHeaders.includes(header)) {
        if (header !== 'Activo')
          this.headersActions.push(header);
      } else this.headersTitles.push(header)
    });
  }

  @Input({
    required: false,
  }) data: { [key: string]: any }[] = [];

  @Input({
    required: false,
  }) keyMap: { [header: string]: string } = {};

  @Input({
    required: false,
    alias: 'cantidadFilas'
  }) quantityShowHeaders: number = 1;

  @Input({
    required: false,
    alias: 'cantidadColumnas'
  }) quantityOrderData: number = 2;

  @Input({
    required: false,
    alias: 'nombreCampoAEmitir'
  }) idOut: string = 'id';

  @Input({
    required: false,
    alias: 'tipo'
  }) type: number = 1;

  @Input({
    required: false,
    alias: 'acortadorTexto'
  }) quantityShortText: number = 0;

  @Input({
    required: false,
    alias: 'opcionesParaTooltip'
  }) tooltipOptions: TootilpOption = this.defaultOptionsTooltip;

  @Output() result: EventEmitter<number> = new EventEmitter();
  @Output() resultWithHeader: EventEmitter<{ header: string, id: string }> = new EventEmitter();
  @Output() checked: EventEmitter<number> = new EventEmitter();
  @Output() button: EventEmitter<number[] | string[]> = new EventEmitter();
  @Output() activeChange: EventEmitter<[boolean, number]> = new EventEmitter();

  public allowHeaders: string[] = ['Editar', 'Resultados', 'Activo', 'Eliminar', 'Detalles','DetalleProducto', 'Detalle', 'Descargar', 'Enviar al correo'];
  public iconEdit = faPen;
  public iconDelete = faXmark;
  public iconDetails = faList;
  public headersActions: string[] = [];
  public headersTitles: string[] = [];

  public changeStatus = (event: any, indexData: number) => this.activeChange.emit([event, indexData]);
}
