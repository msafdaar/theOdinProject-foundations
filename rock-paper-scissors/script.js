let round = 0;

const buttons = document.querySelectorAll(".choiceButton")
buttons.forEach(button => {
button.addEventListener('click', playRound)     
});

document.querySelector(".switchDarkMode").onclick = ()=>{
    document.body.classList.toggle("dark");
}


//main event handler
function playRound(e){
    round++;
    let userChoice = e.currentTarget.getAttribute('data-choice');
    let computerChoice = computerChoiceFunction();
    let result = calculateResult(userChoice,computerChoice);
    announceResult(round,result,userChoice,computerChoice);
    checkGameOver()
}

//Make a choice for computer randomly.
function computerChoiceFunction(){
    let choice = Math.floor(Math.random() * 3);
    if (choice == 0 ) {return "Rock";}
    if (choice == 1 ) {return "Paper";}
    if (choice == 2 ) {return "Scissors";}
}

//Compare Choices and Decide Winner
function calculateResult(userChoice,computerChoice){
    switch(true){
        case userChoice == computerChoice:
        return "tie";
        case (userChoice == "Rock" && computerChoice == "Scissors") || (userChoice == "Paper" && computerChoice == "Rock") || (userChoice == "Scissors" && computerChoice == "Paper"):
        return "yWin"
        default:
        return "cWin"
    }
}

//announce result in history div
function announceResult(round,result,userChoice,computerChoice){
    let message = document.createElement('tr');
    if (result == 'tie'){
        message.innerHTML = `
        <tr>
        <td>${round}</td>
        <td>${userChoice}</td>
        <td>${computerChoice}</td>
        </tr>`
    }
    if (result == 'yWin'){
        message.innerHTML = `
        <tr class="userWinRow">
        <td>${round}</td>
        <td class="userWin">${userChoice}</td>
        <td class="computerLose">${computerChoice}</td>
        </tr>`
        document.getElementById('userScore').textContent = +document.getElementById('userScore').textContent+1;
        }
    if (result == 'cWin'){
        message.innerHTML = `
        <tr class="computerWinRow">
        <td>${round}</td>
        <td class="userLose">${userChoice}</td>
        <td class="computerWin">${computerChoice}</td>
        </tr>`
        document.getElementById('compScore').textContent = +document.getElementById('compScore').textContent+1;
    }

    let history = document.querySelector("#history");
    history.appendChild(message);
    history.scrollTop = history.scrollHeight;
}

//End game if somone reaches score 5
function checkGameOver(){
    let compScore = +(document.getElementById('compScore').textContent);
    let userScore = +(document.getElementById('userScore').textContent); 
    let container = document.querySelector("#makeChoiceContainer");
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

        container.innerHTML = "";
        container.appendChild(finalMessage);
        setTimeout(()=>{container.appendChild(playAgain)}, 500);
    }
}

