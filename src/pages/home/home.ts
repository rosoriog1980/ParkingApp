import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
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
  userId: string;
  branchOffice: string;
  branchOfficeId: string;
  zones: any = [];
  myLocation: any;

  constructor(public navCtrl: NavController,
    private parkingService: ParkingProvider,
    private singletonCache: SingletonCacheProvider,
    private menu: MenuController) {
      menu.enable(true);
    }

  ionViewDidLoad(){
    this.singletonCache.getLoginToken()
    .then(val => {
      this.token = val.toString();
    });

    this.singletonCache.getUser()
    .then(usr => {
      this.userName = usr["userName"];
      this.userId = usr["_id"];
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
    zone.officeName = this.branchOffice;
    this.navCtrl.push(ParkingDetailPage, {
      zone: zone
    });
  }

  releaseParking(){
    this.parkingService.changeParkingStatus(this.token, 'AVAILABLE', this.userId, this.myLocation["cell"]["_id"])
    .then(res => {
      this.singletonCache.setMyLocation(null)
      .then(res => {
        this.navCtrl.setRoot(HomePage);
      });
    });
  }

  viewParking(){
    const zone = {
      _id: this.myLocation.parkingZoneId,
      zoneName: this.myLocation.parkingZoneName,
      myCell: this.myLocation["cell"]["_id"]
    };
    this.clickDetails(zone);
  }
}
