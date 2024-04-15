import { Pipe, PipeTransform } from '@angular/core';
import { ListUsuario } from '../../models/user/list-user.model';
import { Usuario } from '../../services/usuario/usuario.service';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: Usuario[], ...args: any[]): any {
    let results: Usuario[] = [];
    let foundFields: string[] = [];

    if (users?.length) {

      if (args[0].trim() == '') {
        return { results: users, foundFields };
      }

      for (const user of users) {
        let found = false;

        if (user.nombres.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(user);
          found = true;
          foundFields.push("nombres");
        }
        if(user.apellidos.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(user);
          found = true;
          foundFields.push("apellidos");
        }
        if(user.correo.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(user);
          found = true;
          foundFields.push("correo");
        }
        if(user.login.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(user);
          found = true;
          foundFields.push("login");
        }
      }
    }

    foundFields = new Array(...new Set(foundFields));
    return { results, foundFields };
  }

}
