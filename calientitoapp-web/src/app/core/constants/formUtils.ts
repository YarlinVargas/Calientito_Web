import { AbstractControl, ValidationErrors } from "@angular/forms";

export class FormUtils {
  public static fieldOneIsEqualFieldTwo = (fieldOne: string, fieldTwo: string, equals: boolean = true) =>
    (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldOneValue = formGroup.get(fieldOne)?.value;
      const fieldTwoValue = formGroup.get(fieldTwo)?.value;

      if (equals) {
        if (fieldOneValue !== fieldTwoValue) {
          formGroup.get(fieldTwo)?.setErrors({ Equals: true });
          return { Equals: true };
        }
      } else {
        if (fieldOneValue === fieldTwoValue) {
          formGroup.get(fieldTwo)?.setErrors({ password1: true });
          return { password1: true };
        }
      }

      if(formGroup.get(fieldTwo)?.hasError('Equals') ) {
        delete formGroup.get(fieldTwo)?.errors?.["noIguales"];
        formGroup.get(fieldTwo)?.updateValueAndValidity();
      }
      
      if(formGroup.get(fieldTwo)?.hasError('password1') ) {
        delete formGroup.get(fieldTwo)?.errors?.["password1"];
        formGroup.get(fieldTwo)?.updateValueAndValidity();
      }

      return null;
    }
}