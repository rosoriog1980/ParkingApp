import { Component, Input } from '@angular/core';

@Component({
  selector: 'vehicle-list',
  templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent {
  @Input('listOfVehicles') vehicles;

  constructor() {

  }

}
