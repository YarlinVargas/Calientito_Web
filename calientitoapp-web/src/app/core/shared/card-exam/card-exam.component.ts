import { Component, Input } from '@angular/core';
import { faChevronRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { DataDetail, DataExam } from '../../models/general/data-exam.model';
import { PatientService } from '../../services/patient/patient.service';

@Component({
  selector: 'app-card-exam',
  templateUrl: './card-exam.component.html',
  styleUrls: ['./card-exam.component.scss']
})
export class CardExamComponent {
  @Input()
  estado!: 'En espera de resultados';
  @Input()
  dataExams!: DataExam;
  @Input()
  dataExam!: DataExam[];

  /* Detalle de examen */
  dataDetail!: DataDetail;
  idPatient_Exam: number = 0;

  faChevronRight = faChevronRight;
  faAngleDown = faAngleDown;
  openCard = 2;
  viewDetail!: boolean;

  toggleButton($cardNumber: number) {
    this.openCard = $cardNumber;
  }

  constructor(private patientSvc: PatientService) { }

  public detailExam(id: number, idn: number) {
    var changeButton = idn
    if (id != null && id > 0) {
      this.patientSvc.ConsultResultExam(id).subscribe((resp) => {
        const data: DataDetail = {
          ...resp.data.exam, result: resp.data.results
        }
        this.dataDetail = data;

        this.idPatient_Exam = id;
        changeButton==2?this.viewDetail = true:this.viewDetail = false;

        this.dataExam.forEach(element => {
          if (element.id == id) {
            element.open = true;
          } else {
            element.open = false;
          }
        });
      });
    }
  }
}
