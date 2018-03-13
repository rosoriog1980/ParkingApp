import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { UserProvider } from '../../providers/user/user';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token: string;
  userName: string;
  branchOffice: string;

  constructor(public navCtrl: NavController,
    private parkingService: ParkingProvider,
    private userService: UserProvider,
    private singletonCache: SingletonCacheProvider) {
    }

  ionViewDidLoad(){
    this.singletonCache.getLoginToken()
    .then(val => {
      this.token = val.toString();
    });

    this.singletonCache.getUser()
    .then(usr => {
      this.userName = usr["userName"];
      this.branchOffice = usr["branchOfficeId"]["officeName"];
    });
  }

  ionViewWillEnter(){
  }

  find_in_object(my_object, my_criteria){
    return my_object.filter(function(obj) {
      return Object.keys(my_criteria).every(function(c) {
        return obj[c] == my_criteria[c];
      });
    });
  }

}
