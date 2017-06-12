"use strict";

const app = angular.module('TerminalApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/square-exercise.html',
        controller: 'SquareCtrl'
    }).
    otherwise('/');

    //NEED TO ADD TASK URL
});
