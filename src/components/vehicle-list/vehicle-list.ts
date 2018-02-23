import { Component, Input } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'vehicle-list',
  templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent {
  @Input('listOfVehicles') vehicles;

  constructor(
    private userService: UserProvider) {

  }

}
