import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
<<<<<<< HEAD
import { MyProfilePage } from '../pages/myProfile/myProfile';

import { CarCardComponent } from '../components/car-card/car-card';
=======
import { LoginPage } from '../pages/login/login';
>>>>>>> Develop

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { APP_CONFIG, CONF_SETTINGS } from './app.config'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
<<<<<<< HEAD
    MyProfilePage
=======
    LoginPage
>>>>>>> Develop
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
<<<<<<< HEAD
    MyProfilePage,
    CarCardComponent
=======
    LoginPage
>>>>>>> Develop
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_CONFIG, useValue: CONF_SETTINGS},
    UserProvider
  ]
})
export class AppModule {}
