import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bakeries',
  templateUrl: './bakeries.component.html',
  styleUrls: ['./bakeries.component.scss']
})

export class BakeriesComponent {

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



  constructor(

    private router: Router,

  ) {  }

  products(){
    this.router.navigateByUrl(`likes`);
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
