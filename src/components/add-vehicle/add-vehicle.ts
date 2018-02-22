import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddVehicleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-vehicle',
  templateUrl: 'add-vehicle.html'
})
export class AddVehicleComponent {

  branchOffices: any[];
  vehicles: any[] = [];
  brands: String[];
  colors: String[];
  selectedBrand: String;
  selectedColor: String;
  licencePlate: String = null;
  addCarVisible: boolean = false;

  constructor(
    private alertCtrl: AlertController
  ) {
    
    this.brands = ['Nissan', 'Toyota', 'Chevrolet'];

    this.colors = ['Blanco', 'Negro', 'Rojo', 'Gris'];
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

}
