import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  token: string;
  userName: string;
  branchOffice: string;
  branchOfficeId: string;
  zones: any = [];

  constructor(public navCtrl: NavController,
    private parkingService: ParkingProvider,
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
      this.branchOfficeId = usr["branchOfficeId"]["_id"];
    });
  }

  ionViewWillEnter(){
    this.parkingService.getHomeInfo(this.token, this.branchOfficeId)
    .then(resul => {
      this.zones = resul;
    });
  }

  find_in_object(my_object, my_criteria){
    return my_object.filter(function(obj) {
      return Object.keys(my_criteria).every(function(c) {
        return obj[c] == my_criteria[c];
      });
    });
  }

}
