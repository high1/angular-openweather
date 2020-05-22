import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ForecastEffects } from './forecast.effects';
import { key as ForecastKey, reducer as ForecastReducer } from './forecast.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(ForecastKey, ForecastReducer),
    EffectsModule.forFeature([ ForecastEffects ])
  ]
})
export class ForecastModule { }

