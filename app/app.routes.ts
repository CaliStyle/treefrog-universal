import { ReflectiveInjector, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { defaultRoutes } from './routes.default';
import * as _ from 'lodash';

// Won't read this from custom-typings (no idea why)
declare var ENV: string;
declare var HMR: boolean;
declare var System: SystemJS;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}
// Temporary placeholder ^

let appRoutes: Routes = [].concat(defaultRoutes)

export const appRoutingProviders: any[] = [

];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
