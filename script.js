// Write your JavaScript code here!

window.addEventListener('load', function() {
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let list = document.getElementById('faultyItems');
   list.style.visibility = 'hidden';
   let listedPlanets;
   let listedPlanetsResponse = myFetch()
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {

       let destination = pickPlanet(listedPlanets);
       console.log(destination)
       addDestinationInfo(document, destination.name, destination.diameter, destination.star, destination.distance, destination.moons, destination.image);
   })
   
   let form = document.querySelector("form");
   form.addEventListener('submit', function (event){
       event.preventDefault();
       let pilotInput = document.querySelector("input[name=pilotName]");
       const pilot = pilotInput.value;
       let copilotInput = document.querySelector("input[name=copilotName]");
       const copilot = copilotInput.value;
       let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
       const fuelLevel = fuelLevelInput.value;
       let cargoMassInput = document.querySelector("input[name=cargoMass]");
       const cargoLevel = cargoMassInput.value; 
       
       formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel)
   });
});

