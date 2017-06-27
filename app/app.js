"use strict";

const app = angular.module('GitApp', ["ngRoute", "ui.materialize", "angular-terminal"]);

// .run(function ($rootScope) {
//                 $rootScope.$on('terminal.main', function (e, input, terminal) {
//                     $rootScope.$emit('terminal.main.echo', 'input received: ' + input);
//                 });
//             });

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
