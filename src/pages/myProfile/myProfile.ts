import { Component, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html',
})
export class MyProfilePage {
  vehicles: any[] = [];
  user: any;
  token: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserProvider,
    private storage: Storage) {
      this.storage.get('loginToken')
      .then(val => {
        this.token = val;
      });

      this.user = {
        userName: "",
        userTelNumber: "",
        vehicles: []
      };
    }

    ionViewWillEnter(){
      this.userService.getUser(this.token)
      .then(data =>{
        this.user.userName = data[0]["userName"];
        this.user.userTelNumber = data[0]["userTelNumber"];
        this.user.vehicles = data[0]["vehicles"];
        this.vehicles = this.user.vehicles;
      });
    }

}
