"use strict";

app.factory("DataFactory", function($q, $http) {

    const getAllInstructions = () => {
        return $q((resolve, reject) => {
            $http.get("instructions.json")
                .then((instructObj) => {
                    let newObj = instructObj.data.exercises;
                    resolve(newObj);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getTutorial = (whichOne) => {
        return $q((resolve, reject) => {
            $http.get("instructions.json")
                .then((instructObj) => {
                    let newObj = instructObj.data.exercises;
                    let instructArray = newObj.filter(instruction => {
                        return instruction.id === whichOne;
                    });
                    resolve(instructArray[0]);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

        const getTitle = () => {
        return $q((resolve, reject) => {
            $http.get("instructions.json")
                .then((instructObj) => {
                    resolve(instructObj);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return { getAllInstructions, getTutorial, getTitle };

});
