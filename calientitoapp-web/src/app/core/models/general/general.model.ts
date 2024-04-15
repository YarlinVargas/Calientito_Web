export interface ListModel {
    id: number | string;
    name: string;
}

export enum colors {
    green = 'rgb(25, 183, 175)',
    blue = 'rgb(0, 160, 236)',
    yellow = 'rgb(255,183,3)',
    purple = 'rgb(99,121,216)',
    red = 'rgb(209,62,73)',
}

export class SpinnerText{
    text!: string;
    text1?:string;
    text2?:string;
    class?:string;
}
export interface ListTipoDocumento {
  id_documento: number | string;
  descripcion: string;
}
