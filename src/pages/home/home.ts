import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  parkingLots: any;
  availableLots: any;
  availableLotsQuantity: string;

  constructor(public navCtrl: NavController,
    private parkingService: ParkingProvider) {}


  getAvailableParkingLots(){
    this.parkingService.getParkingLots().then(data =>{
      this.parkingLots = data}
    )

    this.availableLots = JSON.parse(this.parkingLots).filter(function (entry) {
      return entry.parkingStatus === 'AVAILABLE';
    });

    this.availableLotsQuantity = this.availableLots.length();
  }


  ionViewWillEnter(){
    //this.getAvailableParkingLots();
  }

}
