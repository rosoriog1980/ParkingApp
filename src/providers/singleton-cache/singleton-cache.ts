import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SingletonCacheProvider {
  token: String;
  user: any;

  constructor(private storage: Storage) {
      this.storage.get('loginToken')
      .then(val => {
        this.token = val;
      });
  }

  getLoginToken(){
    return new Promise(resolve => {
      if (this.token != undefined) {
        resolve(this.token);
      } else {
        this.storage.get('loginToken')
        .then(val => {
          this.token = val;
          resolve(this.token);
        });
      }
    });
  }

  setLoginToken(val){
    return new Promise(resolve => {
      this.storage.set('loginToken', val);
      this.token = val;
      resolve(val);
    });
  }

  removeLoginToken(){
    return new Promise(resolve => {
      this.storage.remove('loginToken');
      this.token = undefined;
      resolve("done");
    });
  }

  setUser(user){
    return new Promise(resolve => {
      this.user = user;
      resolve(this.user);
    });
  }

  getUser(){
    return new Promise(resolve => {
      resolve(this.user);
    });
  }
}
