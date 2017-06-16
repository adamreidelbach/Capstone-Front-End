"use strict";

app.controller('ExerciseCtrl', function(DataFactory, $scope, $routeParams, StepFactory, $rootScope) {

    $("#userSubmit").click(function () {
        if ($("#userText").val() === "git init") {
            $("#box1").addClass("highlight");
            $("#test5").prop("checked", true);
        }
        if ($("#userText").val() === "git checkout -b myBranch") {
            $("#box4").addClass("highlight");
            $("#test5").prop("checked", true);
            $("#error").hide();
        }
        if ($("#userText").val() === "git checkout -b JohnStyling") {
            $("#box4").addClass("highlight");
            $("#terminalText").append("terminal text");
            $(".part2").removeClass("hide");
            $("#test5").prop("checked", true);
        }
        if ($("#userText").val() === "git push origin") {
            $("#box3").addClass("highlight");
            console.log("git push origin");
        }
        if ($("#userText").val() === "git pull master") {
            $("#box2").addClass("highlight");
            console.log("git pull master");
        }
        if ($("#userText").val() === "git add . git commit -m") {
            $("#test5").prop("checked", true);
        }
    });

    console.log("route params", $routeParams.id);

    let getTutorial = (whichOne) => {
        console.log("route", $routeParams.id);
        DataFactory.getTutorial(whichOne)
        .then( (instructions) => {
          $scope.instructions = instructions;
          console.log("Got the tutorial", instructions);
          $scope.getStep(0, $scope.instructions);
          StepFactory.setStepsNum(instructions.steps.length);
          console.log("steps", instructions.steps.length);
          $rootScope.steps = instructions.steps.length;
          return instructions;
        });
    };

    getTutorial($routeParams.id);

    $scope.stepCounter = StepFactory.pageNum;

    $scope.getStep = (index, obj) => {
        $scope.currentStep = obj.steps[index];
        $rootScope.page = index;
    };

    $scope.nextStep = () => {
        $scope.stepCounter++;
        $scope.getStep($scope.stepCounter, $scope.instructions);
    };

    $scope.backStep = () => {
        $scope.stepCounter--;

        $scope.getStep($scope.stepCounter, $scope.instructions);
    };

});
