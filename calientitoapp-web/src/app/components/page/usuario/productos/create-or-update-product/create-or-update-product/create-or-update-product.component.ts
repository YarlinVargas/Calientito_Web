import { Component, HostListener, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ListModel, ListTipoDocumento } from 'src/app/core/models/general/general.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, distinctUntilChanged, filter, finalize, forkJoin, map, switchMap, takeUntil, tap } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { openModals } from 'src/app/core/global/modals/openModal';
import { TootilpOption } from 'src/app/core/models/tooltip-options.model';
import { TextLargeWindow } from 'src/app/core/constants/textLargeWindow';
import { ProductoService } from 'src/app/core/services/productos/productos.service';
import { Producto } from 'src/app/core/models/productos/producto.model';

@Component({
  selector: 'app-create-or-update-product',
  templateUrl: './create-or-update-product.component.html',
  styleUrls: ['./create-or-update-product.component.scss']
})
export class CreateOrUpdateProductComponent {

  public idProducto: number = 0;
  public listDocument!: ListTipoDocumento[];
  public isEdit: boolean = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public currentCompanyNit: string = '';
  public colorsLinks: { associate: any, disassociate: any } = { associate: 'cyan', disassociate: 'neutral' };
  public lastIndexCompany!: number;

  public tooltip: TootilpOption = {
    enable: true,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0,
  };

  public productoToUpdate: Producto = {
    id_producto: 0,
    descripcion:'',
    marca: '',
    codigo: '',
    cantidad: 0,
    precio_compra: 0,
    precio_venta:0,
    id_estado: 0,
    eliminado: 0,
    imagen:'',
  };
  public form: FormGroup = new FormGroup({});

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  @Input() color = 'sky';
  @Input() id_producto: string = 'select';
  @Input() defaultValue: string='Seleccione una opción';

  public allPlans: any[] = [];

  public openModal: openModals = new openModals(this.dialog);
  public currentLargeText = 10;

  constructor(public dialog: Dialog, private productoService: ProductoService) {
    this.setFormProducto(this.productoToUpdate);
  }

  public ngOnInit(): void {
    this.currentLargeText = TextLargeWindow.get(15);

    if (this.router.url.includes('updateProduct')) {
      this.isEdit = true;
      this.GetProducto();
    }

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentLargeText = TextLargeWindow.get(15);
  }




  private GetProducto(): void {
    const idProducto = this.activatedRoute.snapshot.paramMap.get('id');
    this.idProducto = parseInt(idProducto!);
    if (!idProducto)
      this.router.navigateByUrl('/productos');

    this.productoService.getProductById(parseInt(idProducto!) ).subscribe(
      (r:any) => {
        console.log('Productos actualizados correctamente');
        this.setFormProducto(r);
      },
      error => {
        console.error('Error al cargar lista de productos', error);
        this.router.navigateByUrl(`productos`);
      }
    );
  }

  public setFormProducto(producto: Producto) {
    this.form = this.fb.group({
      id_producto: [producto.id_producto],
      descripcion: [producto.descripcion, Validators.required],
      marca: [producto.marca, [Validators.required, Validators.minLength(1)]],
      codigo: [producto.codigo, [Validators.required, Validators.minLength(1)]],
      cantidad: [producto.cantidad, Validators.required],
      precio_compra: [producto.precio_compra, Validators.required],
      precio_venta:[producto.precio_venta, Validators.required],
      imagen:[producto.imagen],
    });
  }

  public back = () => this.router.navigateByUrl('productos');

  public updateOrCreateProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request: Producto = this.form.value;
  if(this.isEdit ){
    this.productoService.updateProductById(this.idProducto, request).subscribe((r: any) => {

      console.log("Prodcutos actualizados correctamente");
      this.router.navigateByUrl(`/productos`);
    });
  }else{

    // this.spinnerSvc.show();
    this.productoService.createNewProduct(request).subscribe((r: any) => {

        console.log("Productos creados correctamente");
        this.router.navigateByUrl(`/productos`);

      });
  }

  }

  public getForm = (control: string) => this.form.get(control);

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
