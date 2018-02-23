import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { Http, Headers, RequestOptions } from '@angular/http';



@Injectable()
export class UserProvider {
  private baseUrl: String;
  constructor(public http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    ) {
    this.baseUrl = config.backEndApiEndPoint;
  }

  registerNewUser(bodyObj){
    return new Promise(resolve => {
      const body = bodyObj;
      this.http.post(`${this.baseUrl}/api/user`, body)
      .subscribe(res => resolve(res.json()));
    });
  }

  login(userAuth){
    return new Promise(resolve => {
      const body = userAuth;
      this.http.post(`${this.baseUrl}/api/user/auth`, body)
      .subscribe(res => resolve(res));
    });
  }

  validateLogin(token){
    return new Promise(resolve => {
      const body = {usr: token};
      this.http.post(`${this.baseUrl}/api/user/validAuth`, body)
      .subscribe(res => resolve(res.json()));
    });
  }

  getUser(token){
    return new Promise(resolve => {
      const headers = new Headers();
      headers.append('Token', token != undefined ? token : "");
      const options = new RequestOptions({headers: headers});
      this.http.get(`${this.baseUrl}/api/user`, options)
      .subscribe(res =>resolve(res.json()));
    });
  }
}
