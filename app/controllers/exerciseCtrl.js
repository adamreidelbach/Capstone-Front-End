"use strict";

app.controller('ExerciseCtrl', function(DataFactory, $scope, $routeParams, StepFactory, $rootScope) {

    let getTutorial = (whichOne) => {
        console.log("route", $routeParams.id);
        DataFactory.getTutorial(whichOne)
        .then( (instructions) => {
          $scope.instructions = instructions;
          console.log("Got the tutorial", instructions);
          $scope.getStep(0, $scope.instructions);
          // $scope.showMoreInstructions($scope.instructions.steps[0]);
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
        //pass currentStep to showSecondInst to hide or show second instructions
        $scope.showMoreInstructions($scope.currentStep);
    };

    $scope.nextStep = () => {
        $scope.stepCounter++;
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.userAnswer = "";
        $("#inst1").prop("checked", false);
        $("#inst2").prop("checked", false);
        $("#appendText").html("");
        //eventually will need to keep all previous code and add a line break
    };

    $scope.backStep = () => {
        $scope.stepCounter--;
        $scope.getStep($scope.stepCounter, $scope.instructions);
    };

    $scope.getAnswer = (currentStep) => {
        console.log("do we have currentStep", $scope.currentStep.answer);
        console.log("append", $scope.currentStep.append);
        if ($scope.currentStep.answer1.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst1").prop("checked", true);
            $("#appendText").append($scope.currentStep.append);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst2").prop("checked", true);
            $("#appendText").append($scope.currentStep.append);
        } else {
            console.log("INCORRECT");
            $scope.userAnswer = "";
        }
    };

     $scope.showMoreInstructions = (currentInstructions) => {
        if (currentInstructions.command2 === "") {
            $scope.secondInst = false;
        } else {
            $scope.secondInst = true;
        }
     };

    // $scope.getAnswer = (currentStep) => {
    //     console.log("do we have currentStep", $scope.currentStep.answer);
    //     console.log("append", $scope.currentStep.append);
    //     let answerData = $scope.currentStep.answer;
    //     let userAnswer = $scope.userAnswer;
    //     if (answerData[0].match(userAnswer) !== null) {
    //         console.log("CORRECT");
    //         $("#test5").prop("checked", true);
    //         $("#appendText").append($scope.currentStep.append);
    //     } else {
    //         console.log("INCORRECT");
    //         $scope.userAnswer = "";
    //     }
    // };


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
