import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobToBase64Service {

  constructor() { }

  convertBlobToBase64(blob: Blob): Observable<string> {
    return new Observable<string>(observer => {
      let reader: FileReader = new FileReader();
      reader.onload = () => observer.next(reader.result as string);
      reader.onloadend = () => observer.complete();
      reader.readAsDataURL(blob);

      return {
        unsubscribe: () => reader.abort(),
      }
    });
  } 
}
