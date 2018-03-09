import { InjectionToken } from '@angular/core';

export interface AppConfig {
  backEndApiEndPoint: String;
  branchOffices: String[];
}

export const CONF_SETTINGS: AppConfig = {
  //backEndApiEndPoint : 'https://parking-back-end.herokuapp.com',
  backEndApiEndPoint : 'http://localhost:3000',
  branchOffices: ['Calle 100 (BOG)', 'Capricentro Piso 1 (MDE)', 'Capricentro Piso 2 (MDE)', 'Capricentro Piso 3 (MDE)', 'Capricentro Piso 4 (MDE)',
                    'Poblado (MDE)']
};


export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
