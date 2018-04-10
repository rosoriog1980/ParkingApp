import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';
import { ParkingDetailPage } from '../parking-detail/parking-detail';

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
  myLocation: any;

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
    this.singletonCache.getMyLocation()
    .then(val => {
      if (val !== undefined && val !== null) {
        this.myLocation = val;
      } else {
        this.myLocation = undefined;
        this.parkingService.getHomeInfo(this.token, this.branchOfficeId)
        .then(resul => {
          this.zones = resul;
        });
      }
    });
  }

  clickDetails(zone){
    this.navCtrl.push(ParkingDetailPage, {
      zone: zone
    });
  }
}
