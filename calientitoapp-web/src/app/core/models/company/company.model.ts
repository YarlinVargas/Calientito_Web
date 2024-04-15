import { Actions } from "../general/actions-table.model"

export interface CompanyModel {
  idCompany: string,
  idCompanyUser: string,
  idContract: string,
  idAttentionCenter: string,
  irequestNumber: string,
  identificationNumber: string,
  initialDate: Date | null,
  finalDate: Date | null,
  requestStatus: string
}

export interface ConsultaModel {
  id: number,
  idRequest: number,
  idPatient: number,
  idContract: number,
  idAttentionCenter: number,
  attentionCenter: string,
  contractName: string,
  patientName: string,
  requestDate: string,
  requestNumber: string,
  requestStatus: string,
  selected: boolean,
  actions: Actions[]
}
