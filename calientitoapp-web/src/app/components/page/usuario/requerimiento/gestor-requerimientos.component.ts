import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, finalize, takeUntil, tap } from 'rxjs';
import { TextLargeWindow } from 'src/app/core/constants/textLargeWindow';
import { openModals } from 'src/app/core/global/modals/openModal';
import { ToggleListEnum } from 'src/app/core/models/enums/toggleList.enum';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { ListRequerimientos } from 'src/app/core/models/requirenment/list-requirenment.model';
import { TootilpOption } from 'src/app/core/models/tooltip-options.model';
import { FilterRequerimentsPipe } from 'src/app/core/pipes/filter/filter-requirenments.pipe';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { RequirenmentService } from 'src/app/core/services/requirenment/requirenment.service';



@Component({
  selector: 'app-gestor-requerimientos',
  templateUrl: './gestor-requerimientos.component.html',
  styleUrls: ['./gestor-requerimientos.component.scss']
})
export class GestorRequerimientosComponent {
  public currentView:boolean=true;
  public isOpen:boolean=false;
  public allOptions = ToggleListEnum;
  public formRequerimiento: FormGroup = new FormGroup({});
  public tooltip: TootilpOption = {
    enable: true,
    placement: 'top',
    showDelay: 0,
    hideDelay: 0,
  };

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private requirenmentService = inject(RequirenmentService);
  private spinnerSvc = inject(SpinnerService);

  listRequerimientos:ListRequerimientos[] = [
    { idRequirenment: 1, dateInitial:'26/03/2024', requirenmentNumber: '12345689', placa: 'DKR234', identificationNumber: '111111',  active:true},
    { idRequirenment: 2, dateInitial:'26/03/2024',requirenmentNumber: '987456123', placa: 'HFL93B', identificationNumber: '222222',  active:true},
    { idRequirenment: 3, dateInitial:'26/03/2024',requirenmentNumber: '445678921', placa: 'UYH123', identificationNumber: '333333',  active:true }
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


  constructor(public dialog: Dialog, public pipe: FilterRequerimentsPipe, private eRef: ElementRef) {
    this.formRequerimiento = this.fb.group({
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
    this.formRequerimiento.get('search')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((value: string) => {
          this.optionsSearch = [];
        }),
        filter((value: string) => value.length > 2),
      )
      .subscribe((value: string) => {
        var resultPipe: any = this.pipe.transform(this.listRequerimientos, value);
        this.optionsSearch = resultPipe.results.map((requirenment: any) =>
          resultPipe.foundFields.map((field: string) => requirenment[field])
        ).flat();
      });

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
    this.formRequerimiento.get('search')?.setValue(event);
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
        [`El requerimiento "${this.listRequerimientos[event[1]].requirenmentNumber}" no podrá ser accesible en el sistema`],
        '30rem',
        '¿Esta seguro de deshabilitar este requerimiento?',
      );

      dialog.componentInstance!.logoutEvent?.subscribe(_ => {
        this.ActiveOrDeactiveRequerimiento(event[1], event[0]);
      });
    } else this.ActiveOrDeactiveRequerimiento(event[1], event[0]);
  }

  public ActiveOrDeactiveRequerimiento(index: number, status: boolean): void {
    this.requirenmentService.ActiveOrDeactive(this.listRequerimientos[index].idRequirenment)
      .pipe(
        tap((resp: RespService) => {
          if (resp.ok) {
            this.listRequerimientos[index].active = status;
          }
        }),
        finalize(() => {
          this.spinnerSvc.hide();
        })
      )
      .subscribe((resp: RespService) => {
        if (resp.ok == true) {
          if (status)
            this.openModal.Open(1, [], '¡Reqerimiento habilitado con éxito!', '25rem');
          else
            this.openModal.Open(3, [], '¡Reqerimiento deshabilitado correctamente!', '25rem', 'amber');
        } else
          this.openModal.Open(
            2,
            [],
            status ? `¡El requerimiento no se ha habilitado!`: '¡El requerimiento no se ha deshabilitado!',
            '25rem'
          );
      });
  }

  public getValueForm = (id: string): string => this.formRequerimiento.get(id)?.value;

  public navigate(url: string, event?: any): void {
    if (event?.header === 'Editar')
      this.router.navigate([url, event.id]);
    else if (event?.header === 'Eliminar')
      this.deleteRequirenment(event.id);
    // else if (event?.header === 'Detalles')
    //   this.showDetails(event.id);
    else
      this.router.navigateByUrl(url);
  }

  public deleteRequirenment(idRequirenment: number) {
    const currentRequirenment = this.listRequerimientos.find((requerimient: ListRequerimientos) => requerimient.idRequirenment == idRequirenment);
    if (!currentRequirenment) return;

    const dialog = this.openModal.OpenLogout(
      [`El requerimiento "${currentRequirenment?.requirenmentNumber}" no podrá ser accesible en el sistema`],
      '30rem',
      '¿Esta seguro que desea eliminar este requerimiento?',
      'Esta acción es permanente'
    );

    dialog.componentInstance!.logoutEvent?.subscribe(_ => {
      this.requirenmentService.Delete(currentRequirenment.idRequirenment)
        .pipe(
          tap((resp: RespService) => {
            if (resp.ok) {
              this.listRequerimientos = this.listRequerimientos.filter((requirenment: ListRequerimientos) => requirenment.idRequirenment != idRequirenment);
            }
          }),
          finalize(() => {
            this.spinnerSvc.hide();
          })
        )
        .subscribe((resp: RespService) => {
          if (resp.ok == true)
            this.openModal.Open(1, [], '¡Requerimiento eliminado correctamente!', '25rem');
          else
            this.openModal.Open(2, [], '¡El Requerimiento no se ha eliminado!', '25rem');
        });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

