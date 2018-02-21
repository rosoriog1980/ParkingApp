import { Component } from '@angular/core';

@Component({
  selector: 'vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent {

  vehicles = []

  constructor() {
    this.vehicles = [{
      vehicleBrand : 'Mazda',
      vehicleColor : 'Azul',
      vehicleLicensePlate : 'AAA000'
     },
     {
      vehicleBrand : 'Nissan',
      vehicleColor : 'Negro',
      vehicleLicensePlate : 'BBB000'
     }
    ]
  }

}
