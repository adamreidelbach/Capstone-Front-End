"use strict";

const app = angular.module('GitApp', ["ngRoute", "ui.materialize"]);

app.config(function($routeProvider) {
    $routeProvider.
    when(`/`, {
        templateUrl: 'partials/splash.html',
        controller: 'SplashCtrl'
    }).
    when('/exercises/:id', {
        templateUrl: 'partials/exercises.html',
        controller: 'ExerciseCtrl'
    }).
    otherwise('/');

});
