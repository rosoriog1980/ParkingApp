import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent {

  vehicles: any[] = [];

  constructor(
    private userService: UserProvider) {   
      this.userService.getUser().then(data =>{
        this.vehicles = data[0]["vehicles"];
      })
  }
}
