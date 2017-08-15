"use strict";

app.controller('SplashCtrl', function ($scope, DataFactory) {

    $scope.getAllInstructions = function () {
        DataFactory.getAllInstructions()
        .then( (instructions) => {
          $scope.instructions = instructions;
        });
    };

    $scope.getAllInstructions();

});
