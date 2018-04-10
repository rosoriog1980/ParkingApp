import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  data: any;
  vehicles: any = [];
  selectedVehicle: any;
  parkingScreenMode: Boolean = true;
  searchedUser: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private parkingService: ParkingProvider,
    private userService: UserProvider,
    private singletonCache: SingletonCacheProvider) {
      this.data = navParams.get('data');
      this.vehicles = this.data["user"]["vehicles"];
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  selectVehicle(vehicle){
    this.selectedVehicle = vehicle;
  }

  updateParkingStatus(){
    const status = this.data["cell"]["parkingStatus"] === 'AVAILABLE' ? 'NOT_AVAILABLE' : 'AVAILABLE';
    this.parkingService.changeParkingStatus(this.data["token"],status,this.data["user"]["_id"],this.data["cell"]["_id"])
    .then(res => {
      const myLocationData = {
        parkingZoneName: this.data["parking"]["parkingZone"]["zoneName"],
        parkingZoneId: this.data["parking"]["parkingZone"]["parkingZoneId"],
        officeName: this.data.user["branchOfficeId"]["officeName"]
      };
      this.singletonCache.setMyLocation(myLocationData)
      .then(val => {
        this.navCtrl.setRoot(HomePage);
      });
    });
  }

  ionViewWillEnter(){
    this.searchedUser = {
      userName: '',
      userTelNumber: '',
      vehicles: []
    }

    if (this.data["cell"]["parkingStatus"] === 'NOT_AVAILABLE') {
      this.parkingScreenMode = false;
      this.userService.searchUser(this.data["token"], this.data["cell"]["userId"])
      .then(usr => {
        this.searchedUser.userName = usr[0]["userName"];
        this.searchedUser.userTelNumber = usr[0]["userTelNumber"];
        this.searchedUser.vehicles = usr[0]["vehicles"];
      });
    }
  }

}
