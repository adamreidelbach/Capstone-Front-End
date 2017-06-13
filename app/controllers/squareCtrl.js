"use strict";

app.controller('SquareCtrl', function(DataFactory, $scope) {

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

    $scope.getInstructions = function () {
        // get the task list
        DataFactory.getInstructions()
        .then( (instructions) => {
          $scope.instructions = instructions;
          console.log("instructions", $scope.instructions);
        });
    };

    $scope.getInstructions();

    //regular expression

});
