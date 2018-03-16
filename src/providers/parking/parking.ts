import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Injectable()
export class ParkingProvider {

  private baseUrl: String;

  constructor(public http: Http,
    @Inject(APP_CONFIG) private config: AppConfig) {
      this.baseUrl = config.backEndApiEndPoint;
  }

  getParkingLots(token, zoneId){
    return new Promise(resolve => {
      const params = new URLSearchParams();
      const headers = new Headers();
      headers.append('Token', token != undefined ? token : "");
      params.append('zoneId', zoneId);
      const options = new RequestOptions({headers: headers, params: params});
      this.http.get(`${this.baseUrl}/api/parking`, options)
      .subscribe(res =>resolve(res.json()));
    });
  }

  getHomeInfo(token, officeId){
    return new Promise(resolve => {
      const headers = new Headers();
      const params = new URLSearchParams();
      headers.append('Token', token != undefined ? token : "");
      params.append('officeId', officeId);
      const options = new RequestOptions({headers: headers, params: params});
      this.http.get(`${this.baseUrl}/api/parking/home`, options)
      .subscribe(res =>resolve(res.json()));
    });
  }
}
