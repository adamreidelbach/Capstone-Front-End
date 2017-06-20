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
          // $scope.addStyling($scope.instructions);
          return instructions;
        });
    };

    getTutorial($routeParams.id);

    $scope.stepCounter = StepFactory.pageNum;

    $scope.getStep = (index, obj) => {
        $scope.currentStep = obj.steps[index];
        $rootScope.page = index;
        // $scope.removeHighlight();
        // $scope.addStyling($scope.currentStep);
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
            $scope.addHighlight($scope.currentStep.style1);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer) && $("#inst1").prop("checked") === true) {
            console.log("CORRECT");
            $("#inst2").prop("checked", true);
            $("#appendText").append($scope.currentStep.append2);
            $scope.addHighlight($scope.currentStep.style2);
            $scope.removeHighlight($scope.currentStep.removeStyle2);
        } else if ($scope.currentStep.answer3.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst3").prop("checked", true);
            $("#appendText").append($scope.currentStep.append3);
            $scope.addHighlight($scope.currentStep.style3);
            $scope.removeHighlight($scope.currentStep.removeStyle3);
        } else if ($scope.currentStep.answer4.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst4").prop("checked", true);
            $("#appendText").append($scope.currentStep.append4);
            $scope.addHighlight($scope.currentStep.style4);
            $scope.removeHighlight($scope.currentStep.removeStyle4);
        } else if ($scope.currentStep.answer5.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst5").prop("checked", true);
            $("#appendText").append($scope.currentStep.append5);
            $scope.addHighlight($scope.currentStep.style5);
            $scope.removeHighlight($scope.currentStep.removeStyle5);
        } else if ($scope.currentStep.answer6.includes($scope.userAnswer)) {
            console.log("CORRECT");
            $("#inst6").prop("checked", true);
            $("#appendText").append($scope.currentStep.append6);
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


    // $scope.addStyling = (currentInstructions) => {
    //     console.log("currentInstructions in addStyling", currentInstructions);
    //     //logic for tutorial 1
    //     // if (currentInstructions.name === "Tutorial 1") {
    //         console.log("you are in tut1");
    //         console.log("querySelector", document.querySelector($scope.currentStep.style));
    //         // if ($scope.userAnswer === "git checkout -b myNavbar") {
    //         //     $("#addTerminalText").append($scope.currentStep.terminal1);
    //         //     $("#lb").addClass("highlight");
    //         // }
    //         // if ($scope.userAnswer === "git commit -m \"completed the navbar\"") {
    //         //     $("#addTerminalText").append($scope.currentStep.terminal3);
    //         //     console.log("terminal3", $scope.currentStep.terminal3);
    //         // }
    //         // if ($scope.userAnswer === "git push origin myNavbar") {
    //         //     $("#addTerminalText").append($scope.currentStep.terminal4);
    //         //     $scope.styling($("#lb"), $("#gb"));
    //         // }
    //         // if ($scope.userAnswer === "git pull origin master") {
    //         //     $("#addTerminalText").append($scope.currentStep.terminal5);
    //         //     $scope.styling($("#gb"), $("#lm"));
    //         // }
    //         // if ($scope.userAnswer === "git checkout -b myFooter") {
    //         //     $("#addTerminalText").append($scope.currentStep.terminal6);
    //         //     $scope.styling($("#lm"), $("#lb"));
    //         // }
    //     // }
    //     // if (currentInstructions.name === "Tutorial 2") {
    //     //     console.log("you are in tut2");
    //     //     if ($scope.userAnswer === "git status") {
    //     //         $("#addTerminalText").append($scope.currentStep.terminal1);
    //     //         $("#lb").addClass("highlight");
    //     //         console.log("git has been statused");
    //     //     }
    //     //     if ($scope.userAnswer === "git checkout master") {
    //     //         $("#addTerminalText").append($scope.currentStep.terminal1);
    //     //         $scope.styling($("#lb"), $("#lm"));
    //     //     }
    //     //     if ($scope.userAnswer === "git checkout myBranch") {
    //     //         $("#addTerminalText").append($scope.currentStep.terminal1);
    //     //         $scope.styling($("#lm"), $("#lb"));
    //     //     }
    //     // }
    // };

     // if statement for ensuring users complete answers in the appropriate order
     // if ($scope.userAnswer !== "" && ("#inst2").prop("chcked") === false) {
     //    alert("What the hell bro!");
     // };

});
