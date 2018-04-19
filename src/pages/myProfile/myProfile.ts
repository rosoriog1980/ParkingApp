import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';
import { SharedParamsProvider } from '../../providers/shared-params/shared-params';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html',
})
export class MyProfilePage {
  vehicles: any[] = [];
  branchOffices: any;
  user: any;
  token: String;
  editMode: boolean = false;
  addCarVisible: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserProvider,
    private singletonCache: SingletonCacheProvider,
    public paramService: SharedParamsProvider,
    private alertCtrl: AlertController,
    private menu: MenuController) {
      menu.enable(true);

      this.user = {
        userName: "",
        userTelNumber: "",
        branchOffice: "",
        branchOfficeId: "",
        vehicles: []
      };
    }

    modifyUser(){
      this.user.vehicles = this.vehicles;
      const userUpd = {
        _id: this.user._id,
        userTelNumber: this.user.userTelNumber,
        branchOfficeId: this.user.branchOfficeId,
        vehicles: this.user.vehicles
      };

      this.userService.updateUser(userUpd, this.token)
      .then(val => {
        this.editMode = false;
        this.singletonCache.setUser(this.user)
        .then(resul => {
          this.setInitialState();
          this.PresentAlert("Usuario modificado!.");
        });
      });
    }

    logout(){
      this.singletonCache.removeLoginToken()
      .then(val => {
        this.navCtrl.setRoot(LoginPage);
      });
    }

    editClick(){
      if (this.editMode) {
        this.setInitialState();
      }
      this.editMode = !this.editMode;
    }

    ionViewWillEnter(){
      this.paramService.getBranchOffices()
      .then(data => {
        this.branchOffices = data;
        this.setInitialState();
      });
    }

    addVehiccle(vehicle){
      this.vehicles.push(vehicle);
      this.addCarVisible = false;
    }

    ionViewDidLoad(){
      this.singletonCache.getLoginToken()
      .then(val => {
        this.token = val.toString();
      });
    }

    PresentAlert(message){
      let alert = this.alertCtrl.create({
        title: 'Información',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

    setInitialState(){
      this.singletonCache.getUser()
      .then(usr => {
        this.user = Object.create(usr);
        this.vehicles = Object.assign([], this.user.vehicles);
        if (this.branchOffices !== undefined) {
          this.user.branchOffice = this.branchOffices.find(o => {
            return o._id === this.user.branchOfficeId["_id"];
          })["officeName"];
        }
      });
    }
}
