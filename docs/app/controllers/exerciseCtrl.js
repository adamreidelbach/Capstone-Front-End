"use strict";

app.controller('ExerciseCtrl', function(DataFactory, $scope, $routeParams, StepFactory, $rootScope) {

    let nextButton = document.getElementById("nextButton");

    // let lbName = document.getElementById("lbName");
    // lbName.innerHTML = "-";
    // let lbName2 = document.getElementById("lbName2");
    // lbName2.innerHTML = "-";
    // let lmName = document.getElementById("lmName");
    // lmName.innerHTML = "-";
    // let lmName2 = document.getElementById("lmName2");
    // lmName2.innerHTML = "-";
    let addTerminalText = document.getElementById("addTerminalText"),
    previousTerminal = document.getElementById("previousTerminal"),
    backButton = document.getElementById("backButton"),
    appendText = document.getElementById("appendText"),
    gb = document.getElementById("gb"),
    lb = document.getElementById("lb"),
    gm = document.getElementById("gm"),
    lm = document.getElementById("lm"),
    terminal = document.getElementById("terminal");

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
          $scope.addHighlight($scope.currentStep.preStyle1);
          return instructions;
        });
    };

    getTutorial($routeParams.id);

    $scope.stepCounter = StepFactory.pageNum;

    $scope.getStep = (index, obj) => {
        $scope.currentStep = obj.steps[index];
        $rootScope.page = index;
        console.log("obj.steps[index].stepNum", obj.steps[index].stepNum);
        console.log("obj.steps.length", obj.steps.length);
        console.log("$rootScope.page", $rootScope.page + 1);
        //make back button inactive is page is less than 1
        if (obj.steps[index].stepNum === 1) {
            backButton.classList.add("inactive");
        } else {
            backButton.classList.remove("inactive");
        }
        if (obj.steps.length === $rootScope.page + 1) {
            nextButton.classList.add("inactive");
        } else {
            nextButton.classList.remove("inactive");
        }
        // if ($("#inst1").prop("checked", false)) {
        //     nextButton.classList.add("inactive");
        // }
    };

    $scope.nextStep = () => {
        $scope.stepCounter++;
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.userAnswer = "";
        $("#inst1").prop("checked", false);
        $("#inst2").prop("checked", false);
        $("#inst3").prop("checked", false);
        $("#inst4").prop("checked", false);
        $("#inst5").prop("checked", false);
        $("#inst6").prop("checked", false);
        $("#inst7").prop("checked", false);
        appendText.innerHTML = "";
        addTerminalText.innerHTML = "";
        $scope.populateLearn($scope.currentStep);
        $scope.previousTerminalText($scope.currentStep);
        $scope.populateHint($scope.currentStep.hint1);
        $scope.resetStyle();
        $scope.addHighlight($scope.currentStep.preStyle1);
        $scope.addHighlight($scope.currentStep.preStyle2);
        $scope.removeHighlight($scope.currentStep.removeOldStyle);
        //eventually will need to keep all previous code and add a line break
    };

    $scope.backStep = () => {
        $scope.stepCounter--;
        $scope.userAnswer = "";
        $("#inst1").prop("checked", false);
        $("#inst2").prop("checked", false);
        $("#inst3").prop("checked", false);
        $("#inst4").prop("checked", false);
        $("#inst5").prop("checked", false);
        $("#inst6").prop("checked", false);
        $("#inst7").prop("checked", false);
        $scope.getStep($scope.stepCounter, $scope.instructions);
        $scope.populateLearn($scope.currentStep);
        $scope.previousTerminalText($scope.currentStep);
        // $("#inst1").prop("checked", true);
        $scope.populateHint($scope.currentStep.hint1);
        appendText.innerHTML = "";
        $scope.resetStyle();
        $scope.addHighlight($scope.currentStep.preStyle1);
        $scope.addHighlight($scope.currentStep.preStyle2);
    };

    $scope.populateLearn = (currentInstructions) => {
        let learn = document.getElementById("learn");
        learn.innerHTML = currentInstructions.learn;
    };

    //get correct answer from data - if true, check the box and append the appropriate instructions text, if applicable
    $scope.getAnswer = () => {
        if ($scope.currentStep.answer1.includes($scope.userAnswer) && $("#inst2").prop("checked") === false) {
            console.log("CORRECT1");
            $scope.userAnswer = "";
            $("#inst1").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint2);
            $scope.addTerminalText($scope.currentStep.terminal1);
            $scope.addHighlight($scope.currentStep.style1);
            $("#appendText").append($scope.currentStep.append1);
            $scope.removeHighlight($scope.currentStep.removeStyle1);
        } else if ($scope.currentStep.answer2.includes($scope.userAnswer) && $("#inst1").prop("checked") === true) {
            console.log("CORRECT2");
            $scope.userAnswer = "";
            $("#inst2").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint3);
            $("#appendText").append($scope.currentStep.append2);
            $scope.addTerminalText($scope.currentStep.terminal2);
            $scope.addHighlight($scope.currentStep.style2);
            $scope.removeHighlight($scope.currentStep.removeStyle2);
        } else if ($scope.currentStep.answer3.includes($scope.userAnswer) && $("#inst1").prop("checked") === true && $("#inst2").prop("checked") === true) {
            console.log("CORRECT3");
            $scope.userAnswer = "";
            $("#inst3").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint4);
            $("#appendText").append($scope.currentStep.append3);
            $scope.addTerminalText($scope.currentStep.terminal3);
            $scope.addHighlight($scope.currentStep.style3);
            $scope.removeHighlight($scope.currentStep.removeStyle3);
        } else if ($scope.currentStep.answer4.includes($scope.userAnswer) && $("#inst1").prop("checked") === true && $("#inst2").prop("checked") === true && $("#inst3").prop("checked") === true) {
            console.log("CORRECT4");
            $scope.userAnswer = "";
            $("#inst4").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint5);
            $("#appendText").append($scope.currentStep.append4);
            $scope.addTerminalText($scope.currentStep.terminal4);
            $scope.addHighlight($scope.currentStep.style4);
            $scope.removeHighlight($scope.currentStep.removeStyle4);
        } else if ($scope.currentStep.answer5.includes($scope.userAnswer) && $("#inst1").prop("checked") === true && $("#inst2").prop("checked") === true && $("#inst3").prop("checked") === true && $("#inst4").prop("checked") === true) {
            console.log("CORRECT5");
            $scope.userAnswer = "";
            $("#inst5").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint6);
            $("#appendText").append($scope.currentStep.append5);
            $scope.addTerminalText($scope.currentStep.terminal5);
            $scope.addHighlight($scope.currentStep.style5);
            $scope.removeHighlight($scope.currentStep.removeStyle5);
        } else if ($scope.currentStep.answer6.includes($scope.userAnswer) && $("#inst1").prop("checked") === true && $("#inst2").prop("checked") === true && $("#inst3").prop("checked") === true && $("#inst4").prop("checked") === true && $("#inst5").prop("checked") === true) {
            console.log("CORRECT6");
            $scope.userAnswer = "";
            $("#inst6").prop("checked", true);
            $scope.populateHint($scope.currentStep.hint7);
            $("#appendText").append($scope.currentStep.append6);
            $scope.addTerminalText($scope.currentStep.terminal6);
            $scope.addHighlight($scope.currentStep.style6);
            $scope.removeHighlight($scope.currentStep.removeStyle6);
        } else if ($scope.currentStep.answer7.includes($scope.userAnswer) && $("#inst1").prop("checked") === true && $("#inst2").prop("checked") === true && $("#inst3").prop("checked") === true && $("#inst4").prop("checked") === true && $("#inst5").prop("checked") === true && $("#inst6").prop("checked") === true) {
            console.log("CORRECT7");
            $scope.userAnswer = "";
            $("#inst7").prop("checked", true);
            $("#appendText").append($scope.currentStep.append7);
            $scope.addTerminalText($scope.currentStep.terminal7);
            $scope.addHighlight($scope.currentStep.style7);
            $scope.removeHighlight($scope.currentStep.removeStyle7);
        } else {
            console.log("INCORRECT");
            $("#addTerminalText").append("<p>command not found: " + $scope.userAnswer);
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

    $scope.resetStyle = () => {
        lb.classList.remove("highlight");
        gb.classList.remove("highlight");
        lm.classList.remove("highlight");
        gm.classList.remove("highlight");
    };

     // adding and remove classes for the visualization area
    // $scope.styling = (previousBox, newBox) => {
    //     previousBox.removeClass("highlight");
    //     newBox.addClass("highlight");
    // };

    $scope.removeHighlight = (currentStep) => {
        let element = document.querySelector(currentStep);
        element.classList.remove("highlight");
    };

    $scope.addHighlight = (currentStep) => {
        let element = document.querySelector(currentStep);
        console.log(element);
        element.classList.add("highlight");
    };

    $scope.addTerminalText = (currentStep) => {
        $("#addTerminalText").append(currentStep);
        $scope.updateScroll();
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

    $scope.previousTerminalText = (currentStep) => {
        previousTerminal.innerHTML = currentStep.previousTerminal;
        addTerminalText.innerHTML = "";
        $("#previousTerminal").append(currentStep.backTerminal);
        $scope.updateScroll();
    };

    $scope.updateScroll = () => {
        terminal.scrollTop = terminal.scrollHeight;
    };

});