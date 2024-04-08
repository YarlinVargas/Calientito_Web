import { Component, OnInit } from '@angular/core';
import { TypeOfUser } from '../../constants/typeOfUser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public classFooter: string = "";

  ngOnInit(): void {
    const userRol = TypeOfUser.Rol.trim().toLowerCase();

    if (userRol === 'empresa') {
      this.classFooter = "business";
    } else if (userRol === 'paciente') {
      this.classFooter = "patient";
    } else if (userRol === 'usuario') {
      this.classFooter = "user";
    }
  }
}
