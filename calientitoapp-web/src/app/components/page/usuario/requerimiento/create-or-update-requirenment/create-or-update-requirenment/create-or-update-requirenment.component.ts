import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { ListModel } from 'src/app/core/models/general/general.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { Subject, distinctUntilChanged, filter, finalize, forkJoin, map, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { Company } from 'src/app/core/models/general/company.model';
import { CreateUpdateUser } from 'src/app/core/services/user/models/create-update-user.model';
import { PlansByCompany } from 'src/app/core/services/user/models/plans-by-company.model';
import { Dialog } from '@angular/cdk/dialog';
import { openModals } from 'src/app/core/global/modals/openModal';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { TootilpOption } from 'src/app/core/models/tooltip-options.model';
import { TextLargeWindow } from 'src/app/core/constants/textLargeWindow';
import { CreateUpdateRequirenment } from 'src/app/core/services/requirenment/models/create-update-requirenment.model';
import { RequirenmentService } from 'src/app/core/services/requirenment/requirenment.service';
import { GeneralService } from 'src/app/core/services/gen/general.service';

@Component({
  selector: 'app-create-or-update-requirenment',
  templateUrl: './create-or-update-requirenment.component.html',
  styleUrls: ['./create-or-update-requirenment.component.scss']
})
export class CreateOrUpdateRequirenmentComponent {

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

  public requirenmentToUpdate: CreateUpdateRequirenment = {
    idRequirenment: 0,
    identificationNumber: '',
    requirenmentNumber: '',
    dateInitial: '',
    placa: '',
    requirenment:'',
  };

  public form: FormGroup = new FormGroup({});

  private genSvc = inject(GeneralService);
  private requirenmentService = inject(RequirenmentService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private spinnerSvc = inject(SpinnerService);


  public openModal: openModals = new openModals(this.dialog);
  public currentLargeText = 10;

  constructor(public dialog: Dialog) {
    this.setFormRequirenment(this.requirenmentToUpdate);

  }

  public ngOnInit(): void {
    this.currentLargeText = TextLargeWindow.get(15);

    if (this.router.url.includes('updateRequirement')) {
      this.isEdit = true;
      this.GetRequirenment();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentLargeText = TextLargeWindow.get(15);
  }

  private GetRequirenment(): void {
    const idRequirenment = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idRequirenment)
      this.router.navigateByUrl('/requirement');

    this.spinnerSvc.show();
    this.requirenmentService.GetRequirenments(idRequirenment!)
      .subscribe((resp2: any) => {
        this.setFormRequirenment(this.requirenmentToUpdate);
      });
  }

  public setFormRequirenment(requirenment: CreateUpdateRequirenment) {
    this.form = this.fb.group({
      idRequirenment: [requirenment.idRequirenment],
      identificationNumber: [requirenment.identificationNumber, Validators.required],
      requirenmentNumber: [requirenment.requirenmentNumber, [Validators.required, Validators.minLength(1)]],
      placa: [requirenment.placa, [Validators.required, Validators.minLength(1)]],
      dateInitial: [requirenment.dateInitial, Validators.required],
      requirenment: [requirenment.requirenment, Validators.required],
    });
  }

  public back = () => this.router.navigateByUrl('requirement');

  public updateOrCreateRequirenment(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let request: CreateUpdateRequirenment = this.form.value;


    this.spinnerSvc.show();
    this.requirenmentService.CreateOrUpate(request)
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
            message = '¡Requerimiento actualizado correctamente!';
          else {
            status = 3;

            if (resp.message.trim().toLowerCase() === 'requirenmentNumber already exists') {
              message = '¡Los datos del requerimiento ya existen! Por favor verifique e intente de nuevo';
              this.form.get('identificationNumber')?.setErrors({ 'IdentificationExists': true });
              this.form.get('idIdentificationType')?.setErrors({ 'showWithoutMessage': true });
            } else if (resp.message.trim().toLowerCase() === 'email already exists') {
              this.form.get('email')?.setErrors({ 'EmailIsTaken': true });
            }
          }
        } else {
          if (resp.ok === true)
            message = '¡Usuario creado correctamente!';
          else {
            status = 3;

            if (resp.message.trim().toLowerCase() === 'username already exists') {
              message = '¡Los datos del usuario ya existen! Por favor verifique e intente de nuevo';
              this.form.get('identificationNumber')?.setErrors({ 'IdentificationExists': true });
              this.form.get('idIdentificationType')?.setErrors({ '': true });
            } else if (resp.message.trim().toLowerCase() === 'email already exists') {
              this.form.get('email')?.setErrors({ 'EmailIsTaken': true });
            }
          }
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
              this.router.navigateByUrl(`/requirement`);
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

