"use strict";

const app = angular.module('GitApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/testingcode.html',
        controller: 'TestingCtrl'
    }).
    otherwise('/');

    //NEED TO ADD TASK URL
});
