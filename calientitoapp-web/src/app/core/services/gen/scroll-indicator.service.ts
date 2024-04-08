import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollIndicatorService {

  private scrollSubject = new Subject<void>();

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }

  emitScrollEvent() {
    this.scrollSubject.next();
  }
}
