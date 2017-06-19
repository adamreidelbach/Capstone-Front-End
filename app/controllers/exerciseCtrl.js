"use strict";

app.controller('ExerciseCtrl', function(DataFactory, $scope, $routeParams, StepFactory, $rootScope) {

    let getTutorial = (whichOne) => {
        console.log("route", $routeParams.id);
        DataFactory.getTutorial(whichOne)
        .then( (instructions) => {
          $scope.instructions = instructions;
          console.log("Got the tutorial", instructions);
          $scope.getStep(0, $scope.instructions);
          StepFactory.setStepsNum(instructions.steps.length);
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
        $scope.userAnswer = "";
        $("#test5").prop("checked", false);
        $("#appendText").html("");
        //eventually will need to keep all previous code and add a line break
    };

    $scope.backStep = () => {
        $scope.stepCounter--;
        $scope.getStep($scope.stepCounter, $scope.instructions);
    };

    // /n

    $scope.getAnswer = (currentStep) => {
        console.log("do we have currentStep", $scope.currentStep.answer);
        console.log("append", $scope.currentStep.append);
        if ($scope.currentStep.answer.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#test5").prop("checked", true);
            $("#appendText").append($scope.currentStep.append);
        } else {
            console.log("INCORRECT");
            $scope.userAnswer = "";
        }
    };

    // $scope.getAnswer($scope.currentStep);

    // if ($scope.currentStep.answer.includes(answer)) {
    //     console.log("correct asnwer");
    // };



        // $("#userSubmit").click(function () {
    //     if ($("#userText").val() === "git init") {
    //         $("#box1").addClass("highlight");
    //         $("#test5").prop("checked", true);
    //     }
    //     if ($("#userText").val() === "git checkout -b myBranch") {
    //         $("#box4").addClass("highlight");
    //         $("#test5").prop("checked", true);
    //         $("#error").hide();
    //     }
    //     if ($("#userText").val() === "git checkout -b JohnStyling") {
    //         $("#box4").addClass("highlight");
    //         $("#terminalText").append("terminal text");
    //         $(".part2").removeClass("hide");
    //         $("#test5").prop("checked", true);
    //     }
    //     if ($("#userText").val() === "git push origin") {
    //         $("#box3").addClass("highlight");
    //         console.log("git push origin");
    //     }
    //     if ($("#userText").val() === "git pull master") {
    //         $("#box2").addClass("highlight");
    //         console.log("git pull master");
    //     }
    //     if ($("#userText").val() === "git add . git commit -m") {
    //         $("#test5").prop("checked", true);
    //     }
    // });

});
