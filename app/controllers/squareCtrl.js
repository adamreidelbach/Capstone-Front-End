"use strict";

app.controller('SquareCtrl', function(DataFactory/*$scope, DataFactory, $location*/) {

    $("#userSubmit").click(function () {
        if ($("#userText").val() === "git init") {
            $("#box1").addClass("highlight");
        console.log("test");
        }
        if ($("#userText").val() === "git checkout -b myBranch") {
            $("#box4").addClass("highlight");
            console.log("git checkout -b myBranch");
            $("#error").hide();
        }
        if ($("#userText").val() === "git push origin") {
            $("#box3").addClass("highlight");
        console.log("git push origin");
        }
        if ($("#userText").val() === "git pull master") {
            $("#box2").addClass("highlight");
        console.log("git pull master");
        }
        // else {
        //     $("#error").show();
        //     $("#error").html("Oops, try again");
        //     console.log("error");
        // }
    });

    DataFactory.getInstructions();

    //regular expression

});


// app.controller('AddTaskCtrl', function($scope, DataFactory, $location) {

//   $scope.newTask = {
//     isCompleted: false
//   };

//   $scope.submitTask = function () {
//     // stuff goes here
//     console.log("$scope.task", $scope.task);
//     DataFactory.addTask($scope.task)
//     .then( (data) => {
//         $location.path("/");
//     });
//   };

// });
