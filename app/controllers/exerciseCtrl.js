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
          $scope.addHighlight($scope.currentStep.styleStart);
          // $scope.addStyling($scope.instructions);
          return instructions;
        });
    };

    getTutorial($routeParams.id);

    $scope.stepCounter = StepFactory.pageNum;

    $scope.getStep = (index, obj) => {
        $scope.currentStep = obj.steps[index];
        $rootScope.page = index;
        // $scope.addHighlight($scope.currentStep.styleStart);
    };

    $scope.nextStep = () => {
        $scope.stepCounter++;
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.userAnswer = "";
        $("#inst1").prop("checked", false);
        $("#inst2").prop("checked", false);
        $("#appendText").html("");
        $("#addTerminalText").html("");
        $scope.addHighlight($scope.currentStep.preStyle);
        $scope.removeHighlight($scope.currentStep.removeOldStyle);
        //eventually will need to keep all previous code and add a line break
    };

    $scope.backStep = () => {
        $scope.stepCounter--;
        $scope.getStep($scope.stepCounter, $scope.instructions);
    };

    //get correct answer from data - if true, check the box and append the appropriate instructions text, if applicable
    $scope.getAnswer = () => {
        console.log("got the current step", $scope.currentStep);
        if ($scope.currentStep.answer1.includes($scope.userAnswer) /*&& $("#inst2").prop("checked") === false*/) {
            console.log("CORRECT1");
            $("#inst1").prop("checked", true);
            $("#appendText").append($scope.currentStep.append1);
            $scope.addTerminalText($scope.currentStep.terminal1);
            $scope.addHighlight($scope.currentStep.style1);
            $scope.removeHighlight($scope.currentStep.removeStyle1);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer) /*&& $("#inst1").prop("checked") === true*/) {
            console.log("CORRECT2");
            $("#inst2").prop("checked", true);
            $("#appendText").append($scope.currentStep.append2);
            $scope.addTerminalText($scope.currentStep.terminal2);
            $scope.addHighlight($scope.currentStep.style2);
            $scope.removeHighlight($scope.currentStep.removeStyle2);
        } else if ($scope.currentStep.answer3.includes($scope.userAnswer)) {
            console.log("CORRECT3");
            $("#inst3").prop("checked", true);
            $("#appendText").append($scope.currentStep.append3);
            $scope.addTerminalText($scope.currentStep.terminal3);
            $scope.addHighlight($scope.currentStep.style3);
            $scope.removeHighlight($scope.currentStep.removeStyle3);
        } else if ($scope.currentStep.answer4.includes($scope.userAnswer)) {
            console.log("CORRECT4");
            $("#inst4").prop("checked", true);
            $("#appendText").append($scope.currentStep.append4);
            $scope.addTerminalText($scope.currentStep.terminal4);
            $scope.addHighlight($scope.currentStep.style4);
            $scope.removeHighlight($scope.currentStep.removeStyle4);
            $scope.addHighlight($scope.currentStep.preStyle4);
            $scope.removeHighlight($scope.currentStep.removeOldStyle4);
        } else if ($scope.currentStep.answer5.includes($scope.userAnswer)) {
            console.log("CORRECT5");
            $("#inst5").prop("checked", true);
            $("#appendText").append($scope.currentStep.append5);
            $scope.addTerminalText($scope.currentStep.terminal5);
            $scope.addHighlight($scope.currentStep.style5);
            $scope.removeHighlight($scope.currentStep.removeStyle5);
        } else if ($scope.currentStep.answer6.includes($scope.userAnswer)) {
            console.log("CORRECT6");
            $("#inst6").prop("checked", true);
            $("#appendText").append($scope.currentStep.append6);
            $scope.addTerminalText($scope.currentStep.terminal6);
            $scope.addHighlight($scope.currentStep.style6);
            $scope.removeHighlight($scope.currentStep.removeStyle6);
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

    $scope.removeHighlight = (currentStep) => {
        console.log("removehighlight currentStep", currentStep);
        let element = document.querySelector(currentStep);
        console.log("element removehighlight", element);
        element.classList.remove("highlight");
    };

    $scope.addHighlight = (currentStep) => {
        console.log("addHighlight currentStep", currentStep);
        let element = document.querySelector(currentStep);
        console.log("element addhighlight", element);
        element.classList.add("highlight");
    };

    $scope.addTerminalText = (currentStep) => {
        console.log("terminal text - ", currentStep);
        $("#addTerminalText").append(currentStep);
    };

});
