"use strict";

app.controller('SplashCtrl', function ($scope, DataFactory) {

  // $scope.currentPage

    $scope.getAllInstructions = function () {
        DataFactory.getAllInstructions()
        .then( (instructions) => {
          $scope.instructions = instructions;
          console.log("Get All Instructions", instructions);
        });
    };

    $scope.getAllInstructions();

});
