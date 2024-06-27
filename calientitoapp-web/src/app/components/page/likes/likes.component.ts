import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent {
  //ICONOS
  faHeart = faHeart;
}
