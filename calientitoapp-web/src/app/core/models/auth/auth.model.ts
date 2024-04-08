export interface AuthModel {
  userName: string;
  password: string;
}

export interface ReplyTokens {
  token: string;
  refreshtoken: string;
  redirect: string;
}
