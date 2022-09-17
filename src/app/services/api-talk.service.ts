import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTalkService {

  constructor(public http: HttpClient) {}

  async getData(passed_url: any) {
    return this.http
      .get(passed_url)
      .toPromise()
      .then(
        (result) => {          
          let res: any = {};
          res['json'] = result;
          res['status'] = 200;
          return res;
        },
        (err) => {
          return err.error;
        }
      )
      .catch((Error) => {
        Error['json'] = JSON.parse(Error['_body']);
        return Error;
      });
  }

}
