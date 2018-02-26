import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Injectable()
export class ParkingProvider {

  private baseUrl: String;

  constructor(public http: Http,
    @Inject(APP_CONFIG) private config: AppConfig) {
      this.baseUrl = config.backEndApiEndPoint;
  }

  getParkingLots(token){    
    return new Promise(resolve => {
      const headers = new Headers();
      headers.append('Token', token != undefined ? token : "");
      const options = new RequestOptions({headers: headers});
      this.http.get(`${this.baseUrl}/api/parking`, options)
      .subscribe(res =>resolve(res.json()));
    });
  }
}
