import { AfterContentInit, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faIdCard, faFileLines, faAngleDown, faChevronRight, faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';
import { DataDetail, DataExam } from 'src/app/core/models/general/data-exam.model';
import { PatientService } from 'src/app/core/services/patient/patient.service';
import { SpinnerService } from 'src/app/core/services/gen/spinner.service';
import { RespService } from 'src/app/core/models/general/resp-service.model';
import { finalize } from 'rxjs';
import { ResultService } from '../../services/result/result.service';
import { Dialog } from '@angular/cdk/dialog';
import { openModals } from '../../global/modals/openModal';
import { colors } from '../../models/general/general.model';
import { dataModal, imgModals } from '../../models/modals/moda-data.model';
import { ModalMsjComponent } from '../modals/modal-msj/modal-msj.component';
import { TypeOfUser } from '../../constants/typeOfUser';
import { ModalInputComponent } from '../modals/modal-input/modal-input.component';
import { ModalInput } from '../../models/modals/modal-input.model';

@Component({
  selector: 'app-detalle-resultado',
  templateUrl: './detalle-resultado.component.html',
  styleUrls: ['./detalle-resultado.component.scss']
})
export class DetalleResultadoComponent implements OnInit, AfterContentInit, OnDestroy {
  /* Icons */
  faIdCard = faIdCard;
  faFileLines = faFileLines;
  faAngleDown = faAngleDown;
  faChevronRight = faChevronRight;
  faMaximize = faMaximize;
  faMinimize = faMinimize;

  /* Parametros */

  @Input()
  idRequest!: number;
  @Input()
  requestNumber!: string;
  @Input()
  requestStatus!: string;
  @Input()
  flag!: number;
  @Output() viewPDF: EventEmitter<any> = new EventEmitter();
  /* Variables */
  isAnimating: boolean = false;
  dataPatient: any = null;
  edad: any = null;
  contract: string = '';
  displayDocument: boolean = false;
  checkViewDetail: boolean = false;
  checkViewDocument: boolean = false;
  maximize: boolean = false;
  changeButton!: number;
  pdf :string= ''


  /* Documento */
  pdfb64: string = '';

  /* lista */
  listExams: DataExam[] = [];
  listResult!: DataDetail;
  typeUser: string = 'Empresa';

  private spinnerSvc = inject(SpinnerService);
  public openModal : openModals = new openModals(this.dialog);

  constructor(
    private resultSvc: ResultService,
    private patientSvc: PatientService,
    public dialog: Dialog,
  ) {
    // this.idRequest = this.activateRoute.snapshot.params['id'];
    // this.requestNumber = this.activateRoute.snapshot.params['request'];

  }

  ngOnInit(): void {

    this.consultExamRequest(this.idRequest)
    const url = JSON.parse(sessionStorage.getItem('auth') || "")?.redirect;

    if (url != "welcomeCompany")
      this.typeUser = 'Paciente';
      if (sessionStorage.getItem('requestStatus') != null) {
        this.requestStatus = String(sessionStorage.getItem('requestStatus'));
      }
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.isAnimating = true;
    }, 100);
    if (sessionStorage.getItem('detail') != null) {
      const data = JSON.parse(sessionStorage.getItem('detail')!);
      this.contract = data[0];
      this.displayDocument = String(data[1]).includes('Finalizado') || String(data[1]).includes('parcial');
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('detail');
    sessionStorage.removeItem('requestStatus');

  }

  viewDocument(status: boolean) {
    this.checkViewDocument = status;
    if (status) {
      this.spinnerSvc.show()
      this.resultSvc.PDF(this.idRequest)
        .pipe(
          finalize(() => {
            this.spinnerSvc.hide();
          }))
          .subscribe(
            {
              next: (r: RespService) => {
                const sliceSize = 512
                let byteCharacters = atob(r.data.reporte); //data.file there

                let byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {

                  let slice = byteCharacters.slice(offset, offset + sliceSize);

                  let byteNumbers = new Array(slice.length);

                  for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                  }

                  let byteArray = new Uint8Array(byteNumbers);

                  byteArrays.push(byteArray);

                }

                const data: Blob = new Blob(byteArrays, { type: 'application/pdf' });

                const url = window.URL.createObjectURL(data);


                this.pdfb64 = url + '#toolbar=0';
                this.checkViewDetail = false;
              },
              error: (err: any) => {
                this.openModal.Open(
                  2,
                  [],
                  'Error en la descarga de los datos seleccionados.',
                  '25rem'
                );
              }
            }
          );
    }
  }

  Dowload() {
    const source = `${this.pdfb64}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `resultado.pdf`
    link.click();
  }

  EmailToSend() {
    const configModal = { img: imgModals.question, color: colors.purple, btnColor: 'sky' };
    const userRol = TypeOfUser.Rol.trim().toLowerCase();

    let dataModal: ModalInput | dataModal | {} = {};
    let componentModal: any = null;

    if (userRol === 'empresa') {
      dataModal = {
        img: configModal.img,
        description: [],
        title: 'Se enviaran los resultados a: ' + this.dataPatient?.email,
        color: configModal.color,
        firstButton: {
          label: 'Cancelar',
          color: 'indigoClean',
          hover: 'bg-pink'
        },
        secondButton: {
          label: 'Enviar',
          color: 'indigo',
          hover: 'bg-teal500'
        },
        footer: true,
      };
      componentModal = ModalMsjComponent;
    } else if(userRol === 'paciente') {
      dataModal = {
        img: configModal.img,
        title: 'Se enviaran los resultados a:',
        color: configModal.color,
        input: {
          type: 'email',
          label: 'Correo electrónico',
          placeholder: 'Escribir correo electrónico',
          name: 'email'
        },
        firstButton: {
          label: 'Cancelar',
          color: 'indigoClean',
          hover: 'bg-pink'
        },
        secondButton: {
          label: 'Continuar',
          color: 'indigo',
          hover: 'bg-teal500'
        },
        footer: true,
      };
      componentModal = ModalInputComponent;
    }

    if (Object.keys(dataModal).length === 0) return;

    const dialogRef: any = this.dialog.open(componentModal, {
      width: '30rem',
      maxWidth: '80%',
      data: dataModal,
      disableClose: true
    });

    dialogRef.componentInstance!.logoutEvent?.subscribe((data: any) => {
      dialogRef.close();

      const emailToSend = data.value;

      if(userRol === 'paciente') {
        dataModal = {
          img: configModal.img,
          title: 'Por motivos de seguridad digite su contraseña',
          color: configModal.color,
          input: {
            type: 'password',
            label: 'Contraseña',
            placeholder: '',
            name: 'password'
          },
          firstButton: {
            label: 'Cancelar',
            color: 'indigoClean',
            hover: 'bg-pink'
          },
          secondButton: {
            label: 'Enviar',
            color: 'indigo',
            hover: 'bg-teal500'
          },
          footer: true,
        };

        const dialogPass: any = this.dialog.open(componentModal, {
          width: '30rem',
          maxWidth: '80%',
          data: dataModal,
          disableClose: true
        });

        dialogPass.componentInstance!.logoutEvent?.subscribe((data2: any) => {
          dialogPass.close();
          this.SendPdf(emailToSend);
        });

        dialogPass.componentInstance!.acceptEvent?.subscribe(()=> dialogPass.close());
      } else {
        this.SendPdf();
      }
    });

    dialogRef.componentInstance!.acceptEvent?.subscribe(()=> dialogRef.close());
  }

  public SendPdf(email?: string) {
    this.spinnerSvc.show();
      this.resultSvc.EmailToPDF({ id: this.idRequest }, email)
        .pipe(
          finalize(() => {
            this.spinnerSvc.hide();
          })
        )
        .subscribe(
          {
            next: () => {
              this.openModal.Open(
                1,
                [],
                '¡Enviado correctamente! Se ha enviado la información con éxito al correo registrado.',
                '25rem'
              );
            },
            error: (err: any) => {
              this.openModal.Open(
                2,
                [],
                '¡Ah ocurrido un error! No se ha enviado la información al correo registrado',
                '25rem'
              );
            }
          });
  }

  detailExam($event: any) {
    var id = $event.row['id'];
    this.changeButton = $event.idn
    if (id != null && id > 0) {
      this.spinnerSvc.show();
      this.patientSvc.ConsultResultExam(id)
        .pipe(
          finalize(() => {
            this.spinnerSvc.hide();
          }))
        .subscribe((resp: RespService) => {
          const data: DataDetail = {
            ...resp.data.exam, result: resp.data.results
          }

          this.listResult = data;

          this.checkViewDocument = false;
          this.changeButton == 2 ? this.checkViewDetail = false: this.checkViewDetail = true;
        });
    }
  }

  private consultExamRequest(id: number) {
    this.spinnerSvc.show();
    this.patientSvc.ConsultExam_Request(id)
      .pipe(
        finalize(() => {
          this.spinnerSvc.hide();
        }))
      .subscribe((resp: RespService) => {
        this.dataPatient = resp.data.patient;

        const partes = resp.data.patient.age.split(',');
        this.edad = partes[0].trim();
        this.listExams = resp.data.exam.map((item: any) => {
          return { id: item.idPatient_Exam, open: false, ...item }
        });
      })

  }

}
