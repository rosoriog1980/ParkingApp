import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vehicle-list',
  templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent {
  @Input('listOfVehicles') vehicles;
  @Output() carSelected = new EventEmitter();

  constructor() {

  }

  selectVehicle(vehicle){
    this.carSelected.emit(vehicle);
  }

}
