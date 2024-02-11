# INFO

On the 'main' branch you will find an example of using @ngrx/store library for state management. Here is the classic way of doing things without signals. Application is modular and the state management is applied on the 'Movie' entity under the 'Movie' module.

There also is the branch 'signal-store' in which I implemented an example of how @ngrx/signal library makes everything more concise and gets the reactivity to a whole another level. This application version uses standalone components. In this branch I used the new control-flow of version 17.

# Movies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
