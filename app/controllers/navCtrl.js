"use strict";

app.controller('NavCtrl', function (DataFactory, $rootScope, $scope) {

    console.log("root scope in nav", $rootScope);

        DataFactory.getTitle()
        .then( (instructions) => {
          console.log("instructions in nav", instructions.data);
        });


});
