function announceResult(round,result,userChoice,computerChoice){
    let message = document.createElement('p');
    if (result == 'tie'){
        message.textContent = `Round #${round}> Both choosed ${userChoice}. No one wins`
    }
    if (result == 'yWin'){
        message.textContent = `Round #${round}> You choosed ${userChoice} and computer choosed ${computerChoice}. You win this round. `
        document.getElementById('userScore').textContent = +document.getElementById('userScore').textContent+1;
        }
    if (result == 'cWin'){
        message.textContent = `Round #${round}> You choosed ${userChoice} and computer choosed ${computerChoice}. Computer wins this round.`
        document.getElementById('compScore').textContent = +document.getElementById('compScore').textContent+1;
    }
    let targetbox = document.querySelector("#history");
    targetbox.insertBefore(message, targetbox.firstChild);
    //for animation
    setTimeout(function(){
        message.style.color= 'white';
    }, 100)
    
    //For Ending game if somone reaches score 5
    let compScore = +(document.getElementById('compScore').textContent);
    let userScore = +(document.getElementById('userScore').textContent); 
    let finalLocation = document.querySelector("#makeChoiceContainer");
    if (userScore >= 5 || compScore >= 5 ){

        let finalMessage = document.createElement('div');
        if (compScore>userScore){
            finalMessage.textContent = `Game over. The Computer Won. Hit F5 to play again.`;
        }
        else {
            finalMessage.textContent = `Game over. You Won. Hit F5 to play again.`;
        }
        finalMessage.style.cssText = "width: 30vw; font-size: 3rem; margin-top: 1rem; background-color:#00adec; padding:15px 10px; border-radius: 10px;"
        finalLocation.appendChild(finalMessage);
        
        //remove the event listners and buttons
        const buttons = document.querySelectorAll(".choiceButton")
        buttons.forEach(button => {
        button.removeEventListener('click', playRound)
        button.classList.add('hidden')});
        document.querySelector("#description").classList.add('hidden');
        
        //for animation
        setTimeout(function(){
            finalMessage.style.color= 'white';
        }, 100);
    
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
    let userChoice = e.target.getAttribute('data-choice');
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