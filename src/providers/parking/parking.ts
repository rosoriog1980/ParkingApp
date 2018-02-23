import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

/*
  Generated class for the ParkingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingProvider {

  private baseUrl: String;

  constructor(public http: Http,
    @Inject(APP_CONFIG) private config: AppConfig) {
      this.baseUrl = config.backEndApiEndPoint;
  }

  getParkingLots(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/api/parking`)
      .subscribe(res => resolve(res.json()));
    });
  }
}
