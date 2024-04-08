import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ModalInput } from 'src/app/core/models/modals/modal-input.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';

@Component({
  selector: 'app-modal-get-email',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent {

  @Output() acceptEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() logoutEvent: EventEmitter<{ status: boolean, value: string}> = new EventEmitter<{ status: boolean, value: string}>();
  @Output() valueEvent: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup = new FormGroup({});

  private spinnerSvc = inject(SpinnerService);

  constructor(
    public dialogRef: DialogRef<ModalInputComponent>,
    public fb: FormBuilder,
    private authSvc: AuthService,
    @Inject(DIALOG_DATA) public data: ModalInput,
  ) {
    this.form = this.fb.group({
      [data.input.name]: [
        '',
        this.data.input.type === 'email' ?
          [Validators.required, Validators.email] :
          [Validators.required]
      ],
    })
  }

  public acceptDialog(): void {
    this.acceptEvent.emit(true);
  }

  public clickLogout = (): void => {
    if (this.form.valid) {
      if (this.data.input.type === 'password')
        this.ValidPassword();
      else
        this.logoutEvent.emit({ status: true, value: this.form.value[this.data.input.name] });
    } else
      this.form.markAllAsTouched();
  }

  public ValidPassword() {
    this.spinnerSvc.show();

    this.authSvc.ValidatePassword(
      3,
      this.form.value[this.data.input.name],
      0
    )
    .pipe().subscribe(
        {
          next: () => {
            this.form.controls[this.data.input.name].setErrors(null);
            this.logoutEvent.emit({ status: true, value: this.form.value[this.data.input.name] });
          },
          error: (err: any) => {
            this.form.controls[this.data.input.name].setErrors({ equalsPassword: true });
            this.form.controls[this.data.input.name].markAsTouched();
            this.spinnerSvc.hide();
          }
        });
  }
}
