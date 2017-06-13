"use strict";

const app = angular.module('GitApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/square-exercise.html',
        controller: 'SquareCtrl'
    }).
    otherwise('/');

    //NEED TO ADD TASK URL
});
