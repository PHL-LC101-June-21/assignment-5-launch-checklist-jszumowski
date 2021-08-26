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
        return 'Empty';
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
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    if (fuelLevel < 10000){
        alert('Fuel too low for launch')
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(199, 37, 78)';
        fuelStatus.innerHTML = "Fuel too low for launch";
    }
    if (cargoLevel > 10000){
        alert('Cargo mass too heavy for launch')
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = 'rgb(199, 37, 78)';
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    }
    if (fuelLevel > 9999 && cargoLevel < 10000){
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = 'rgb(65, 159, 106)';
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