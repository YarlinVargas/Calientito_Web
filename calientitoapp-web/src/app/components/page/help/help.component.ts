import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
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
  dataUser : any;

  constructor(

    private router: Router,

  ) {  }
  public ngOnInit(): void {
    this.dataUser = JSON.parse(sessionStorage.getItem('auth')!);

  }
  products(){
    this.router.navigateByUrl(`likes`);
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
