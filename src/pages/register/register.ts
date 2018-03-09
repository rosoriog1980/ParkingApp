import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { SharedParamsProvider } from '../../providers/shared-params/shared-params';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  newUser: any = {};
  branchOffices: any;
  vehicles: any[] = [];
  addCarVisible: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserProvider,
    public paramService: SharedParamsProvider,
    private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.newUser = {
      userName: "",
      userEmail: "",
      userTelNumber: "",
      branchOfficeId: ""
    };

    this.paramService.getBranchOffices()
    .then(data => {
      this.branchOffices = data;
    });
  }

  registerNewUser(){
    if (this.newUser.userName != "" && this.newUser.userEmail != "" && this.newUser.branchOffice != "Seleccione..."
    && this.newUser.branchOffice != "") {
      if (this.vehicles != undefined && this.vehicles.length > 0) {
        this.userService.registerNewUser({user: this.newUser, vehicles: this.vehicles})
        .then(data => {
          this.PresentAlert('Registro Exitoso!.');
          this.navCtrl.pop();
        })
        .catch(err => {
          this.PresentAlert("Hubo un error, intentelo nuevamente.");
        });
      } else{
        this.PresentAlert("Debe agregar por lo menos 1 vehiculo.");
      }
    } else{
      this.PresentAlert("Hay campos obligatorios sin diligenciar!");
    }
  }

  addVehiccle(vehicle){
      this.vehicles.push(vehicle);
      this.addCarVisible = false;
  }

  PresentAlert(message){
    let alert = this.alertCtrl.create({
      title: 'Información',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  cancel(){
    this.navCtrl.pop();
  }
}
