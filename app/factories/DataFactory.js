"use strict";

app.factory("DataFactory", function($q, $http) {

  const getInstructions = () => {
    let instructions = [];
    return $q( (resolve, reject) => {
      $http.get(`instructions.json`)
      .then( (instructObj) => {
        let instructions = instructObj.data;
        console.log("instructions", instructions);
       // Object.keys(itemCollection).forEach( (key) => {
       //    itemCollection[key].id = key;
       //    instructions.push(itemCollection[key]);
        });
        resolve(instructions)
        // })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  return {getInstructions};

});
