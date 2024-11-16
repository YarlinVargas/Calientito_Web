import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faBuilding, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthModel } from 'src/app/core/models/auth/auth.model';
import { GeneralService } from 'src/app/core/services/gen/general.service';
import { ListModel } from 'src/app/core/models/general/general.model';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { Dialog } from '@angular/cdk/dialog';
import { openModals } from 'src/app/core/global/modals/openModal';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { finalize } from 'rxjs';
import { IndexDbService } from 'src/app/core/services/gen/index-db.service';
import { ValueSelect } from 'src/app/core/models/general/value-select.model';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public allOptions: ValueSelect[] = [];

  // # TABS
  openTab = 1;

  //ICONOS
  faBuilding = faBuilding;
  faUserGroup = faUserGroup;
  faGear = faGear;

  //CAPTCHA
  captcha: string = ''

  //FORMULARIO
  form!: FormGroup;

  //LISTAS
  listDocument!: ListModel[];

  //IMAGEN EMPRESA
  imgEnterprise = "assets/img/logo_calientito.png";
  //Modal
  openModal: openModals = new openModals(this.dialog);


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private genSvc: GeneralService,
    public dialog: Dialog,
    private spinnerSvc: SpinnerService,
    private indexDbService: IndexDbService,
    private _usuarioService: UsuarioService
  ) {
    this.initialForm();
    if (localStorage.getItem('remember') !=null) {
      const data = this.ValidRemember();
    }


  }

  ngOnInit(): void {

  }

  private initialForm() {
    this.form = this.fb.group({
      idPerfil: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      // recaptchaReactive: [null, Validators.required]
    });
  }

  // toggleTabs($tabNumber: number) {
  //   this.initialForm();
  //   this.openTab = $tabNumber;

  //   const data = this.ValidRemember();
  //   if (data) {
  //     if (this.openTab === data.id) {
  //       this.form.controls['idPerfil'].setValue(data.idPerfil);
  //       this.form.controls['userName'].setValue(data.userName);
  //       this.form.controls['password'].setValue(data.password);
  //     }
  //   }
  // }

  resolved(captchaResponse: string) {
  }

  Auth() {
      const data: AuthModel = {...this.form.value};

      // Realizar la petición POST para autenticar el usuario
      this.authSvc.Auth(Number(data.idPerfil),data.userName, data.password).subscribe(
      () => {
        console.log('Usuario logueado correctamente');
        const rta={
           idPerfil : data.idPerfil,
           userName:data.userName
        };
        sessionStorage.setItem('auth', JSON.stringify(rta));
        this.router.navigateByUrl(`welcome`);
      },
      error => {
        console.error('Error al loguear el usuario', error);
      }
    );
  }

  public RecoverPassword() {
    this.router.navigateByUrl('/recoverPassword');
  }

  public CreateAccount(){
    this.router.navigateByUrl('/createAccount');
  }
  private ValidRemember() {

    if (localStorage.getItem('remember')) {
      const data = JSON.parse(localStorage.getItem('remember')!);

      return data;
    }

    return null;
  }

  public Checked(id: number, $event: any) {


  }

  private RememberData(id: number, checked: boolean) {
    if (checked) {
      localStorage.setItem('remember', JSON.stringify({ id: id, idIdentificationType: this.form.value.idIdentificationType, userName: this.form.value.userName }));
    } else {
      localStorage.removeItem('remember');
    }
  }
}
