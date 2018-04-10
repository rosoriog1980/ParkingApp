import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})

export class ConfirmationPage {

  myLocationData : any = {officeName: '', 
                          parkingZoneName: '',
                          cell: {
                            parkingNumber: ''
                          } };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private singletonCache: SingletonCacheProvider) {
  }

  ionViewWillEnter(){
    this.getMyLocation();
  }

  getMyLocation(){
    this.singletonCache.getMyLocation().then(val => {
        this.myLocationData = val;
    });
  }

  confirm(){    
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
  }

}
