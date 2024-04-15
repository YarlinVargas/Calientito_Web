import { Component, HostListener, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ListModel, ListTipoDocumento } from 'src/app/core/models/general/general.model';
import { GeneralService } from '../../../../../core/services/gen/general.service';
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
import { Usuario, UsuarioService } from 'src/app/core/services/usuario/usuario.service';

interface FiltersContracts {
  waitingResult: boolean;
  partialResult: boolean;
  finishedResult: boolean;
  [key: string]: boolean;
}

@Component({
  selector: 'app-create-or-update-user',
  templateUrl: './create-or-update-user.component.html',
  styleUrls: ['./create-or-update-user.component.scss']
})
export class CreateOrUpdateUserComponent implements OnInit, OnDestroy {


  public idUser: number = 0;
  public listDocument!: ListTipoDocumento[];
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

  public userToUpdate: Usuario = {
    id_usuario: 0,
    cedula:0,
    nombres: '',
    apellidos: '',
    celular: '',
    correo: '',
    direccion:'',
    id_tipo_documento: 0,
    id_perfil: 0,
    id_estado: 0,
    login:'',
    password:'',
    eliminado:0
  };
  public form: FormGroup = new FormGroup({});

  private genSvc = inject(GeneralService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private spinnerSvc = inject(SpinnerService);

  @Input() color = 'sky';
  @Input() id_usuario: string = 'select';
  @Input() defaultValue: string='Seleccione una opción';

  public allPlans: any[] = [];

  public openModal: openModals = new openModals(this.dialog);
  public currentLargeText = 10;

  constructor(public dialog: Dialog, private _usuarioService: UsuarioService) {
    this.setFormUser(this.userToUpdate);
    this.getTiposDocumento();
  }

  public ngOnInit(): void {
    this.currentLargeText = TextLargeWindow.get(15);

    if (this.router.url.includes('updateUser')) {
      this.isEdit = true;
      this.GetUser();
    }

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentLargeText = TextLargeWindow.get(15);
  }



  public getTiposDocumento(){
    this.genSvc.getTiposDocumento().subscribe((r: any) => {
        if (r.length > 0) {
          this.listDocument = r;

        } else {
          console.log("No hay tipos de documento registrados en el sistema");
        }
      });
  }
  private GetUser(): void {
    const idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.idUser = parseInt(idUser!);
    if (!idUser)
      this.router.navigateByUrl('/gestionUsuario');

    this._usuarioService.getUsuarioById(parseInt(idUser!) ).subscribe(
      (r:any) => {
        console.log('Usuarios actualizado correctamente');
        this.setFormUser(r);
      },
      error => {
        console.error('Error al loguear el usuario', error);
        this.router.navigateByUrl(`gestionUsuario`);
      }
    );
  }

  public setFormUser(user: Usuario) {
    this.form = this.fb.group({
      id_usuario: [user.id_usuario],
      cedula: [user.cedula, Validators.required],
      nombres: [user.nombres, [Validators.required, Validators.minLength(1)]],
      apellidos: [user.apellidos, [Validators.required, Validators.minLength(1)]],
      celular: [user.celular, Validators.required],
      correo: [
        user.correo,
        [
          Validators.required,
          Validators.email,
        ]
      ],
      direccion: [user.direccion, Validators.required],
      id_tipo_documento: [user.id_tipo_documento == null || user.id_tipo_documento == undefined ? '' : user.id_tipo_documento, [Validators.required]],
      id_perfil: 0,
      id_estado: 0,
      login: [user.login, Validators.required],
      password: [user.password, Validators.required],
      eliminado:0
    });
  }

  public back = () => this.router.navigateByUrl('gestionUsuario');

  public updateOrCreateUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request: Usuario = this.form.value;
    
  if(this.isEdit ){

    this._usuarioService.updateUsuarioById(this.idUser, request).subscribe((r: any) => {

      console.log("Usuarios actualizado correctamente");
      this.router.navigateByUrl(`/gestionUsuario`);
    });
  }else{

    // this.spinnerSvc.show();
    this._usuarioService.createNewUsuario(request).subscribe((r: any) => {

        console.log("Usuarios creado correctamente");
        this.router.navigateByUrl(`/gestionUsuario`);

      });
  }



  }

  public getForm = (control: string) => this.form.get(control);

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
