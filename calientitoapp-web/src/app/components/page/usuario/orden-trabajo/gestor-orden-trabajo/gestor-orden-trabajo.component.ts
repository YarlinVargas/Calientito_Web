import { Component } from '@angular/core';

@Component({
  selector: 'app-gestor-orden-trabajo',
  templateUrl: './gestor-orden-trabajo.component.html',
  styleUrls: ['./gestor-orden-trabajo.component.scss']
})
export class GestorOrdenTrabajoComponent {
  public isOpen:boolean=false;

  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }
}
