import { InjectionToken } from '@angular/core';

export interface AppConfig {
  backEndApiEndPoint: String;
}

export const BACKEND_CONF: AppConfig = {
  //backEndApiEndPoint : 'https://parking-back-end.herokuapp.com'
  backEndApiEndPoint : 'http://localhost:3000'
};


export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
