import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SingletonCacheProvider } from '../../providers/singleton-cache/singleton-cache';
import { SharedParamsProvider } from '../../providers/shared-params/shared-params';
import { LoginPage } from '../login/login';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

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
    private alertCtrl: AlertController) {

      this.user = {
        userName: "",
        userTelNumber: "",
        branchOffice: "",
        branchOfficeId: "",
        vehicles: []
      };

      //this.branchOffices = config.branchOffices;
    }

    modifyUser(){
      this.user.vehicles = this.vehicles;
      this.userService.updateUser(this.user, this.token)
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
      });
      this.setInitialState();
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
            return o._id === this.user.branchOfficeId;
          })["officeName"];
        }
      });
    }
}
