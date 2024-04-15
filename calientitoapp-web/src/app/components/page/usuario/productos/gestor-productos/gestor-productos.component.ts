import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, finalize, takeUntil, tap } from 'rxjs';
import { TextLargeWindow } from 'src/app/core/constants/textLargeWindow';
import { openModals } from 'src/app/core/global/modals/openModal';
import { ToggleListEnum } from 'src/app/core/models/enums/toggleList.enum';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { dataModal } from 'src/app/core/models/modals/moda-data.model';
import { Producto } from 'src/app/core/models/productos/producto.model';
import { TootilpOption } from 'src/app/core/models/tooltip-options.model';
import { ListUser, ListUsuario } from 'src/app/core/models/user/list-user.model';
import { FilterProductoPipe } from 'src/app/core/pipes/filter/filter_product.pipe';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { ProductoService } from 'src/app/core/services/productos/productos.service';
import { Usuario, UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { ModalDetalleProductoComponent } from 'src/app/core/shared/modals/modal-detalle-producto/modal-detalle-producto/modal-detalle-producto.component';

@Component({
  selector: 'app-gestor-productos',
  templateUrl: './gestor-productos.component.html',
  styleUrls: ['./gestor-productos.component.scss']
})
export class GestorProductosComponent {
  public currentView:boolean=true;
  public isOpen:boolean=false;
  public allOptions = ToggleListEnum;
  public form: FormGroup = new FormGroup({});
  public tooltip: TootilpOption = {
    enable: true,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0,
  };

  public detail : Producto[] =[];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private productoService = inject(ProductoService);
  private spinnerSvc = inject(SpinnerService);

  public listProductos: Producto[] = [];

  public optionsSearch: string[] = [];

  public currentLargeTextCard = 10;
  public currentLargeTextTable = 10;
  public openModal: openModals = new openModals(this.dialog);
  public destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('DetalleProducto')
  DetalleProducto!: TemplateRef<any>;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentLargeTextCard = TextLargeWindow.get(15, 20, 15, 25);
    this.currentLargeTextTable = TextLargeWindow.get(15);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.optionsSearch = [];
    }
  }

  @HostListener('window:resize',['$event'])
  Resolucion(event:any): void{
    setTimeout(()=>{
      this.calcularCarta()
    },100)
  }


  constructor(public dialog: Dialog, public pipe: FilterProductoPipe, private eRef: ElementRef, private _usuarioService: UsuarioService) {
    this.form = this.fb.group({
      search: ['']
    });
    this.calcularCarta()
  }

  calcularCarta() {
    if (window.innerWidth < 768) {
      this.currentView=true
    }
  }

  public ngOnInit(): void {
    this.getProductos();
    this.form.get('search')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((value: string) => {
          this.optionsSearch = [];
        }),
        filter((value: string) => value.length > 2),
      )
      .subscribe((value: string) => {
        var resultPipe: any = this.pipe.transform(this.listProductos, value);
        this.optionsSearch = resultPipe.results.map((product: any) =>
          resultPipe.foundFields.map((field: string) => product[field])
        ).flat();
      });

    this.currentLargeTextCard = TextLargeWindow.get(15, 20, 15, 25);
    this.currentLargeTextTable = TextLargeWindow.get(15);
  }
  public getProductos(){

    this.productoService.getProducts().subscribe((r: any) => {
        if (r.length > 0) {
          this.listProductos = r;

        } else {
          console.log("No hay productos registrados en el sistema");
        }
      });
  }
  public setSuggestion(event: any) {
    this.form.get('search')?.setValue(event);
    this.optionsSearch = [];
  }
  public toggleView(){
    this.currentView = !this.currentView
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }

  public getValueForm = (id: string): string => this.form.get(id)?.value;
  public navigate(url: string, event?: any): void {
    if (event?.header === 'Editar')
      this.router.navigate([url, event.id]);
    else if (event?.header === 'Eliminar')
      this.deleteUser(event.id);
    else if (event?.header === 'DetalleProducto')
      this.showDetails(event.id);
    else
      this.router.navigateByUrl(url);
  }
  
  public deleteUser(idProduct: number) {
    const currentProduct = this.listProductos.find((product: Producto) => product.id_producto == idProduct);
    if (!currentProduct) return;

    const dialog = this.openModal.OpenLogout(
      [`El producto "${currentProduct?.descripcion}" no podrá ser visualizado en el sistema`],
      '30rem',
      '¿Esta seguro que desea eliminar este producto?',
      'Esta acción es permanente'
    );

    dialog.componentInstance!.logoutEvent?.subscribe(_ => {
      this.productoService.deleteProductById(currentProduct.id_producto)
      .subscribe((r: any) => {
            this.openModal.Open(1, [],`El producto "${currentProduct?.descripcion}"  es eliminado correctamente!`, '25rem');
            this.getProductos();
        });
    });
  }


  showDetails(id: number) {
    const dataSend: any = {
      idProducto: id,
      firstButton: {
        label: 'Cerrar',
      },
      footer: true
   }

   const isMobile = window.innerWidth < 768;

    const dialogRefProm = this.dialog.open(ModalDetalleProductoComponent, {
      width: '100%',
      height: '100%',
      data: dataSend,
      maxWidth: isMobile ? '90%' : '80%',
      maxHeight: '90%',
      disableClose: true,
    });

    dialogRefProm.componentInstance!.primaryEvent?.subscribe(() => {
      dialogRefProm.close();
    });

  }

  Detail(idProducto: number) {
    this.spinnerSvc.show();
    this.productoService.getProductById(idProducto)
    .subscribe((r: any) => {
      if (r != null) {
        this.detail = r;

      }
    })
  }
}
