import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  data: any;
  vehicles: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.data = navParams.get('data');
      this.vehicles = this.data["user"]["vehicles"];
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
