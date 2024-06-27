import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  faAngleRight=faAngleRight;
  constructor(

    private router: Router,

  ) {}
  goToHome(){
    this.router.navigateByUrl(`home`);
  }
}
