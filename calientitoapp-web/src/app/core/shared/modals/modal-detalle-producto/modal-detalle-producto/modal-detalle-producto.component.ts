import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { dataModal } from 'src/app/core/models/modals/moda-data.model';
import { ModalMsjComponent } from '../../modal-msj/modal-msj.component';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { finalize } from 'rxjs';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { ProductoService } from 'src/app/core/services/productos/productos.service';
import { Producto } from 'src/app/core/models/productos/producto.model';

@Component({
  selector: 'app-modal-detalle-producto',
  templateUrl: './modal-detalle-producto.component.html',
  styleUrls: ['./modal-detalle-producto.component.scss']
})
export class ModalDetalleProductoComponent {
  private spinnerSvc = inject(SpinnerService);
  public detail : Producto[] =[];
  id_producto: number = 0;
  descripcion: string = "";
  marca: string = "";
  codigo: string = "";
  cantidad: number = 0;
  precio_compra: number = 0;
  precio_venta: number = 0;
  id_estado: number = 0;
  eliminado: number = 0;
  imagen: string = "";

  @Output() primaryEvent: EventEmitter<void>;

  constructor(public dialogRef: DialogRef<ModalMsjComponent>, @Inject(DIALOG_DATA) public data: any,private productoService: ProductoService)
  {
    this.primaryEvent = new EventEmitter<void>();
    this.getDetail(data.idProducto);
  }

  public getDetail(idProduct: number) {

    this.productoService.getProductById(idProduct)
    .subscribe((r: any) => {
      if (r != null) {

        this.id_producto = r.id_producto;
        this.descripcion = r.descripcion;
        this.marca = r.marca;
        this.codigo = r.codigo;
        this.cantidad = r.cantidad;
        this.precio_compra = r.precio_compra;
        this.precio_venta = r.precio_venta;
        this.id_estado = r.id_estado;
        this.eliminado = r.eliminado;
        this.imagen = r.imagen;
      }
    })
  }
}
