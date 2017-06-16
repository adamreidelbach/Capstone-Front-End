"use strict";

const app = angular.module('GitApp', ["ngRoute"]);

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

    //NEED TO ADD TASK URL
});
