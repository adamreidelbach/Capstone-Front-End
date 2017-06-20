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
            $("#appendText").append($scope.currentStep.append1);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer) && $("#inst1").prop("checked") === true) {
            console.log("CORRECT");
            $("#inst2").prop("checked", true);
            $("#appendText").append($scope.currentStep.append2);
        } else if ($scope.currentStep.answer3.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst3").prop("checked", true);
            $("#appendText").append($scope.currentStep.append3);
        } else if ($scope.currentStep.answer4.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst4").prop("checked", true);
            $("#appendText").append($scope.currentStep.append4);
        } else if ($scope.currentStep.answer5.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst5").prop("checked", true);
            $("#appendText").append($scope.currentStep.append5);
        } else if ($scope.currentStep.answer6.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst6").prop("checked", true);
            $("#appendText").append($scope.currentStep.append6);
        } else {
            console.log("INCORRECT");
            $scope.userAnswer = "";
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
                $("#addTerminalText").append($scope.currentStep.terminal1);
                break;
            case "git checkout -b JohnStyling":
                $("#addTerminalText").append($scope.currentStep.terminal1);
                $("#lb").addClass("highlight");
                break;
            case "git pull origin JohnStyling":
                $("#lb").addClass("highlight");
                break;
            case "git checkout master":
                $("#addTerminalText").append($scope.currentStep.terminal1);
                $scope.styling($("#lb"), $("#lm"));
                break;
            case "git checkout myBranch":
                $("#addTerminalText").append($scope.currentStep.terminal1);
                $scope.styling($("#lm"), $("#lb"));
                break;
            case "git merge master":
                $("#addTerminalText").append($scope.currentStep.terminal1);
                break;
            case "git status":
                $("#addTerminalText").append($scope.currentStep.terminal1);
                break;
            case "git checkout -b myNavbar":
                $("#addTerminalText").append($scope.currentStep.terminal1);
                $("#lb").addClass("highlight");
                break;
            case "git commit -m \"completed the navbar\"":
                $("#addTerminalText").append($scope.currentStep.terminal3);
                console.log("terminal3", $scope.currentStep.terminal3);
                break;
            case "git push origin myNavbar":
                $("#addTerminalText").append($scope.currentStep.terminal4);
                $scope.styling($("#lb"), $("#gb"));
                break;
            case "git pull origin master":
                $("#addTerminalText").append($scope.currentStep.terminal5);
                $scope.styling($("#gb"), $("#lm"));
                break;
            case "git checkout -b myFooter":
                $("#addTerminalText").append($scope.currentStep.terminal6);
                $scope.styling($("#lm"), $("#lb"));
                break;
        }
    };

     // if statement for ensuring users complete answers in the appropriate order
     // if ($scope.userAnswer !== "" && ("#inst2").prop("chcked") === false) {
     //    alert("What the hell bro!");
     // };

});
