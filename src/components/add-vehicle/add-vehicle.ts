import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-vehicle',
  templateUrl: 'add-vehicle.html'
})
export class AddVehicleComponent {
  @Input('addCarVisible') addCarVisible;
  @Output() carAdded = new EventEmitter();
  @Output() failedValidation = new EventEmitter();

  brands: String[];
  colors: String[];
  selectedBrand: String;
  selectedColor: String;
  licencePlate: String = null;

  constructor() {

    this.brands = ['Nissan', 'Toyota', 'Chevrolet'];

    this.colors = ['Blanco', 'Negro', 'Rojo', 'Gris'];
  }

  cancelAddVehicle(){
    this.cleanVehicleFields();
  }

  newVehicle(){
    if (this.selectedBrand != "" && this.selectedColor != "" && this.licencePlate != undefined) {
      const vehicle = {
        vehicleLicensePlate: this.licencePlate.toUpperCase(),
        vehicleBrand: this.selectedBrand,
        vehicleColor: this.selectedColor
      };
      this.carAdded.emit(vehicle);

      this.cleanVehicleFields();
    } else {
      this.failedValidation.emit("Hay campos obligatorios sin diligenciar!");
    }
  }

  cleanVehicleFields(){
    this.licencePlate = "";
    this.selectedBrand = "";
    this.selectedColor = "";
  }

}
