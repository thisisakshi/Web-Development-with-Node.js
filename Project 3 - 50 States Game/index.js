// This is a subset of the states.
// Use this to actually run the game
// (assume this is the full set of states.
// This will make it easier to test.
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];
// var states = ["Idaho", "Hawaii"];
// These are all the states. It maps the state name to the number which you'll
// want to use in your API call.
var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}


/*
 * The majority of this project is done in JavaScript.
 *
 * 1. Start the timer when the click button is hit. Also, you must worry about
 *    how it will decrement (hint: setInterval).
 * 2. Check the input text with the group of states that has not already been
 *    entered. Note that this should only work if the game is currently in
 * 3. Realize when the user has entered all of the states, and let him/her know
 *    that he/she has won (also must handle the lose scenario). The timer must
 *    be stopped as well.
 *
 * There may be other tasks that must be completed, and everyone's implementation
 * will be different. Make sure you Google! We urge you to post in Piazza if
 * you are stuck.
 */

 let statesNotUsed = [...states]; //array.pop();
 let start = document.getElementById("startButton");
 let inputDisabled = document.getElementById("stateName");
 let missedStates = document.getElementById("missedStates");
 let usedStates = document.getElementById("usedStates");
 let ss1 = document.getElementById("spanishSpeakerHeader");
 let ss2 = document.getElementById("spanishSpeakers");
 let timerLabel = document.getElementById("timerLabel");
 

 inputDisabled.disabled = true;

 // Click on start
 start.onclick = () => {
     duration = 20;

     //resetting values
     statesNotUsed = [...states];
     missedStates.innerHTML = "";
     usedStates.innerHTML = "";
     ss1.innerHTML = "";
     ss2.innerHTML = "";
     
     
     inputDisabled.disabled = false;
     startTimer(duration);
     
 }

// TIMER
function startTimer(duration) {

    var start = Date.now(),diff,minutes,seconds;

    function timer() {

        diff = duration - (((Date.now() - start) / 1000) | 0);
        if (diff > 0 && statesNotUsed.length > 0) {
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

             document.getElementById("timer").innerHTML = minutes + " : " + seconds;

        } else {
            document.getElementById("timer").innerHTML = "STOP!";
            inputDisabled.disabled = true;
            printStatesMissed();

            clearInterval(timerId);
            
        }
        
    };

    timer();
    let timerId = setInterval(() => timer(), 1000);
}

function onStateInput() {
    var stateName = document.getElementById("stateName");
    var inputState = stateName.value;

    //check if this value exists in the states
    if (statesNotUsed.includes(inputState)) {

        //print to screen

        var idVal = document.createAttribute("id"); 
        idVal.value = inputState;   

        let newState = document.createElement("p");
        newState.setAttributeNode(idVal); 
        newState.innerHTML = inputState;
        newState.addEventListener("mouseover", function(){printSpanishSpeakers(newState.id)});  
        usedStates.appendChild(newState);

        //remove from array
        for (s in statesNotUsed) {
            if (statesNotUsed[s] == inputState) {
                statesNotUsed.splice(s, 1); 
            }
        }

        //clear input box
        stateName.value = "";
    }  
}

function printStatesMissed() {
    if (statesNotUsed.length == 0) {
        missedStates.innerHTML = "DANG! You know all your states!"
        document.getElementById("timer").innerHTML = "YOU WIN! WOOHOOO!!! ";
        timerLabel.innerHTML = "WOW!";
        ss1.innerHTML = "";
    } else {
        for (missedState of statesNotUsed) {

            var idVal = document.createAttribute("id"); 
            idVal.value = missedState; 

            let newState = document.createElement("p");
            newState.innerHTML = missedState;
            newState.setAttributeNode(idVal); 
            newState.addEventListener("mouseover", function(){printSpanishSpeakers(newState.id)}); 

            missedStates.appendChild(newState);
        }
    }
}

function printSpanishSpeakers(hoverState) {

    let stateCode = abvMap[hoverState];
    let url = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:"+stateCode+"&LAN=625";
    $.getJSON(url, function( data ) {
        ss1.innerHTML = "<u>Number of Spanish Speakers in " + hoverState + "</u>";
        ss2.innerHTML = data[1][0];
    });
}