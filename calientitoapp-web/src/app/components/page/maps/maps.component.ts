import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';


declare const google:any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit{
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
  map: any;
  dataUser : any;
  @ViewChild('mapElement') mapElement: any;

  constructor(

    private router: Router,

  ) {  }
  ngOnInit(): void {
    this.dataUser = JSON.parse(sessionStorage.getItem('auth')!);
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    //map code here
    this.map = new google.maps.Map(this.mapElement.nativeElement,{
      center: { lat:5.06889, lng:-75.51738},
      zoom:14,
    });
  }

  goToBakeries(){
    this.router.navigateByUrl(`bakeries`);
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
