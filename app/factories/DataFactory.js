"use strict";

app.factory("DataFactory", function($q, $http) {

  const getAllInstructions = () => {
    let instructions = [];
    return $q( (resolve, reject) => {
      $http.get("instructions.json")
      .then( (instructObj) => {
        let instructions = instructObj.data;
        resolve(instructions);
        })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  const getTestingInstructions = () => {
    let testingInstructions = [];
    return $q( (resolve, reject) => {
      $http.get("instructions.json")
      .then( (instructObj) => {
        let instructions = instructObj.data.exercises[0].tutorial3;
        resolve(instructions);
        })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  return {getAllInstructions, getTestingInstructions};

});
