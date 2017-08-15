"use strict";

app.factory('StepFactory', () => {

    let totalSteps;

    let setStepsNum = (stepsLength) => {
        totalSteps = stepsLength;
    };

    return {
        pageNum: 0,
        totalSteps,
        setStepsNum
    };
});
