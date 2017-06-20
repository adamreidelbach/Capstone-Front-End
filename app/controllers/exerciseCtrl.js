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
        //pass currentStep to showSecondInst to hide or show second instructions
        $scope.showMoreInstructions($scope.currentStep);
        $scope.getStyling($scope.currentStep);
    };

    $scope.nextStep = () => {
        $scope.stepCounter++;
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.userAnswer = "";
        $("#inst1").prop("checked", false);
        $("#inst2").prop("checked", false);
        $("#appendText").html("");
        $("#addTerminalText").html("");
        //eventually will need to keep all previous code and add a line break
    };

    $scope.backStep = () => {
        $scope.stepCounter--;
        $scope.getStep($scope.stepCounter, $scope.instructions);
    };

    //get correct answer from data
    //if true, check the box and append the appropriate instructions text, if applicable
    $scope.getAnswer = () => {
        if ($scope.currentStep.answer1.includes($scope.userAnswer) && $("#inst2").prop("checked") === false) {
            console.log("CORRECT");
            $("#inst1").prop("checked", true);
            $("#appendText").append($scope.currentStep.append);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer) && $("#inst1").prop("checked") === true) {
            console.log("CORRECT");
            $("#inst2").prop("checked", true);
            $("#appendText").append($scope.currentStep.append);
        } else {
            console.log("INCORRECT");
            $scope.userAnswer = "";
        }
    };

    //show instructions div by default
    $scope.firstInst = true;
    // if there is not more than one instruction, hide the empty div
    $scope.showMoreInstructions = (currentInstructions) => {
        if (currentInstructions.command1 === "") {
            $scope.firstInst = false;
        }
        else if (currentInstructions.command2 === "") {
            $scope.secondInst = false;
        }
        else {
            $scope.secondInst = true;
        }
     };

     // adding and remove classes for the visualization area
    $scope.styling = (previousBox, newBox) => {
        previousBox.removeClass("highlight");
        newBox.addClass("highlight");
    };

    $scope.getStyling = (currentStep) => {
        switch($scope.userAnswer) {
            case "git add .":
                break;
            case "git commit -m \"building splash page\"":
                $("#addTerminalText").append($scope.currentStep.terminal);
                break;
            case "git checkout -b JohnStyling":
                $("#addTerminalText").append($scope.currentStep.terminal);
                $("#box4").addClass("highlight");
                break;
            case "git pull origin JohnStyling":
                $("#box4").addClass("highlight");
                break;
            case "git checkout master":
                $("#addTerminalText").append($scope.currentStep.terminal);
                $scope.styling($("#box4"), $("#box3"));
                break;
            case "git pull origin master":
                break;
            case "git checkout myBranch":
                $("#addTerminalText").append($scope.currentStep.terminal);
                $scope.styling($("#box3"), $("#box4"));
                break;
            case "git merge master":
                $("#addTerminalText").append($scope.currentStep.terminal);
                break;
            case "git status":
                $("#addTerminalText").append($scope.currentStep.terminal);
                break;
        }
    };

     // if statement for ensuring users complete answers in the appropriate order
     // if ($scope.userAnswer !== "" && ("#inst2").prop("chcked") === false) {
     //    alert("What the hell bro!");
     // };

});
