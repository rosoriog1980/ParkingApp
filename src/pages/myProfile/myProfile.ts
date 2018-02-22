import { Component, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html',
})
export class MyProfilePage {  

  constructor(
    public navCtrl: NavController,   
    public navParams: NavParams) {
  } 

}
