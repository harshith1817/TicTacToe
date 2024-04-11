let boxes=document.querySelectorAll(".box");
let ResetButton=document.querySelector(".reset");
let NewGameButton=document.querySelector(".newgame");
let WinnerContainer=document.querySelector(".Winner-Container");
let submit1=document.querySelector("#submit1");
let submit2=document.querySelector("#submit2");
let msg=document.querySelector(".msg");
let turn0=true;
let count=0;
let player = {};
let name1 = null;
let name2 = null;
let symbol1 = null;
let symbol2 = null;
const WinningPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    WinnerContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText=symbol1;
            turn0=false;
        } else{
            box.innerText=symbol2;
            turn0=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            GameDraw();
        }
    });
});

const GameDraw=()=>{
    msg.innerText=`Game was a Draw.`;
    WinnerContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(Winner) =>{
    msg.innerText=`Congratulations, The Winner is ${player[Winner]}.`;
    WinnerContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for (let pattern of WinningPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

submit1.addEventListener("click", () => { 
    name1 = document.querySelector(".Player1name").value;
    symbol1 = document.querySelector("#input1").value;
    player[symbol1] = name1;
});

submit2.addEventListener("click", () => {
    name2 = document.querySelector(".Player2name").value;
    symbol2 = document.querySelector("#input2").value;
    player[symbol2] = name2;
});

ResetButton.addEventListener("click",resetGame);
NewGameButton.addEventListener("click",resetGame);
