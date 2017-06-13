"use strict";

app.factory("DataFactory", function($q, $http) {

  const getInstructions = () => {
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

  return {getInstructions};

});
