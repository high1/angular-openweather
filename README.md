# Application Structure

The application structure tries to follow the **fractal** guidelines, where functionality is grouped primarily by feature rather than file type, while adhering to the angular defaults as much as possible at the same time.

```
└── src                 # Application source code
 	├── app  		    # Default angular setup
	│	├── components  # This folder contains all the components and their unit tests, components are bare presentation layers
 	│   ├── services    # All the generated services should be placed here, along with their tests - i.e. services that call external APIs, or route guards
 	│	└── store       # This folder represents the reactive state of the application, containing the reactive state, actions, effects and reducers
	...
```

# Setup

Run `npm i` || `npm install` in the root directory

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component components/component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). For code coverage, run `ng test --code-coverage`. On CI/CD, tests are run using `npm run test:headless`. Unit tests are alos a condition for a sucessfull CI/CD pipeline.

# Linting

Run `ng lint` to lint he application code. Default TS unit linting Angular setup is used. This is also a condition for CI/CD build to pass.

# Architecture

This applications uses [NGRX](https://ngrx.io/) to achieve clean separation between presentational and functional layers. Heavily inspired by redux, this library reduces 
components to pure presentational layer, containg no bussiness logic and side effects.

# What was done as the part of the process

- created new project with Angular CLI
- set up the development environment
- created a [GitHub](https://github.com/) repo that contains the source code of the application [Repo URL](https://github.com/high1/angular-openweather)
- created an API key on [OpenWeather](https://openweathermap.org/)
- call the appropriate API urls to get current weather and the forecast for five european cities (configurable by cities array in environment.ts)
- created WeatherService for API calls
- installed @ngrx/store and @ngrx/effects
- created actions, reducers and effects that will handle all the side effects of calling the external API and updating the state when the response or error is received
- installed [Bootstrap](https://getbootstrap.com/) and [Font Awesome](https://fontawesome.com/)
- created components which contain only presentation logic, CurrentWeather and Forecast for the presentation of the weather
- created ForecastGuardService, which does not allow route activation if the current state does not contain the appropriate ID in the forecast state
- created reusable app-loader component to show that the component is loading the data
- added an apiInterval as a configurable option, the application uses this to avoid constantly calling the API, instead calling the API on the preconfigured 5 minutes interval
- since the state already contains the data, the applciation just displays it on revisits of the components during the API call pause interval
- added a reusable error component which is displayed in the case of an error, and has the link which just calls again the same call that failed before, but forcing refetch this time
- covered application with unit tests
- created an application hosting repo on [Firebase](https://firebase.google.com/)
- created a Github action that will automatically run lint and tests and in case that everything is fine, deploys the application to Firebase hosting - [App URL](https://angular-openweather.web.app/), creating basic but functional CI/CD
- there is also a working POC [Azure](https://dev.azure.com) CI/CD [Azure CI/CD](https://dev.azure.com/rsimic/angular-openweather)
- updated the default README.md in a hurry

