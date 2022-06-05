//Refresh Display with lates values from variables. Also resize font to fit many characters.
function refreshDisplay(){
    if(currentValue.length < 11) mainDisplay.style.fontSize = '3rem';
    if(currentValue.length > 11) mainDisplay.style.fontSize = '2rem';
    if(currentValue.length > 17) mainDisplay.style.fontSize = '1.5rem';
    if(currentValue.length > 22) mainDisplay.style.fontSize = '1rem';
    mainDisplay.textContent = currentValue;
    secondaryDisplay.textContent = lastValue.concat(operatorSign);
}

//Delete most recent entered number.
function clearPressed(){
    currentValue = currentValue.slice(0, -1);
    refreshDisplay();
}

//Delete all numbers.
function deletePressed(e){
    currentValue = '0';
    lastValue = '';
    operator = '';
    tempOperator = '';
    operatorSign = '';
    refreshDisplay()
}

//Handle any numbers pressed.
function keypressNumber (e){ 

    //remove placeholder zero from left side when first value is entered.
    if (currentValue == '0') currentValue = '';

    //Dont allow decimals if already present.
    if (currentValue.includes(".") && e.target.textContent =='.') return;

    //Add value of pressed button to currentValue.
    currentValue += e.target.textContent;

    refreshDisplay()
}

//Handle any operator key pressed
function keypressOperator(e){

    //When user presses operator without providing a second value to operate, change the operator to whatever user pressed and do nothing else.
    if (lastValue != '' && currentValue == '0'){
        switch (e.target.value){
            case '+':
            operatorSign = '+'
            operator = function plus (num1,num2){
            return (+num1)+(+num2)
            }
            break;
            case '-':
            operatorSign = '-'
            operator = function minus (num1,num2){
            return (+num1)-(+num2)
            }
            break;
            case '*':
            operatorSign = 'x'
            operator = function multiply (num1,num2){
            return (+num1)*(+num2)
            }
            break;
            case '/':
            operatorSign = '/'
            operator = function divide (num1,num2){
            return (+num1)/(+num2)
            }
            break;
        }
        refreshDisplay()
        return
    }

    //When user presses operator after entering two values, calculate those two first before taking third value.
    if (lastValue != '' && currentValue != '0' && currentValue != ''){
        keypressOperatorTwice();
    }

    //Main function of keyPressOperator. Move CurrentValue to lastValue variable and empty currentValue to accept new inputs. Update operator function and operatorSign variables.
    lastValue = currentValue;
    currentValue = '0';
    switch (e.target.value){
        case '+':
        operatorSign = '+'
        operator = function plus (num1,num2){
        return (+num1)+(+num2)
        }
        break;
        case '-':
        operatorSign = '-'
        operator = function minus (num1,num2){
        return (+num1)-(+num2)
        }
        break;
        case '*':
        operatorSign = 'x'
        operator = function multiply (num1,num2){
        return (+num1)*(+num2)
        }
        break;
        case '/':
        operatorSign = '/'
        operator = function divide (num1,num2){
        return (+num1)/(+num2)
        }
        break;
    }
    refreshDisplay()

}

//Call function stored in operator variable with current and last values. store result in currentValue. Empty lastValue, operator sign and operator function.
function equalPressed(){
    currentValue = operator(lastValue,currentValue).toString(10);
    lastValue = '';
    operator = '';
    operatorSign = '';
    refreshDisplay()
}

//Merge currentValue and lastValue to make space for new value.
function keypressOperatorTwice(){
    currentValue = operator(lastValue,currentValue).toString(10);
    refreshDisplay()
}


//Default Values and references.
let currentValue = '0';
let lastValue = '';
let operator = '';
let tempOperator = ''
let operatorSign = '';
let mainDisplay = document.querySelector("#mainDisplay");
let secondaryDisplay = document.querySelector("#secondaryDisplay");
let buttons = document.querySelectorAll("button");


//Add Event Listeners to Every Button.
buttons.forEach(button => { 
        if (button.dataset.buttonType == 'number') {
            button.addEventListener('click', keypressNumber)
        }     
        if (button.dataset.buttonType == 'operator') {
            button.addEventListener('click', keypressOperator)
        }     
        if (button.dataset.buttonType == 'delete') {
            button.addEventListener('click', deletePressed)
        }     
        if (button.dataset.buttonType == 'equal') {
            button.addEventListener('click', equalPressed)
        }     
        if (button.dataset.buttonType == 'clear') {
            button.addEventListener('click', clearPressed)
        }   
});


