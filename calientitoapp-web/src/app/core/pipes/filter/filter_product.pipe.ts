import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../../models/productos/producto.model';


@Pipe({
  name: 'filterProducto'
})
export class FilterProductoPipe implements PipeTransform {

  transform(products: Producto[], ...args: any[]): any {
    let results: Producto[] = [];
    let foundFields: string[] = [];

    if (products?.length) {

      if (args[0].trim() == '') {
        return { results: products, foundFields };
      }

      for (const product of products) {
        let found = false;

        if (product.descripcion.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(product);
          found = true;
          foundFields.push("descripcion");
        }
        if(product.marca.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(product);
          found = true;
          foundFields.push("marca");
        }
        if(product.codigo.toLowerCase().includes(args[0].trim().toLowerCase())) {
          !found && results.push(product);
          found = true;
          foundFields.push("codigo");
        }
      }
    }

    foundFields = new Array(...new Set(foundFields));
    return { results, foundFields };
  }

}
