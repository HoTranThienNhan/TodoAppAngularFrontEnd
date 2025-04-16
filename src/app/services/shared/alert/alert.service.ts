import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertRequest } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // _isConfirmedBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _alertRequestSubject: Subject<AlertRequest> = new Subject<AlertRequest>();
  alertRequest$: Observable<AlertRequest> = this._alertRequestSubject.asObservable();

  constructor() { 
    
  }

  confirm(onConfirm: () => void): void {
    this._alertRequestSubject.next({ onConfirm });
  }
}
