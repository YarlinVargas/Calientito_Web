import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { Subject, finalize, tap } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { openModals } from 'src/app/core/global/modals/openModal';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { TootilpOption } from 'src/app/core/models/tooltip-options.model';
import { TextLargeWindow } from 'src/app/core/constants/textLargeWindow';
import { CreateUpdateClient } from 'src/app/core/services/client/models/create-update-client.model';
import { ClientService } from 'src/app/core/services/client/client.service';


@Component({
  selector: 'app-create-or-update-client',
  templateUrl: './create-or-update-client.component.html',
  styleUrls: ['./create-or-update-client.component.scss']
})
export class CreateOrUpdateClientComponent {

  public isEdit: boolean = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public currentCompanyNit: string = '';
  public colorsLinks: { associate: any, disassociate: any } = { associate: 'cyan', disassociate: 'neutral' };
  public lastIndexCompany!: number;

  public tooltip: TootilpOption = {
    enable: true,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0,
  };

  public clientToUpdate: CreateUpdateClient = {
    idClient: 0,
    identificationNumber: '',
    name: '',
    phoneNumber: '',
  };

  public form: FormGroup = new FormGroup({});

  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private spinnerSvc = inject(SpinnerService);

  public openModal: openModals = new openModals(this.dialog);
  public currentLargeText = 10;

  constructor(public dialog: Dialog) {
    this.setFormClient(this.clientToUpdate);
  }

  public ngOnInit(): void {
    this.currentLargeText = TextLargeWindow.get(15);

    if (this.router.url.includes('updateClient')) {
      this.isEdit = true;
      this.GetClient();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentLargeText = TextLargeWindow.get(15);
  }

  private GetClient(): void {
    const idClient = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idClient)
      this.router.navigateByUrl('/client');

    this.spinnerSvc.show();
    this.clientService.GetClients(idClient!)
      .pipe(
        tap((resp: RespService) => {
          if (!Object.keys(resp.data).length)
            this.router.navigateByUrl('/client');
          else {
            this.clientToUpdate = resp.data;
            this.setFormClient(this.clientToUpdate);
          }
        }),
        finalize(() => {
          this.spinnerSvc.hide();
        })
      )
      .subscribe((resp2: any) => {
        this.setFormClient(this.clientToUpdate);
      });
  }

  public setFormClient(client: CreateUpdateClient) {
    this.form = this.fb.group({
      idClient: [client.idClient],
      identificationNumber: [client.identificationNumber, Validators.required],
      name: [client.name, [Validators.required, Validators.minLength(1)]],
      phoneNumber: [client.phoneNumber, Validators.required],
    });
  }

  public back = () => this.router.navigateByUrl('client');

  public updateOrCreateClient(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let request: CreateUpdateClient = this.form.value;

    this.spinnerSvc.show();
    this.clientService.CreateOrUpate(request)
      .pipe(
        finalize(() => {
          this.spinnerSvc.hide();
        })
      )
      .subscribe((resp: RespService) => {
        let message = '';
        let status = 1;

        if (this.isEdit) {
          if (resp.ok === true)
            message = '¡Cliente actualizado correctamente!';

        } else {
          if (resp.ok === true)
            message = '¡Cliente creado correctamente!';
        }

        if (message) {
          const dialogRef = this.openModal.Open(
            status,
            [],
            message,
            '25rem',
            status === 3 ? 'amber400': ''
          );

          dialogRef.componentInstance!.acceptEvent?.subscribe(_ => {
            if (status === 1)
              this.router.navigateByUrl(`/client`);
            dialogRef.close();
          });
        }
      });
  }

  public getForm = (control: string) => this.form.get(control);

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
