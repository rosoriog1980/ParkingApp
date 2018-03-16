import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';

@Component({
  selector: 'page-parking-detail',
  templateUrl: 'parking-detail.html',
})
export class ParkingDetailPage {
  zone: any;
  token: string;
  user: any;
  parkings: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private parkingService: ParkingProvider,
    private singletonCache: SingletonCacheProvider) {
      this.zone = this.navParams.get('zone');
  }

  ionViewDidLoad() {
    this.singletonCache.getLoginToken()
    .then(val => {
      this.token = val.toString();
    });

    this.singletonCache.getUser()
    .then(usr => {
      this.user = usr;
    });
  }

  ionViewWillEnter(){
    this.parkingService.getParkingLots(this.token, this.zone["_id"])
    .then(resul => {
      this.parkings = resul;
    });
  }

}
