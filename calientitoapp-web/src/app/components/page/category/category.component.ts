import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
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

  public isOpen:boolean=false;
  //IMAGEN EMPRESA
  imgEnterprise = "assets/img/logo_calientito.png";
   item : number = 0;
   dataUser : any;
   
  constructor(

    private router: Router,

  ) {  }

  public ngOnInit(): void {
    this.dataUser = JSON.parse(sessionStorage.getItem('auth')!);

  }

  goProducts(index: number){
    this.item = index;
    // this.router.navigateByUrl(`products`);
    this.router.navigate(['products', this.item]);
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
