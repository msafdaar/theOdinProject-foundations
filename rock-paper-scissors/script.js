function announceResult(round,result,userChoice,computerChoice){
    let message = document.createElement('p');
    if (result == 'tie'){
        message.textContent = `Round #${round}> Tie, Both choosed ${userChoice}.`
    }
    if (result == 'yWin'){
        message.classList.add("user")
        message.textContent = `Round #${round}> Your score +1, You choosed ${userChoice} and computer choosed ${computerChoice}.`
        document.getElementById('userScore').textContent = +document.getElementById('userScore').textContent+1;
        }
    if (result == 'cWin'){
        message.classList.add("computer")
        message.textContent = `Round #${round}> Computer score +1, You choosed ${userChoice} and computer choosed ${computerChoice}.`
        document.getElementById('compScore').textContent = +document.getElementById('compScore').textContent+1;
    }

    let history = document.querySelector("#history");
    history.appendChild(message);
    history.scrollTop = history.scrollHeight;

    //For Ending game if somone reaches score 5
    let compScore = +(document.getElementById('compScore').textContent);
    let userScore = +(document.getElementById('userScore').textContent); 
    let finalLocation = document.querySelector("#makeChoiceContainer");
    if (userScore >= 5 || compScore >= 5 ){

        let finalMessage = document.createElement('h2');
        if (compScore>userScore){
            finalMessage.textContent = `Game over. Computer Won.`;
        }
        else {
            finalMessage.textContent = `Game over. You Won.`;
        }
        finalMessage.classList.add("finalMessage")
        let playAgain = document.createElement("button");
        playAgain.textContent = "Play again";
        playAgain.classList.add("playAgain");
        playAgain.onclick = ()=>{location.reload()}

        finalLocation.innerHTML = "";
        finalLocation.appendChild(finalMessage);
        setTimeout(()=>{finalLocation.appendChild(playAgain)}, 500);
    
    }
    
}

function calculateResult(userChoice,computerChoice){
    //Compare Choices and Decide Winner
    switch(true){
        case userChoice == computerChoice:
        return "tie";
        case (userChoice == "Rock" && computerChoice == "Sccissors") || (userChoice == "Paper" && computerChoice == "Rock") || (userChoice == "Sccissors" && computerChoice == "Paper"):
        return "yWin"
        default:
        return "cWin"
    }
}

function computerChoiceFunction(){
    //Make a choice for computer randomly.
    let choice = Math.floor(Math.random() * 3);
    if (choice == 0 ) {return "Rock";}
    if (choice == 1 ) {return "Paper";}
    if (choice == 2 ) {return "Sccissors";}
}
function playRound(e){
    let userChoice = e.currentTarget.getAttribute('data-choice');
    let computerChoice = computerChoiceFunction();
    let result = calculateResult(userChoice,computerChoice);
    announceResult(round,result,userChoice,computerChoice);
    round++;
}

let round = 1;
const buttons = document.querySelectorAll(".choiceButton")
buttons.forEach(button => {
button.addEventListener('click', playRound)     
});

document.querySelector(".switchDarkMode").onclick = ()=>{
    document.body.classList.toggle("dark");
}