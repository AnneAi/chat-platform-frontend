import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  /**************************/
  /*  interface
  /**************************/

  /*  Retrieve the name of all the rooms from the api.

      PARAMS
        none

      RETURN
        (Observable)
  */
  public getAllRoomsName(): Observable<Array<string>> {
    let observable = new Observable(observer => {
      this.http.get(`${environment.api}/rooms`).subscribe(
        (data: any) => {
          if(data.success) {
            observer.next(data.rooms);
          } else {
            observer.next([ ]);
          }
        }
      );
    });

    return observable;
  }
}
