// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';

// import { setCity } from './location.actions';
// import { loadWeather, weatherLoaded, weatherError } from '../weather/weather.actions';
// import { WeatherService } from '../../services/weather.service';

// @Injectable()
// export class LocationEffects {

//   loadWeather$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(setCity),
//       mergeMap(() => this.weatherService.getCurrentWeather()
//         .pipe(
//           map(weather => {
//             console.warn(weather);
//             return weatherLoaded(weather);
//           }),
//           catchError(error => {
//             console.warn(error);
//             return of(weatherError(error));
//           })
//         )
//       )
//     )
//   );

// mergeMap(([_, fetchTime]) => {
      //   if (fetchTime && Date.now() - fetchTime <= 30 * 60 * 1000) {
      //         console.log('noOp, baby');
      //         return of(noOp());
      //   }
      //   this.store.dispatch(loadingWeather());
      //   return this.weatherService.getCurrentWeather()
      //   .pipe(
      //     map(({ list }: WeatherResponse) => weatherLoaded({
      //         list: list.map(item => ({
      //           ...item,
      //           main: {
      //             ...item.main,
      //              temp_avg: (item.main.temp_max + item.main.temp_min) / 2 - 273.15,
      //           },
      //          }))
      //       })),
      //     catchError(error => of(weatherError(error))
      //     )
      //   );
      // })

//   constructor(
//     private actions$: Actions,
//     private weatherService: WeatherService
//   ) {}
// }
