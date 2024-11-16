export interface AuthModel {
  idPerfil: number;
  userName: string;
  password: string;
}
export interface UserModel {

  name: string;
  dateBirthday?: string | null,
  genero?: string | null,
  email?: string | null,
  password: string ,
  active : 1,
  idPerfil: number,
  creationDate: Date,
  updateDate?: null,
  lastName?: string | null,
  phoneNumber?: string | null,
  type_document?: string | null,
  num_document?: string | null,
  direccion?: string | null,
  department?: string | null,
  city?: string | null,
  userName: string,
}

export interface ReplyTokens {
  token: string;
  refreshtoken: string;
  redirect: string;
}
