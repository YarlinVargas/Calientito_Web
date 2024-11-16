export interface BakerieModel {
  idPanaderia: number,
  name: string,
  address: string,
  descripcion: string,
  creationDate: Date,
  updateDate: Date | null,
  active: boolean
}
