import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WeatherEffects } from './weather.effects';
import { key as WeatherKey, reducer as WeatherReducer } from './weather.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(WeatherKey, WeatherReducer),
    EffectsModule.forFeature([ WeatherEffects ])
  ]
})
export class WeatherModule { }
