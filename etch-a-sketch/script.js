//TO MAKE DIVS INSIDE CANVAS
function drawBoxes(gridSize){
    let container = document.getElementById("canvas");
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    container.style.backgroundColor = gridBg;
    for (i = 0; i<(gridSize*gridSize); i++){
        let box = document.createElement("div");
        box.style.backgroundColor = 'transparent';
        box.addEventListener('mouseover', applyPenColor);
        box.addEventListener('mousedown', applyPenColor);
        box.addEventListener('touchmove', applyPenColorTouch, {passive: true});
        box.addEventListener("touchstart", function(e) {
            if (e.touches.length == 1) {
                e.preventDefault();
            }
          },{passive: false});
        
        box.addEventListener('dragstart', (e) => { e.preventDefault() } ) //to prevent drag and drop
        container.appendChild(box);
    }
}
//REMOVE OLD DIVS IN CANVAS AND CALL FUNCTION TO DRAW THEM AGAIN
function reDrawBoxes (){
    let value= document.getElementById("newSize").value;
    let goAhead = true;
    if (value <= 0){
        alert('Grid size can not be equal to or less than zero.')
        goAhead = false;
    }
    if (value > 64){
        goAhead = confirm('Grids larger than 64x64 will use lots of system recources. On slower computers your browser may get freezed. Continue? ')
    }
    if (goAhead){
        console.log(value);
        let container = document.getElementById("canvas");
        container.innerHTML = "";
        gridSize = value;
        drawBoxes(gridSize);
        addGridBorder(gridColor);
    }
}

//ADD A BORDER TO EACH DIV ELEMENT INSIDE CANVAS
function addGridBorder(gridColor){
    let boxes = document.querySelectorAll("#canvas>div");
    for (i = 0; i<boxes.length;i++){
        boxes[i].style.border =`1px solid ${gridColor}`;
    }
}

//CHANGE GRID BORDER COLOR VARIABLE ACCORDING TO RADIO INPUTS. THEN CALL FUCTION TO ADD changed BORDER ON EACH DIV INSIDE CANVAS
function changeGridBorderColor(e) {
    switch (e.target.id){
        case 'gridColorDefault':
            gridColor = '#ADADAD'
            break;
        case 'gridColorInvisible':
            gridColor = 'transparent'
            break;
        case 'gridColorCustom':
            gridColor = document.querySelector('#gridColorCustomSelector').value;
            break;
         case 'gridColorCustomSelector':
                if (document.querySelector('#gridColorCustom').checked){
                gridColor = document.querySelector('#gridColorCustomSelector').value;
                }
                break;                 
    }
    addGridBorder(gridColor);
}
//this function is used to change static colors only. Rainbow colors are changed in applyPenColor function.
function changePenColor(e){
    switch (e.target.id){
        case 'penColorEraser':
            penColor = document.querySelector("#canvas").style.backgroundColor;
            break;        
        case 'penColorCustom':
            penColor = document.querySelector('#penColorCustomSelector').value;
            break;
         case 'penColorCustomSelector':
                if (document.querySelector('#penColorCustom').checked){
                penColor = document.querySelector('#penColorCustomSelector').value;
                }
                break;                 
    }

}

//RETURNS random color https://css-tricks.com/snippets/javascript/random-hex-color/
function calculateRainbow(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

//Changes background color of active div to pencolor. If rainbow is on, it gets color from rainbow function. Else color is penColor.
function applyPenColor(e){
    //calculate new rainbow color befor applying if rainbow radio button is checked
    if (document.querySelector('#penColorRainbow').checked){
        penColor = calculateRainbow();
    }

    //when drawingMode is hover, apply color without requiring click
    if (isClickRequired == 'false'){
    e.target.style.backgroundColor = penColor;
    }
    //when drawingMode is click. dont apply color if none of mouse keys are pressed.
    else{
        if (e.buttons == 1){
            e.target.style.backgroundColor = penColor;
        }    
    }
}

//MOBILE SUPPORT; Touch events were very confusing. This solution helped me understand https://github.com/lachesis17/etch-a-sketch
function applyPenColorTouch(e){
    let touch = e.touches[0];
    let box = document.elementFromPoint(touch.clientX, touch.clientY);
    let canvas = document.getElementById("canvas");
    //calculate new rainbow color befor applying if rainbow radio button is checked
    if (document.querySelector('#penColorRainbow').checked){
        penColor = calculateRainbow();
    }
    if(canvas.contains(box)){
        box.style.backgroundColor = penColor;
    }
    return
}


//Changes a variable to specify if click is required.
function changeDrawingMode (e){
    if (e.target.id == 'drawingModeClick'){
        isClickRequired = 'true';
    }
    else{
        isClickRequired = 'false';
    }

}

//Changes bacground color of canvas
function changeBackgroundColor(e){
    if (e.target.id == 'defaultBg'){
        document.querySelector("#canvas").style.backgroundColor = '#ffffff'

    }
    else {document.querySelector("#canvas").style.backgroundColor = e.target.value
    }
}

//Set color to transparent for every div inside canvas
function clearCanvas(){
    let boxes = document.querySelectorAll("#canvas>div");
    for (i =0; i<boxes.length;i++){
        boxes[i].style.backgroundColor = 'transparent';
    }

}



//default values  
let gridSize = 24,
    gridBg = '#ffffff'
    penColor = '#ffffff',
    gridColor = '#ADADAD',
    isClickRequired = 'true';

drawBoxes(gridSize);
addGridBorder(gridColor);




//Add specific event listener to every input element
let inputButton;
inputButton = document.querySelectorAll("input[name = penColor]");
for (i = 0; i<inputButton.length;i++){ 
    inputButton[i].addEventListener('change', changePenColor);
}
inputButton = document.querySelectorAll("input[name = gridColor]");
for (i = 0; i<inputButton.length;i++){ 
    inputButton[i].addEventListener('change', changeGridBorderColor);
}
inputButton = document.querySelectorAll("input[name = drawingMode]");
for (i = 0; i<inputButton.length;i++){ 
    inputButton[i].addEventListener('change', changeDrawingMode);
}
inputButton = document.querySelector("#clearCanvas");
inputButton.addEventListener('click', clearCanvas);

inputButton = document.querySelector("#newBgColor");
inputButton.addEventListener('change', changeBackgroundColor);

// inputButton = document.querySelector("#defaultBg");
// inputButton.addEventListener('click', changeBackgroundColor);

inputButton = document.querySelector("#changeSize");
inputButton.addEventListener('click', reDrawBoxes);






