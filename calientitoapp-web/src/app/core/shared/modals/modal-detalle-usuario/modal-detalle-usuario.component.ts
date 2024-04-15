import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { dataModal } from 'src/app/core/models/modals/moda-data.model';
import { ModalMsjComponent } from '../modal-msj/modal-msj.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { finalize } from 'rxjs';
import { RespService } from 'src/app/core/models/general/resp-service.model';

@Component({
  selector: 'app-modal-detalle-usuario',
  templateUrl: './modal-detalle-usuario.component.html',
  styleUrls: ['./modal-detalle-usuario.component.scss']
})
export class ModalDetalleUsuarioComponent {

  private userService = inject(UserService);
  private spinnerSvc = inject(SpinnerService);

  public listDetail: any = [];
  public listPlans: any = [];

  @Output() primaryEvent: EventEmitter<void>;

  constructor(public dialogRef: DialogRef<ModalMsjComponent>, @Inject(DIALOG_DATA) public data: any)
  {
    this.primaryEvent = new EventEmitter<void>();
    this.getDetail(data.idUser);
  }

  public getDetail(idUser: number) {
    this.spinnerSvc.show();
    this.userService.GetDetails(idUser)
    .pipe(
      finalize(() => {
        this.spinnerSvc.hide();
      })
    )
    .subscribe((resp: RespService) => {
      if (resp.data != null) {
        this.listDetail = resp.data.data;
        this.listPlans = resp.data.plans;
      }
    })
  }
}