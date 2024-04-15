import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faReply,
  faFileExcel,
  faFileLines,
  faMagnifyingGlass,
  faBroomBall,
  faEye,
  faDownload,
  faEnvelope,
  faPlus,
 faLink
} from '@fortawesome/free-solid-svg-icons';
import { ModalMsjComponent } from '../modals/modal-msj/modal-msj.component';
import { dataModal, imgModals } from '../../models/modals/modal-data.model';
import { colors } from '../../models/general/general.model';
import { openModals } from '../../global/modals/openModal';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'sky700' | 'sky' | 'primary' | 'cyan' | 'azul' | 'teal' | 'borderCyan' | 'borderRed' | 'indigo' | 'indigoClean' | 'red' | 'amber' | 'amber400' | 'neutral' = 'primary';
  @Input()
  width!: '10' | '24' | '32' | '40' | '48' | '64' | '72' | '80' | '96' | 'auto';
  @Input()
  height!: '5' | '6' | '7' | '8' | '9' | '10';
  @Input() button = 1;
  @Input() label = 'Detalle';
  @Input() disable: boolean = false;
  @Input({
    required: false,
    alias: 'colorHover'
  }) customHover?: string = '';

  faReply = faReply;
  faFileExcel = faFileExcel;
  faMagnifyingGlass = faMagnifyingGlass;
  faBroomBall = faBroomBall;
  faEye = faEye;
  faDownload = faDownload;
  faEnvelope = faEnvelope;
  faPlus = faPlus;
  faLink = faLink;
  faFileLines = faFileLines;

  mapColors = {
    sky700: {
      'bg-sky700': true,
      'hover:bg-sky500': true,
    },
    sky:{
      'bg-sky500': true,
      'hover:bg-sky-400': true,
    },
    primary:{
      'bg-sky700': true,
      'hover:bg-sky500': true,
    },
    cyan: {
      'bg-teal500': true,
      'hover:bg-teal-300': true,
    },
    azul:{
      'bg-sky700': true,
    },
    teal: {
      'bg-teal500': true,
    },
    borderCyan: {
      'border-sky700': true,
      'hover:bg-lightSkyBlue': true,
    },
    red:{
      'bg-red-600': true,
      'hover:bg-red-200': true,
      'text-white':true,
    },
    borderRed: {
      'border-red-600': true,
      'hover:bg-red-200': true,
    },
    indigo: {
      'bg-indigo600': true,
      'hover:bg-indigo300': true,
    },
    indigoClean: {
      'bg-indigo300': true,
      'hover:bg-indigo300': true,
    },
    amber: {
      'bg-amber-500': true,
      'hover:bg-amber-400': true,
    },
    amber400: {
      'bg-amber-400': true,
      'hover:bg-amber-300': true,
    },
    neutral: {
      'bg-neutral400': true,
      'hover:bg-neutral200': true,
    }
  }

  get colors() {
    let colors: any = this.mapColors[this.color];

    if (colors) {
      if (this.customHover)
        colors[`hover:${this.customHover}`] = true;

      return colors
    }else{
      return {};
    }
  }

  public openModal : openModals = new openModals(this.dialog);

  constructor(
    public dialog: Dialog,
    public route: Router,
    public authService: AuthService
  ) { }

  public modalLogout() {
    const dialog = this.openModal.OpenLogout(
      [],
      '25rem',
      '¿Esta seguro que desea salir?'
    );

    dialog.componentInstance!.logoutEvent?.subscribe(_ => {
      this.authService.LogOut().subscribe(() => {
        sessionStorage.clear();
        this.route.navigateByUrl('/login');
      });
    });
  }
}


