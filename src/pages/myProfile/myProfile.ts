import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html',
})
export class MyProfilePage {
  vehicles: any[] = [];
  user: any;
  token: String;
  editMode: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserProvider,
    private singletonCache: SingletonCacheProvider) {

      this.user = {
        userName: "",
        userTelNumber: "",
        branchOffice: "",
        vehicles: []
      };
    }

    logout(){
      this.singletonCache.removeLoginToken()
      .then(val => {
        this.navCtrl.setRoot(LoginPage);
      });
    }

    ionViewWillEnter(){
      this.singletonCache.getUser()
      .then(usr => {
        this.user = usr[0];
        this.vehicles = this.user.vehicles;
      });

    }

    ionViewDidLoad(){
      this.singletonCache.getLoginToken()
      .then(val => {
        this.token = val.toString();
      });

    }
}
