import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';


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
    private singletonCache: SingletonCacheProvider,
    private menu: MenuController) {
      menu.enable(false);
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
        this.singletonCache.setLoginToken(token)
        .then(val => {
          this.setCacheUser(val);
        });
      }
    })
    .catch(err => {
      this.PresentAlert('Hubo un error, intentelo nuevamente.');
    })
  }

  ionViewWillEnter(){
    this.singletonCache.getLoginToken()
    .then(val => {
      if (val != undefined) {
        this.userService.validateLogin(val)
        .then(resul => {
          if (resul["result"]) {
            this.singletonCache.setLoginToken(resul["newId"])
            .then(val =>{
              this.setCacheUser(val);
            });
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

  setCacheUser(token){
    this.userService.getUser(token)
    .then(user => {
      this.singletonCache.setUser(user[0])
      .then(val => {
        this.navCtrl.setRoot(HomePage);
      });
    });
  }
}
