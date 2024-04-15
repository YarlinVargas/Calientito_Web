import { Pipe, PipeTransform } from '@angular/core';
import { ListRequerimientos } from '../../models/requirenment/list-requirenment.model';

@Pipe({
  name: 'filterRequeriments'
})
export class FilterRequerimentsPipe implements PipeTransform {

  transform(requirenments: ListRequerimientos[], ...args: any[]): any {
    let results: ListRequerimientos[] = [];
    let foundFields: string[] = [];

    if (requirenments?.length) {

      if (args[0].trim() == '') {
        return { results: requirenments, foundFields };
      }

      for (const requirenment of requirenments) {
        let found = false;

        if (requirenment.requirenmentNumber.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(requirenment);
          found = true;
          foundFields.push("requirenmentNumber");
        }
        if(requirenment.dateInitial.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(requirenment);
          found = true;
          foundFields.push("dateInitial");
        }
        if(requirenment.placa.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(requirenment);
          found = true;
          foundFields.push("placa");
        }
        if(requirenment.identificationNumber.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(requirenment);
          found = true;
          foundFields.push("identificationNumber");
        }
      }
    }

    foundFields = new Array(...new Set(foundFields));
    return { results, foundFields };
  }

}
