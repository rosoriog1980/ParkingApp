import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Injectable()
export class SharedParamsProvider {
  private baseUrl: String;
  private branchOffices: any[];

  constructor(public http: Http,
    @Inject(APP_CONFIG) public config: AppConfig) {
    this.baseUrl = config.backEndApiEndPoint;

    this.http.get(`${this.baseUrl}/api/branchOffice`)
    .subscribe(res => {
      this.branchOffices = res.json();
    });
  }

  getBranchOffices(){
    return new Promise(resolve => {
      resolve(this.branchOffices);
    });
  }

}
