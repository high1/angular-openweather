import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastGuardService } from './services/forecast.guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'weather', component: CurrentWeatherComponent },
  { path: 'forecast/:id', component: ForecastComponent, canActivate: [ForecastGuardService] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
