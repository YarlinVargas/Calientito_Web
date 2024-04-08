import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerText } from '../../models/general/general.model';
import { SpinnerService } from '../../services/gen/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewChecked{

  isLoading$ = this.spinnerSvc.isLoading$;
  porcentajeMax: number = 0;
  stateLoad!: boolean;
  dataText:SpinnerText = new SpinnerText();

  constructor(private spinnerSvc: SpinnerService,private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.spinnerSvc.alert$.subscribe(resp => {
      this.stateLoad = resp;
    });

    this.spinnerSvc.text.subscribe(resp => {
      this.dataText = resp;
    })
    this.calcPorcentaje();
  }

  calcPorcentaje() {
    this.stateLoad == false ? this.porcentajeMax = 0 : this.porcentajeMax;
    this.porcentajeMax = Math.ceil(this.porcentajeMax + 1);
    setTimeout(() => {
      if (this.porcentajeMax<100) {
        this.calcPorcentaje();
      }

      if (this.porcentajeMax==100){
        this.porcentajeMax=0;
      }
    }, 200);
  }
}
