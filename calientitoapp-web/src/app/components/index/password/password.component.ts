import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faBuilding, faUserGroup, faGear, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthModel,  UserModel } from 'src/app/core/models/auth/auth.model';
import { GeneralService } from 'src/app/core/services/gen/general.service';
import { ListModel, ListPerfiles } from 'src/app/core/models/general/general.model';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { Dialog } from '@angular/cdk/dialog';
import { openModals } from 'src/app/core/global/modals/openModal';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { finalize } from 'rxjs';
import { IndexDbService } from 'src/app/core/services/gen/index-db.service';
import { ValueSelect } from 'src/app/core/models/general/value-select.model';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public allOptions: ValueSelect[] = [];

  // # TABS
  openTab = 1;

  //ICONOS
  faBuilding = faBuilding;
  faUserGroup = faUserGroup;
  faGear = faGear;
  faBars = faBars;
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
  listPerfiles:ListPerfiles[] = [
    { id: 1, name: 'Administrador'},
    { id: 2, name: 'Panaderia' },
    { id: 3, name: 'Cliente' }
  ]
  selectedIndex: any = -1;
 //Obtener Fecha Actual

    dateNow = '';

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
    const date = new Date();
    this.dateNow = date.toISOString().split('T')[0];
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

  private initialForm() {
    this.form = this.fb.group({
      idPerfil: [''],
      name: ['', Validators.required],
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }
  public ValidPassword() {
    if (this.form.value.oldPassword != null && this.form.value.oldPassword != "") {
      // this.spinnerSvc.show();
      // this.authSvc.ValidatePassword (

        this.form.value.oldPassword,

      // )
      // .pipe(
      //   finalize(() => {
      //     this.spinnerSvc.hide();
      //   })
      // )
      //   .subscribe(
      //     {
      //       next: (_) => {
              this.form.controls['oldPassword'].setErrors(null);
              this.form.controls['oldPassword'].markAsTouched();
            // },
            // error: (err: any) => {
              this.form.controls['oldPassword'].setErrors({ oldPassword: true });
              this.form.controls['oldPassword'].markAsTouched();
            // }
          // });
    }
  }

  Register() {
debugger

      const data: UserModel = {
  name: this.form.value.name,
  dateBirthday: null,
  genero: null,
  email: null,
  password: this.form.value.password,
  active : 1,
  idPerfil: this.form.value.idPerfil,
  creationDate: new Date(this.dateNow),
  updateDate: null,
  lastName: this.form.value.lastName,
  phoneNumber: null,
  type_document: null,
  num_document: null,
  direccion: null,
  department: null,
  city: null,
  userName: this.form.value.userName,
};
    // Realizar la petición POST para registrar el usuario
    this.authSvc.Register(data).subscribe(
      () => {
        console.log('Usuario registrado correctamente');
        this.router.navigateByUrl(`login`);
      },
      error => {
        console.error('Error al registrar el usuario', error);
      }
    );

  }
  volver(){
    this.router.navigateByUrl('/login');
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
   if(id==1){
    this.form.controls['idPerfil'].setValue(id);
   }
   if(id==2){
    this.form.controls['idPerfil'].setValue(id);
   }
   if(id==3){
    this.form.controls['idPerfil'].setValue(id);
   }
  }

  private RememberData(id: number, checked: boolean) {
    if (checked) {
      localStorage.setItem('remember', JSON.stringify({ id: id, idIdentificationType: this.form.value.idIdentificationType, userName: this.form.value.userName }));
    } else {
      localStorage.removeItem('remember');
    }
  }

}
