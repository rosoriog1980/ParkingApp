import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { MyProfilePage } from '../pages/myProfile/myProfile';
import { LoginPage } from '../pages/login/login';

import { VehicleListComponent } from '../components/vehicle-list/vehicle-list'
import { AddVehicleComponent } from "../components/add-vehicle/add-vehicle";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { APP_CONFIG, CONF_SETTINGS } from './app.config'
import { ParkingProvider } from '../providers/parking/parking';
import { SingletonCacheProvider } from '../providers/singleton-cache/singleton-cache';
import { SharedParamsProvider } from '../providers/shared-params/shared-params';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    MyProfilePage,
    LoginPage,
    VehicleListComponent,
    AddVehicleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    MyProfilePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_CONFIG, useValue: CONF_SETTINGS},
    UserProvider,
    ParkingProvider,
    SingletonCacheProvider,
    SharedParamsProvider
  ]
})
export class AppModule {}
