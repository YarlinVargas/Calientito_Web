import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService extends Dexie {

  logo: Dexie.Table<{ id: number,data: string }, number>;

  constructor() {
    super('resultadosDB');

    this.version(1).stores({
      logo: 'id,data',
    });

    this.logo = this.table('logo');
  }

  addImage(base64Data: string): Promise<number> {
    return this.logo.toArray().then(logos => {
      if (logos.length > 0) {
        const existingLogo = logos[0];
        existingLogo.data = base64Data;
        return this.logo.put(existingLogo, existingLogo.id);
      } else {
        return this.logo.add({ id: 1, data: base64Data });
      }
    });
  }

  getAllImages(): Promise<{ data: string }[]> {
    return this.logo.toArray();
  }
}
