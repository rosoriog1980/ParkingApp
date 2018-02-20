import { Component } from '@angular/core';

/**
 * Generated class for the CarCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'car-card',
  templateUrl: 'car-card.html'
})
export class CarCardComponent {

  marca: string;
  color: string;
  modelo: string;

  constructor() {
    console.log('Hello CarCardComponent Component');
    this.marca = 'Seat';
    this.color = 'Rojo';
    this.modelo = '2015';
  }

}
