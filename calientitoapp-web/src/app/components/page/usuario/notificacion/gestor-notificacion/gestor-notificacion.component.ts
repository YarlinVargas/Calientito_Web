import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, finalize, takeUntil, tap } from 'rxjs';
import { TextLargeWindow } from 'src/app/core/constants/textLargeWindow';
import { openModals } from 'src/app/core/global/modals/openModal';
import { ToggleListEnum } from 'src/app/core/models/enums/toggleList.enum';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { ListNotifications } from 'src/app/core/models/notification/list_notification.model';
import { TootilpOption } from 'src/app/core/models/tooltip-options.model';
import { FilterClientsPipe } from 'src/app/core/pipes/filter/filter-clients.pipe';
import { ClientService } from 'src/app/core/services/client/client.service';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';

@Component({
  selector: 'app-gestor-notificacion',
  templateUrl: './gestor-notificacion.component.html',
  styleUrls: ['./gestor-notificacion.component.scss']
})
export class GestorNotificacionComponent {
  public currentView:boolean=true;
  public isOpen:boolean=false;
  public allOptions = ToggleListEnum;
  public formClient: FormGroup = new FormGroup({});
  public tooltip: TootilpOption = {
    enable: true,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0,
  };

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clientService = inject(ClientService);
  private spinnerSvc = inject(SpinnerService);

  listNotification:ListNotifications[] = [
    { id_recordatorio: 1, name:'Felipe Lopez', email: 'felipe@gmail.com', phoneNumber: '9452687',fecha:'12/01/1985',   active:true},
    { id_recordatorio: 2, name:'Juliana Ramirez', email: 'juliana@gmail.com', phoneNumber: '98848888',fecha:'12/01/1985',  active:true},
    { id_recordatorio: 3, name:'Susana Cardenas', email: 'susana@gmail.com', phoneNumber: '8818049',  fecha:'12/01/1985', active:true }
  ];
  public optionsSearch: string[] = [];

  public currentLargeTextCard = 10;
  public currentLargeTextTable = 10;
  public openModal: openModals = new openModals(this.dialog);
  public destroy$: Subject<boolean> = new Subject<boolean>();

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentLargeTextCard = TextLargeWindow.get(15, 20, 15, 25);
    this.currentLargeTextTable = TextLargeWindow.get(15);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.optionsSearch = [];
    }
  }

  @HostListener('window:resize',['$event'])
  Resolucion(event:any): void{
    setTimeout(()=>{
      this.calcularCarta()
    },100)
  }


  constructor(public dialog: Dialog, public pipe: FilterClientsPipe, private eRef: ElementRef) {
    this.formClient = this.fb.group({
      search: ['']
    });
    this.calcularCarta()
  }

  calcularCarta() {
    if (window.innerWidth < 768) {
      this.currentView=true
    }
  }

  public ngOnInit(): void {
    // this.formClient.get('search')?.valueChanges
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     tap((value: string) => {
    //       this.optionsSearch = [];
    //     }),
    //     filter((value: string) => value.length > 2),
    //   )
    //   .subscribe((value: string) => {
    //     var resultPipe: any = this.pipe.transform(this.listNotification, value);
    //     this.optionsSearch = resultPipe.results.map((client: any) =>
    //       resultPipe.foundFields.map((field: string) => client[field])
    //     ).flat();
    //   });

    this.currentLargeTextCard = TextLargeWindow.get(15, 20, 15, 25);
    this.currentLargeTextTable = TextLargeWindow.get(15);

    // this.spinnerSvc.show();
    //   this.userService.Consult().
    //   pipe(
    //     finalize(() => {
    //       this.spinnerSvc.hide();
    //     })
    //   ).
    // subscribe((resp: RespService) => {
    //   this.listUsers = resp.data;
    // });
  }

  public setSuggestion(event: any) {
    this.formClient.get('search')?.setValue(event);
    this.optionsSearch = [];
  }

  public toggleView(){
    this.currentView = !this.currentView
  }

  public OpenMenu(){
    this.isOpen = !this.isOpen;
  }

  public changeStatus(event: [boolean, number]) {
    if (event[1] == undefined) return;

    if (event[0] == false) {
      const dialog = this.openModal.OpenLogout(
        [`El cliente "${this.listNotification[event[1]].name}" no podrá ser accesible en el sistema`],
        '30rem',
        '¿Esta seguro de deshabilitar este cliente?',
      );

      dialog.componentInstance!.logoutEvent?.subscribe(_ => {
        this.ActiveOrDeactiveClient(event[1], event[0]);
      });
    } else this.ActiveOrDeactiveClient(event[1], event[0]);
  }

  public ActiveOrDeactiveClient(index: number, status: boolean): void {
    this.clientService.ActiveOrDeactive(this.listNotification[index].id_recordatorio)
      .pipe(
        tap((resp: RespService) => {
          if (resp.ok) {
            this.listNotification[index].active = status;
          }
        }),
        finalize(() => {
          this.spinnerSvc.hide();
        })
      )
      .subscribe((resp: RespService) => {
        if (resp.ok == true) {
          if (status)
            this.openModal.Open(1, [], 'Cliente habilitado con éxito!', '25rem');
          else
            this.openModal.Open(3, [], '¡Cliente deshabilitado correctamente!', '25rem', 'amber');
        } else
          this.openModal.Open(
            2,
            [],
            status ? `¡El cliente no se ha habilitado!`: '¡El cliente no se ha deshabilitado!',
            '25rem'
          );
      });
  }

  public getValueForm = (id: string): string => this.formClient.get(id)?.value;

  public navigate(url: string, event?: any): void {
    if (event?.header === 'Editar')
      this.router.navigate([url, event.id]);
    else if (event?.header === 'Eliminar')
      this.deleteClient(event.id);
    // else if (event?.header === 'Detalles')
    //   this.showDetails(event.id);
    else
      this.router.navigateByUrl(url);
  }

  public deleteClient(id_recordatorio: number) {
    const currentClient = this.listNotification.find((notification: ListNotifications) => notification.id_recordatorio == id_recordatorio);
    if (!currentClient) return;

    const dialog = this.openModal.OpenLogout(
      [`El cliente "${currentClient?.name}" no podrá ser accesible en el sistema`],
      '30rem',
      '¿Esta seguro que desea eliminar este cliente?',
      'Esta acción es permanente'
    );

    dialog.componentInstance!.logoutEvent?.subscribe(_ => {
      this.clientService.Delete(currentClient.id_recordatorio)
        .pipe(
          tap((resp: RespService) => {
            if (resp.ok) {
              this.listNotification = this.listNotification.filter((notification: ListNotifications) => notification.id_recordatorio != id_recordatorio);
            }
          }),
          finalize(() => {
            this.spinnerSvc.hide();
          })
        )
        .subscribe((resp: RespService) => {
          if (resp.ok == true)
            this.openModal.Open(1, [], '¡Cliente eliminado correctamente!', '25rem');
          else
            this.openModal.Open(2, [], '¡El Cliente no se ha eliminado!', '25rem');
        });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

