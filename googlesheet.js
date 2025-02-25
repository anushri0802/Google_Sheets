//add cells to head-row
//27 (no of columns)times

let columns = 27;
let row = 100;


let headRow = document.querySelector(".head-row");
let serialNoCol = document.querySelector(".serial-no");
let body = document.querySelector(".main-body");
let activeCell = document.querySelector(".selected-cell")
let inputBox = document.querySelector("input");
const form = document.querySelector(".form-container");

for(let i = 0; i < columns-1; i++){
    let headCell= document.createElement("div");
    headCell.textContent = String.fromCharCode(i+65);
    headCell.classList.add("col-head");
    headRow.appendChild(headCell);

}

for(let i = 0; i<row;i++){
    let cells = document.createElement("div");
    cells.textContent=i+1;
    cells.classList.add("row-number");
    serialNoCol.appendChild(cells);
}


//CREATE THOSE BODY CELLS
//using nested loops
// row -> col -> cells -> classList

for( let i = 1;i<row;i++ ){
    let rowCell = document.createElement("div"); //will create rows
    rowCell.classList.add("row");
    
    
    for(let j =1;j<columns;j++){
        let colCell = document.createElement("span"); //will add cells to that row
        
        colCell.id=`${String.fromCharCode(j+64)}${i}`;
        colCell.classList.add("cell");
        colCell.contentEditable="true";
        rowCell.appendChild(colCell);
    }
    body.appendChild(rowCell);
}



//eventlistener and eval div
//event delegation

let selectedCell ="";
let allCellData = {};

body.addEventListener("input", (e)=>{

    if(selectedCell){
        selectedCell.style.border = "1px solid black";
    }


    activeCell.textContent = e.target.id;
    // console.log(e.target);
    selectedCell = e.target;
    selectedCell.style.border = "1px solid red";
    // inputBox.value = e.target.textContent;
    applyCell();

    // inputBox.onkeydown = function (event){
    //     if(event.key === "Enter"){
    //         let result = eval(inputBox.value);
    //         e.target.textContent = result;
    //         inputBox.value = result;
    //     }
    // }
})

//access from element values -> select a cell and apply these values as styles to that cell
//access form and add event to it
//store form data
//apply this data to selectedcell

form.addEventListener("change",()=>{
    if(!selectedCell){
        alert("Please select a cell ");
        form.reset();
        return;
    }

    //access data
    const formData = {
        fontFamily : form["fontfamily"].value,
        fontSize : form["fontSize"].value,
        fontWeight : form["fontWeight"].checked,
        fontStyle : form["fontStyle"].checked,
        fontUnderline : form["fontUnderline"].checked,
        align : form["align"].value,
        textColor : form["textColor"].value,
        backgroundColor : form["backgroundColor"].value,
    }
    allCellData[selectedCell.id] = {...formData, innerText : selectedCell.innerText};

    applyStyles(formData);
})

function applyStyles(formData){
    selectedCell.style.fontFamily= formData.fontFamily;
    selectedCell.style.fontSize = formData.fontSize;
    selectedCell.style.fontWeight = formData.fontWeight?"bold":"normal";
    selectedCell.style.fontStyle= formData.fontStyle?"italic":"normal";
    selectedCell.style.textDecoration= formData.fontUnderline?"underline":"none";
    selectedCell.style.textAlign = formData.align;
    selectedCell.style.color = formData.textColor;
    selectedCell.style.backgroundColor = formData.backgroundColor;
}


// cell-> form
// form["fontSize].value = cell1.fontSize
// obj ={
// A1:{fontsize...}
// }

// font["fontSize"].value = obj .A1.fontSize



function applyCell(){
    if(!allCellData[selectedCell.id]){
        form.reset();
        return;
    }
    let specificCell = allCellData[selectedCell.id];
    for(let key in specificCell){
        if(key ==="fontWeight" || key ==="fontStyle" || key ==="fontUnderline"){
            form[key].checked = specificCell[key]
        }
        else{
            form[key].value = specificCell[key]
        }
    }
}