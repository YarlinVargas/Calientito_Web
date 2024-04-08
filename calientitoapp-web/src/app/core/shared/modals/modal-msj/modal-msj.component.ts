import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { dataModal } from 'src/app/core/models/modals/moda-data.model';

@Component({
  selector: 'app-modal-msj',
  templateUrl: './modal-msj.component.html',
  styleUrls: ['./modal-msj.component.scss'],
})
export class ModalMsjComponent {

  @Output() acceptEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() logoutEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: DialogRef<ModalMsjComponent>, @Inject(DIALOG_DATA) public data: dataModal) {
  }

  public acceptDialog(): void {
    this.acceptEvent.emit(true);
  }

  public clickLogout = (): void => this.logoutEvent.emit(true);
}
