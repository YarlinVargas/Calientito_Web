export class CustomRegex {
  public static get regexPassword(): RegExp {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$/!%*?&])[A-Za-z\d@$/!%*?&]{8,20}$/;
  }
}