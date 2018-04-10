import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';
import { ModalPage } from '../modal/modal';
import { HomePage } from '../home/home';
import { ConfirmationPage } from '../confirmation/confirmation';

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
    private singletonCache: SingletonCacheProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
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

  showModal(cell, parking){
    if (cell["_id"].toString() === this.zone["myCell"]) {
      if (cell["_id"].toString() === this.zone["myCell"]) {
        const alert = this.alertCtrl.create({
          title: 'Liberar celda de parqueo.',
          message: 'Esta seguro de liberar la celda de parqueo en este momento?',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.releaseParking(cell);
              }
            },
            {
              text: 'Cancelar'
            }
          ]
        });
        alert.present();
      }
    } else {
      if (!(cell["parkingStatus"] === 'AVAILABLE' && this.zone["myCell"] !== undefined)) {
        const modalData = {
          cell: cell,
          parking: parking,
          user: this.user,
          token: this.token
        };
        const modal = this.modalCtrl.create(ModalPage,{data: modalData});
        modal.onDidDismiss(data => {
          if (data === 'updte') {
            this.navCtrl.setRoot(ConfirmationPage);
          }
        });
        modal.present();
      }
    }
  }

  releaseParking(cell){
    this.parkingService.changeParkingStatus(this.token, 'AVAILABLE', this.user["_id"], cell["_id"])
    .then(res => {
      this.singletonCache.setMyLocation(null)
      .then(res => {
        this.navCtrl.setRoot(HomePage);
      });
    });
  }
}
