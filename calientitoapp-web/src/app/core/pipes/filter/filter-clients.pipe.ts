import { Pipe, PipeTransform } from '@angular/core';
import { ListClients } from '../../models/client/list-client.model';

@Pipe({
  name: 'filterClients'
})
export class FilterClientsPipe implements PipeTransform {

  transform(clients: ListClients[], ...args: any[]): any {
    let results: ListClients[] = [];
    let foundFields: string[] = [];

    if (clients?.length) {

      if (args[0].trim() == '') {
        return { results: clients, foundFields };
      }

      for (const client of clients) {
        let found = false;

        if (client.name.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(client);
          found = true;
          foundFields.push("name");
        }
        if(client.identificationNumber.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(client);
          found = true;
          foundFields.push("identificationNumber");
        }
        if(client.phoneNumber.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(client);
          found = true;
          foundFields.push("phoneNumber");
        }

      }
    }

    foundFields = new Array(...new Set(foundFields));
    return { results, foundFields };
  }

}
