import { Dialog } from "@angular/cdk/dialog";
import { dataModal, imgModals } from "../../models/modals/modal-data.model";
import { colors } from "../../models/general/general.model";
import { ModalMsjComponent } from "../../shared/modals/modal-msj/modal-msj.component";


export class openModals {

    modalTypeMap: {
        [key: number]: {
            img: imgModals,
            color: colors,
            btnColor: 'sky' | 'primary' | 'cyan' | 'borderCyan' | 'borderRed' | 'indigo' | 'indigoClean' | 'red' | 'amber' | 'amber400'
        }
    } = {
        1: { img: imgModals.success, color: colors.green, btnColor: 'cyan' },
        2: { img: imgModals.error, color: colors.red, btnColor: 'red' },
        3: { img: imgModals.warning, color: colors.yellow, btnColor: 'indigo' },
        4: { img: imgModals.question, color: colors.purple, btnColor: 'sky' },
        5: { img: imgModals.logo, color: colors.blue, btnColor: 'sky' }
    };

    constructor(public dialog: Dialog) { }

    OpenLogout(description: string[], width:string = '100%', title?: string, warningMessage?: string) {
        const configModal = this.modalTypeMap[3];

        const dataSend: dataModal = {
            img: configModal.img,
            title: title,
            description: description,
            color: configModal.color,
            firstButton: {
                label: 'Cancelar',
                color: 'amber400',
            },
            secondButton: {
                label: 'Aceptar',
                color: 'amber',
            },
            footer: true,
            warningMessage
        }

        const dialogRef = this.dialog.open(ModalMsjComponent, {
            width: width,
            maxWidth: '80%',
            data: dataSend,
            disableClose: true
        });

        dialogRef.componentInstance!.logoutEvent?.subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance!.acceptEvent?.subscribe(_=>{
          dialogRef.close();
        });

        return dialogRef;
    }

    Open(typeModal: number, description: string[], title?: string, width?:string, customColorButton?: any) {
        const mapping = this.modalTypeMap[typeModal];

        const dataSend: dataModal = {
            img: mapping.img,
            title: title,
            description: description,
            color: mapping.color,
            firstButton: { label: 'Aceptar', color: customColorButton || mapping.btnColor },
            footer: true
        }

        const dialogRef = this.dialog.open(ModalMsjComponent, {
            width: width,
            data: dataSend,
            maxWidth: '80%',
            disableClose: true
        });

        dialogRef.componentInstance!.acceptEvent?.subscribe(_=>{
          dialogRef.close();
        });

        return dialogRef;
    }


}
