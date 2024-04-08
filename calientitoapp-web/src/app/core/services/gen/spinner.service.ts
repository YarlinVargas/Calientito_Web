import { EventEmitter, Injectable, Output } from '@angular/core';
import { SpinnerText } from '../../models/general/general.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading$ = new Subject<boolean>();
  alert$ = this.isLoading$.asObservable();

  @Output() text: EventEmitter<SpinnerText> = new EventEmitter()
  
  show():void{
    this.isLoading$.next(true);
  }
  
  hide():void{
    this.text.emit({text:"",text1:"",text2:""})
    this.isLoading$.next(false);
  }
}
