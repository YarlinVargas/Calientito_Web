import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock, faHome , faCartShopping,faCircleQuestion, faGears, faHeart, faCircleUser, faBreadSlice,faStore , faMapLocationDot, faBell, faBars} from '@fortawesome/free-solid-svg-icons';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { BakerieService } from '../../../core/services/bakeries/bakeries.service';
import { BakerieModel } from '../../../core/models/bakeries/bakeries.model';

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

  dataUser : any;

  listBakeries : BakerieModel[]=[];

  private activatedRoute = inject(ActivatedRoute);
  private spinnerSvc = inject(SpinnerService);

  constructor(

    private router: Router,
    private  bakerieSvc : BakerieService

  ) {  }
  public ngOnInit(): void {
    this.dataUser = JSON.parse(sessionStorage.getItem('auth')!);
    this.consult();
  }
  OnProducts(){
    this.router.navigateByUrl(`category`);
  }
  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
  private consult() {

    this.spinnerSvc.show();
    this.bakerieSvc.getBakeries()

      .subscribe(resp => {
        if (resp != null) {
          this.listBakeries = resp;
        }
      });
  }
}
