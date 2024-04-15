export interface CreateUpdateUser {
  id_usuario: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
  direccion:string;
  id_tipo_documento?: number;
  // id_perfil: number;
  // id_estado: number;
  login: string;
  password:string;

}
export interface ContractWithFilter {
  idContract: number;
  contractCode: number;
  contractName: string;
  waitingResult: number;
  partialResult: number;
  finishedResult: number;
}
