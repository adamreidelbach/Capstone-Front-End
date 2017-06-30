"use strict";

app.controller('ExerciseCtrl', function(DataFactory, $scope, $routeParams, StepFactory, $rootScope) {

    let nextButton = document.getElementById("nextButton");

    let lbName = document.getElementById("lbName");
    lbName.innerHTML = "-";
    let lbName2 = document.getElementById("lbName2");
    lbName2.innerHTML = "-";
    let lmName = document.getElementById("lmName");
    lmName.innerHTML = "-";
    let lmName2 = document.getElementById("lmName2");
    lmName2.innerHTML = "-";

    let getTutorial = (whichOne) => {
        console.log("route", $routeParams.id);
        DataFactory.getTutorial(whichOne)
        .then( (instructions) => {
          $scope.instructions = instructions;
          console.log("Got the tutorial", instructions);
          $scope.getStep(0, $scope.instructions);
          StepFactory.setStepsNum(instructions.steps.length);
          $rootScope.steps = instructions.steps.length;
          $scope.populateLearn($scope.currentStep);
          $scope.populateBranch($scope.currentStep);
          $scope.populateHint($scope.currentStep.hint1);
          $scope.addHighlight($scope.currentStep.styleStart);
          return instructions;
        });
    };

    getTutorial($routeParams.id);

    $scope.stepCounter = StepFactory.pageNum;

    $scope.getStep = (index, obj) => {
        $scope.currentStep = obj.steps[index];
        $rootScope.page = index;
        let backButton = document.getElementById("backButton");
        if (obj.steps[index].stepNum === 1) {
            backButton.classList.add("inactive");
        } else {
            backButton.classList.remove("inactive");
        }
        let nextButton = document.getElementById("nextButton");
        if (obj.steps.length === $rootScope.page + 1) {
            nextButton.classList.add("inactive");
        } else {
            nextButton.classList.remove("inactive");
        }
    };

    $scope.enableNext = () => {
        nextButton.classList.remove("inactive");
    };

    $scope.nextStep = () => {
        $scope.stepCounter++;
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.userAnswer = "";
        $("#inst1").prop("checked", false);
        $("#inst2").prop("checked", false);
        $("#appendText").html("");
        $("#addTerminalText").html("");
        // nextButton.classList.add("inactive");
        console.log("currentStep in nextStep", $scope.currentStep);
        $scope.populateLearn($scope.currentStep);
        $scope.populateHint($scope.currentStep.hint1);
        $scope.addHighlight($scope.currentStep.preStyle);
        $scope.removeHighlight($scope.currentStep.removeOldStyle);
        //eventually will need to keep all previous code and add a line break
    };

    $scope.backStep = () => {
        $scope.stepCounter--;
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.populateLearn($scope.currentStep);
        $scope.populateHint($scope.currentStep.hint1);
        $scope.removeHighlight($scope.currentStep.backRemove);
    };

    $scope.populateLearn = (currentInstructions) => {
        let learn = document.getElementById("learn");
        console.log(currentInstructions.learn);
        learn.innerHTML = currentInstructions.learn;
    };

    //get correct answer from data - if true, check the box and append the appropriate instructions text, if applicable
    $scope.getAnswer = () => {
        console.log("got the current step", $scope.currentStep);
        if ($scope.currentStep.answer1.includes($scope.userAnswer) /*&& $("#inst2").prop("checked") === false*/) {
            console.log("CORRECT1");
            $("#inst1").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint2);
            $("#appendText").append($scope.currentStep.append1);
            $scope.addTerminalText($scope.currentStep.terminal1);
            $scope.addHighlight($scope.currentStep.style1);
            $scope.removeHighlight($scope.currentStep.removeStyle1);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer) /*&& $("#inst1").prop("checked") === true*/) {
            console.log("CORRECT2");
            $("#inst2").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint3);
            $("#appendText").append($scope.currentStep.append2);
            $scope.addTerminalText($scope.currentStep.terminal2);
            $scope.addHighlight($scope.currentStep.style2);
            $scope.removeHighlight($scope.currentStep.removeStyle2);
        } else if ($scope.currentStep.answer3.includes($scope.userAnswer)) {
            console.log("CORRECT3");
            $("#inst3").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint4);
            $("#appendText").append($scope.currentStep.append3);
            $scope.addTerminalText($scope.currentStep.terminal3);
            $scope.addHighlight($scope.currentStep.style3);
            $scope.removeHighlight($scope.currentStep.removeStyle3);
        } else if ($scope.currentStep.answer4.includes($scope.userAnswer)) {
            console.log("CORRECT4");
            $("#inst4").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint5);
            $("#appendText").append($scope.currentStep.append4);
            $scope.addTerminalText($scope.currentStep.terminal4);
            $scope.addHighlight($scope.currentStep.style4);
            $scope.removeHighlight($scope.currentStep.removeStyle4);
        } else if ($scope.currentStep.answer5.includes($scope.userAnswer)) {
            console.log("CORRECT5");
            $("#inst5").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint6);
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

    // $("#thing").terminal(function(command, term) {
    //     if (command == 'help') {
    //         term.echo("available commands are mysql, js, test");
    //     } else {
    //         term.echo("unknown command " + command);
    //     }
    // });

     // adding and remove classes for the visualization area
    $scope.styling = (previousBox, newBox) => {
        previousBox.removeClass("highlight");
        newBox.addClass("highlight");
    };

    $scope.removeHighlight = (currentStep) => {
        let element = document.querySelector(currentStep);
        element.classList.remove("highlight");
    };

    $scope.addHighlight = (currentStep) => {
        let element = document.querySelector(currentStep);
        element.classList.add("highlight");
    };

    $scope.addTerminalText = (currentStep) => {
        $("#addTerminalText").append(currentStep);
    };

    $scope.populateHint = (currentHint) => {
        let helpContent = document.getElementById("helpContent");
        helpContent.innerHTML = currentHint;
    };

    $scope.populateBranch = (currentStep) => {
        // if (currentStep.branch1 && currentStep.branch2 === "") {
        //     lbName.classList.add("branchEmpty");
        //     lbName2.classList.add("branchEmpty");
        //     lmName.classList.add("branchEmpty");
        //     lmName2.classList.add("branchEmpty");
        // }
        // lbName.innerHTML = currentStep.branch1;
        // lbName2.innerHTML = currentStep.branch2;
        // lmName.innerHTML = currentStep.branch1;
        // lmName2.innerHTML = currentStep.branch2;
    };


});
