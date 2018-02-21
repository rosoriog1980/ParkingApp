import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { Http } from '@angular/http';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  private baseUrl: String;
  constructor(public http: Http,
              @Inject(APP_CONFIG) private config: AppConfig) {
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
  
  getUser(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/api/user`)
      .subscribe(res => resolve(res.json()));
    });
  }

}
