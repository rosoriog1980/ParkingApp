import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  newUser: any = {};
  branchOffices: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService : UserProvider) {

  }

  ionViewWillEnter(){
    this.newUser = {
      userName: "",
      userEmail: "",
      userTelNumber: "",
      branchOffice: "",
      userImage: "",
      vehicles: []
    }
  }
}
