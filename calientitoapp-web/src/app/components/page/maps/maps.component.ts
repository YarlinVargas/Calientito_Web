import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

declare const google:any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit{

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

  goToBakeries(){
    this.router.navigateByUrl(`bakeries`);
  }
}
