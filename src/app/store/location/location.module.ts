import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from './location.effects';

import { key as LocationKey, reducer as LocationReducer } from './location.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(LocationKey, LocationReducer),
    EffectsModule.forFeature([LocationEffects])
  ]
})
export class LocationModule { }
