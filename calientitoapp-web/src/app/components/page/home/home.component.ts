import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';

declare const google:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{
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
  map: any;
  @ViewChild('mapElement') mapElement: any;

  constructor(

    private router: Router,

  ) {  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    //map code here
    this.map = new google.maps.Map(this.mapElement.nativeElement,{
      center: { lat:5.06889, lng:-75.51738},
      zoom:14,
    });
  }

  OnAboutus(){
    this.router.navigateByUrl(`aboutus`);
  }
  OnFavorites(){
    this.router.navigateByUrl(`likes`);
  }
  OnConfiguration(){
    this.router.navigateByUrl(`configuration`);
  }
  OnMyProfile(){
    this.router.navigateByUrl(`myProfile`);
  }
  OnHelp(){
    this.router.navigateByUrl(`help`);
  }
  goToBakeries(){
    this.router.navigateByUrl(`bakeries`);
  }
  OnProducts(){
    this.router.navigateByUrl(`products`);
  }
  OnShopping(){
    this.router.navigateByUrl(`shoppingCart`);
  }
  OnMaps(){
    this.router.navigateByUrl(`maps`);
  }

  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
