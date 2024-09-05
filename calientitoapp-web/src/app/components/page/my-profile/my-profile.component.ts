import { Component } from '@angular/core';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
   //ICONOS
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

  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
