export class TypeOfUser {
  public static get Rol(): string {
    try {
      const infoUser = sessionStorage.getItem('auth') || "";
      if (!infoUser) return "";

      const currentToken = JSON.parse(infoUser).token;
      return JSON.parse(atob(currentToken.split('.')[1])).role;
    } catch (e) {
      return "";
    }  
  }
}