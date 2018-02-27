import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkingProvider } from '../../providers/parking/parking';
import { UserProvider } from '../../providers/user/user';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  parkingLots: any;
  availableLots: any;
  availableLotsQuantity: string;
  token: string;
  parkingMessage = "";
  userName: string;


  constructor(public navCtrl: NavController,
    private parkingService: ParkingProvider,
    private userService: UserProvider,
    private singletonCache: SingletonCacheProvider) {
    }
    
  ionViewDidLoad(){
    this.singletonCache.getLoginToken()
    .then(val => {
      this.token = val.toString();
    });
    
    this.singletonCache.getUser()
    .then(usr => {
      var user = usr[0];
      this.userName = user.userName;
    });
  }

  getAvailableParkingLots(){
    this.parkingService.getParkingLots(this.token).then(data =>{
      this.parkingLots = data;

      this.availableLots = this.find_in_object(this.parkingLots, {parkingStatus: 'AVAILABLE'});

      
      var floors = [];

      for(var lot in this.availableLots){
        var floorNumber = this.availableLots[lot]["floorNumber"];
        if(floors.find(function (obj) {return obj == floorNumber}) == undefined){
          floors.push(floorNumber)
        }
      }

      for(var floor in floors){
        var availableLotsInFloor = this.availableLots.filter(function( obj ) {
          return obj.floorNumber == floors[floor];
        });

        if(availableLotsInFloor.length == 1)
          this.parkingMessage = this.parkingMessage.concat(", hay " + availableLotsInFloor.length + " parqueo disponible en el sotano " + floors[floor]);
          
        if(availableLotsInFloor.length > 1)
        this.parkingMessage = this.parkingMessage.concat(", hay " + availableLotsInFloor.length + " parqueos disponibles en el sotano " + floors[floor]);
      }
    })
  }


  ionViewWillEnter(){
    this.getAvailableParkingLots();
  }

  find_in_object(my_object, my_criteria){
    return my_object.filter(function(obj) {
      return Object.keys(my_criteria).every(function(c) {
        return obj[c] == my_criteria[c];
      });
    });  
  }

}
