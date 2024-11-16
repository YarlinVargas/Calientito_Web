import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars, faBagShopping, faClockRotateLeft} from '@fortawesome/free-solid-svg-icons';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { ProductoModel } from 'src/app/core/models/productos/producto.model';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { ProductoService } from 'src/app/core/services/productos/productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  faClock = faClock;
  faHome = faHome;
  faCartShopping = faCartShopping;
  faCircleQuestion = faCircleQuestion;
  faGears = faGears;
  faHeart = faHeart;
  faCircleUser = faCircleUser;
  faBreadSlice = faBreadSlice;
  faStore = faStore;
  faMapLocationDot = faMapLocationDot;
  faBell = faBell;
  faBars = faBars;
  faBagShopping = faBagShopping;
  faClockRotateLeft = faClockRotateLeft;

  public isOpen:boolean=false;
 itemProducts : number = 0;

 listProducts : ProductoModel[]=[];

  private activatedRoute = inject(ActivatedRoute);
  private spinnerSvc = inject(SpinnerService);
  //IMAGEN EMPRESA
  imgEnterprise = "assets/img/logo_calientito.png";
  dataUser : any;

  constructor(

    private router: Router,
    private productsSvc:ProductoService,
  ) {  }
  public ngOnInit(): void {
    this.dataUser = JSON.parse(sessionStorage.getItem('auth')!);
    const item = this.activatedRoute.snapshot.paramMap.get('id');
    this.itemProducts = Number(item);
    this.consult();
  }
  products(){
    this.router.navigateByUrl(`likes`);
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
  private consult() {

    this.spinnerSvc.show();
    this.productsSvc.getProducts()

      .subscribe(resp => {
        if (resp != null) {
          this.listProducts = resp;
        }
      });
  }
}
