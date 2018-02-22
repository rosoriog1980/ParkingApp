import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: String;
  pwd: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserProvider,
    private alertCtrl: AlertController,
  private storage: Storage) {
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    this.userService.login({user: this.user, pwd: this.pwd})
    .then(data => {
      const token: String = data["_body"];
      if (token === "") {
        this.PresentAlert('Usuario o contraseña incorrectos!.');
      }else{
        this.storage.set('loginToken', token);
        this.navCtrl.setRoot(HomePage);
      }
    })
    .catch(err => {
      this.PresentAlert('Hubo un error, intentelo nuevamente.');
    })
  }

  ionViewWillEnter(){
    this.storage.get('loginToken')
    .then(val => {
      if (val != undefined) {
        this.userService.validateLogin(val)
        .then(resul => {
          if (resul["result"]) {
            this.storage.set('loginToken', resul["newId"]);
            this.navCtrl.setRoot(HomePage);
          }
        })
      }
    });
  }

  PresentAlert(message){
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
