import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actions } from '../../models/general/actions-table.model';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.scss']
})
export class ActionsTableComponent {

  @Input()
  actions!: Actions[];
  @Input({ required: false }) isMenuOpen: boolean = false;
  @Output() result: EventEmitter<number> = new EventEmitter();

  iconMenu = faEllipsis;
}
