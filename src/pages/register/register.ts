import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  newUser: any = {};
  branchOffices: any[];
  vehicles: any[] = [];
  brands: String[];
  colors: String[];
  selectedBrand: String;
  selectedColor: String;
  licencePlate: String = null;
  addCarVisible: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService : UserProvider,
    @Inject(APP_CONFIG) private config: AppConfig,
    private alertCtrl: AlertController) {
    this.branchOffices = config.branchOffices;
  }

  ionViewWillEnter(){
    this.newUser = {
      userName: "",
      userEmail: "",
      userTelNumber: "",
      branchOffice: ""
    }

    this.brands = ['Nissan', 'Toyota', 'Chevrolet'];

    this.colors = ['Blanco', 'Negro', 'Rojo', 'Gris'];
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

  addVehiccle(){
    if (this.selectedBrand != "" && this.selectedColor != "" && this.licencePlate != undefined) {
      this.vehicles.push({
        vehicleLicensePlate: this.licencePlate.toUpperCase(),
        vehicleBrand: this.selectedBrand,
        vehicleColor: this.selectedColor
      });
      this.cleanVehicleFields();
    } else {
      this.PresentAlert("Hay campos obligatorios sin diligenciar!");
    }
  }

  cancelAddVehicle(){
    this.cleanVehicleFields();
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

  cleanVehicleFields(){
    this.licencePlate = "";
    this.selectedBrand = "";
    this.selectedColor = "";
  }

  cancel(){
    this.navCtrl.pop();
  }
}
