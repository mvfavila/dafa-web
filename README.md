# DafaWeb

Front end part of the Dafa solution. Generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Debugging

Place the breakpoints, run `ng serve` for a dev server and press F5 to launch the debug environment. Navigate to `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Preparing for Deployment

Install Firebase CLI, set-up an account and create a new project using the Firebase console.<br/>
After that, execute the following command in cmd:

> ...\Dafa\dafa-web>firebase init

You're about to initialize a Firebase project in this directory:

> ...\Dafa\dafa-web

Before we get started, keep in mind:

- You are currently outside your home directory

? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.

> Hosting: Configure and deploy Firebase Hosting sites

=== Project Setup

? Select a default Firebase project for this directory: dafa-web (dafa-web)
i Using project dafa-web (dafa-web)

=== Hosting Setup

? What do you want to use as your public directory? dist/dafa-web
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File dist/dafa-web/index.html already exists. Overwrite? No

- Firebase initialization complete!

# Deploying

In cmd:

Dafa\dafa-web>npm run deploy

=== Deploying to 'dafa-web'...

- Deploy complete!

Project Console: https://console.firebase.google.com/project/...
Hosting URL: https://<project-name>.firebaseapp.com
