import { FormControl, FormGroup } from "@angular/forms";

export class FieldErros {

  getFormFieldError(form: FormGroup, name: string, control?: FormControl) {
    let formField: FormControl;

    if (control == undefined || control == null)
      formField = form.get(name) as FormControl;
    else
      formField = control;

    if (formField.hasError('required'))
      return 'Campo vacio'
    
    if (formField.hasError('email'))
      return 'Email no válido'
    
    if (formField.hasError('emailinvalid'))
      return 'Email no válido'
    
    if (formField.hasError('pattern'))
      return 'Mínimo 8 caracteres incluyendo mayúsculas, minúsculas, números y caracteres especiales'

    if (formField.hasError('positiveNumber'))
      return 'Solo se admiten valores positivos'
    
    if (formField.hasError('Equals'))
      return 'Las contraseñas no coinciden'
    
    if (formField.hasError('oldPassword'))
      return 'La contraseña antigua no coincide con la registrada'

    if (formField.hasError('equalsPassword'))
      return 'La contraseña no coincide con la registrada'
  
    if (formField.hasError('password1'))
      return 'La contraseña no puede ser igual a la registrada'
  
    if (formField.hasError('UserNotExist'))
      return 'Usuario no existe'

    if (formField.hasError('IdentificationExists'))
      return 'Tipo y número de identificación existentes'

    if (formField.hasError('EmailExist'))
      return 'Correo electronico existente.'

    if (formField.hasError('UserExists'))
      return 'Usuario ya existente'

    if (formField.hasError('MenuExists'))
      return 'Nombre Menú ya existente'

    if (formField.hasError('FechaNacimientoInvalida'))
      return 'Fecha no válida'

    if (formField.hasError('registrationNumberExists'))
      return 'Número de tarjeta existente'

    if (formField.hasError('CodeExists'))
      return 'Código existente'

    if (formField.hasError('NameExists'))
      return 'Nombre existente'

    if (formField.hasError('NameCIE10Exists'))
      return 'Nombre existente'

    if (formField.hasError('NumberAndNameContractExists'))
      return 'Número y nombre de contrato existente'

    if (formField.hasError('NameContractExists'))
      return 'Nombre de contrato existente'

    if (formField.hasError('NumberContractExists'))
      return 'Número de contrato existente'

    if (formField.hasError('NumberInstallmentExists'))
      return 'Número existente'

    if (formField.hasError('NitExists'))
      return 'NIT existente'

    if (formField.hasError('CodeAndNameExists'))
      return 'Código y nombre existente'
    
    if (formField.hasError('maxlength'))
      return 'El número de caracteres se ha superado'
    
    if (formField.hasError('phone'))
      return 'Ingrese mínimo 5 y máximo 15 dígitos'
    
    if (formField.hasError('selector'))
      return 'Error: sin selección'
    
    if (formField.hasError('dateExpiration'))
      return 'Fecha invalida'
    
    if (formField.hasError('combinationExist'))
      return 'Valor ya existente'
    
    if (formField.hasError('wrongDate'))
      return 'Verificar fecha seleccionada'

    if (formField.hasError('EmailIsTaken'))
      return 'La dirección de correo pertenece a otro usuario';
    
    return ''
  }

}
