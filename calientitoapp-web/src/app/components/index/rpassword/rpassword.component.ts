import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faBuilding, faUserGroup, faGear, faBars, faLock, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-rpassword',
  templateUrl: './rpassword.component.html',
  styleUrls: ['./rpassword.component.scss']
})
export class RpasswordComponent {
  public allOptions: ValueSelect[] = [];

  // # TABS
  openTab = 1;

  //ICONOS
  faBuilding = faBuilding;
  faUserGroup = faUserGroup;
  faGear = faGear;
  faBars = faBars;
  faLock = faLock;
  faChevronLeft = faChevronLeft;

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

  tabs = [
    { id: 1, title: 'Pacientes', colorT: 'text-sky500', colorB: 'bg-sky500', icon: faUserGroup, hover: 'hover:text-cyan400 hover:underline', rememberData: false },
    { id: 2, title: 'Empresas', colorT: 'text-teal500', colorB: 'bg-teal500', icon: faBuilding, hover: 'hover:text-teal400 hover:underline', rememberData: false },
    { id: 3, title: 'Usuarios', colorT: 'text-sky700', colorB: 'bg-sky700', icon: faGear, hover: 'hover:text-sky500 hover:underline', rememberData: false }
  ]


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

      if (data) {
        this.openTab = data.id;

        if (this.openTab === data.id) {
          this.form.controls['idIdentificationType'].setValue(data.idIdentificationType);
          this.form.controls['userName'].setValue(data.userName);
        }
      }
    }


  }

  ngOnInit(): void {
    // this.indexDbService.getAllImages().then((r: any) => {
    //   if (!r?.length) {
        // this.genSvc.ImgEnterprise().subscribe((r: RespService) => {
        //   this.indexDbService.addImage(r.data);
        //   debugger
        //   this.imgEnterprise = r.data;
        // })
      // } else {
      //   this.imgEnterprise = r[0].data;
      // }
    // });
    // this.genSvc.ListFiltersConsult().subscribe((r: RespService) => {
    //   this.listDocument = r.data;
    // });
    //this.ListFiltersConsult();
  }
  volver(){
    this.router.navigateByUrl('/login');
  }
  private ListFiltersConsult() {
    this.spinnerSvc.show();
    this.genSvc.ListFiltersConsult()
      .pipe(
        finalize(() => {
          this.spinnerSvc.hide();
        })
      )
      .subscribe((resp: RespService[]) => {
        this.indexDbService.addImage(resp[0].data);
        this.imgEnterprise =resp[0].data;
        this.listDocument = resp[1].data;
      })
  }

  private initialForm() {
    this.form = this.fb.group({
      idIdentificationType: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      recaptchaReactive: [null, Validators.required]
    });
  }

  toggleTabs($tabNumber: number) {
    this.initialForm();
    this.openTab = $tabNumber;

    const data = this.ValidRemember();
    if (data) {
      if (this.openTab === data.id) {
        this.form.controls['idIdentificationType'].setValue(data.idIdentificationType);
        this.form.controls['userName'].setValue(data.userName);
      }
    }
  }

  resolved(captchaResponse: string) {
  }

  Auth() {
    //if (this.form.valid) {
      const data: AuthModel = {...this.form.value};
    //   data.loginType = this.openTab == 1 ? 3 : this.openTab == 3 ? 1 : this.openTab;
    //   data.idIdentificationType = data.idIdentificationType == "" || data.idIdentificationType == undefined ? null : data.idIdentificationType;

    //   const object = this.tabs.find(item => item.id === this.openTab);
    //   this.RememberData(this.openTab, object!.rememberData);

    //   this.spinnerSvc.show();
    //   this.authSvc.Auth(data).pipe(
    //     finalize(() => {
    //       this.spinnerSvc.hide();
    //     })
    //   ).subscribe(
    //     {
    //       next: (r: RespService) => {
    //         if (r?.ok) {
    //           sessionStorage.setItem('auth', JSON.stringify(r.data));
                   // Realizar la petición POST para autenticar el usuario
    this._usuarioService.authenticateUsuario(data.idPerfil, data.userName, data.password).subscribe(
      () => {
        console.log('Usuario logueado correctamente');
        this.router.navigateByUrl(`home`);
      },
      error => {
        console.error('Error al loguear el usuario', error);
      }
    );
    //         } else {
    //           if (r.message == "Autenticación por primera vez") {
    //             const dialogRef = this.openModal.Open(5, ['Esta es la primera vez que ingresas a nuestro sistema,', 'para continuar es necesario que cambie su contraseña'],
    //               '¡Bienvenido a Consulta de resultados!', '550px');

    //             dialogRef.componentInstance!.acceptEvent?.subscribe(_ => {
    //               this.router.navigateByUrl(`changePassword/${data.loginType}/first/${r.data.IdUser}`);
    //               dialogRef.close();
    //             });
    //           }
    //         }
    //       },
    //       error: (err: any) => {
    //         this.openModal.Open(2, [err.error.message], undefined, '550px');
    //       }
    //     });
    // }else{
    //    this.form.markAllAsTouched();
    // }
  }

  public RecoverPassword() {
    this.router.navigateByUrl('/recoverPassword');
  }

  private ValidRemember() {

    if (localStorage.getItem('remember')) {
      const data = JSON.parse(localStorage.getItem('remember')!);
      this.tabs.forEach(element => {
        if (element['id'] === data.id) {
          element['rememberData'] = true;
        } else {
          element['rememberData'] = false;
        }
      });

      return data;
    }

    return null;
  }

  public Checked(id: number, $event: any) {
    this.tabs.forEach(element => {
      if (element['id'] === id) {
        element['rememberData'] = $event.checked;
      } else {
        element['rememberData'] = false;
      }
    });
  }

  private RememberData(id: number, checked: boolean) {
    if (checked) {
      localStorage.setItem('remember', JSON.stringify({ id: id, idIdentificationType: this.form.value.idIdentificationType, userName: this.form.value.userName }));
    } else {
      localStorage.removeItem('remember');
    }
  }
}

