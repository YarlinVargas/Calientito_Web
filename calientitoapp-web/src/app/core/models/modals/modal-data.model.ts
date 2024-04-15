import { colors } from "../general/general.model";

export interface dataModal {
    img: imgModals;
    title?: string;
    description?: string[];
    color: colors;
    firstButton: infoBtnModal;
    secondButton?: infoBtnModal;
    footer: boolean;
    warningMessage?: string;
}

export enum imgModals {
    success='/assets/img/modal/Confirmacion.png',
    error='/assets/img/modal/Error.png',
    warning='/assets/img/modal/Advertencia.png',
    question='/assets/img/modal/Informativo.png',
    logo = '/assets/img/modal/logo.png',
}

export interface infoBtnModal {
    label: string;
    color: 'sky' | 'primary' | 'cyan' | 'borderCyan' | 'borderRed' | 'indigo' | 'indigoClean' | 'red' | 'amber' | 'amber400';
    hover?: string;
}
