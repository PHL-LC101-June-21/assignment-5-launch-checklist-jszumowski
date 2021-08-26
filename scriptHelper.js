// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name} </li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
    if (testInput == ''){
        return 'empty';
    }
    if (isNaN(testInput)){
        return 'Not a Number';
    } else {
        return 'Is a Number';
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let faultyItems = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

   if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty'){
       alert('All fields required.');
   }
   if (validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty'){
    alert('All fields required.');
    }
   if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number'){
       alert('Fuel and Cargo Level must be numbers');
   }

    faultyItems.style.visibility = 'visible';
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for takeoff.`;
    copilotStatus.innerHTML = `Copilot ${copilot} is ready for takeoff.`;
    if (fuelLevel < 10000){
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = 'red';
        fuelStatus.innerHTML = "There is not enough fuel for the journey";
    }
    if (cargoLevel > 10000){
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = 'red';
        cargoStatus.innerHTML = "Too much cargo";
    }
    if (fuelLevel > 9999 && cargoLevel < 10001){
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = 'green';
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    console.log('is this thing on');
    return planets[index];
    
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;