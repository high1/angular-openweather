// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: '47efc2bd7074b85a1f972e428ca35469',
  apiUrl: 'https://api.openweathermap.org/data/2.5',
  apiInterval: 5 * 60 * 1000, // in minutes
  cities: [
      // Amsterdam
      2759794,
      // London
      2643743,
      // Helsinki
      658225,
      // // 'Novi Sad'
      // 3194360,
      // Sombor
      // 3190342,
      // Madrid
      3117735,
      // Moscow
      524901
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
