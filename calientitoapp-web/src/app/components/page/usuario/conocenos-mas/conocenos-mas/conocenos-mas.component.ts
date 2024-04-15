import { Component } from '@angular/core';

@Component({
  selector: 'app-conocenos-mas',
  templateUrl: './conocenos-mas.component.html',
  styleUrls: ['./conocenos-mas.component.scss']
})
export class ConocenosMasComponent {
  public isOpen:boolean=false;

  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
