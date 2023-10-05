const selctor = document.querySelectorAll(".title")
const PLAYER_X = 'X';
const PLAYER_O ='O';
let turn =PLAYER_X;


const boardState = Array(selctor.length);
boardState.fill(null);

// console.log(boardState)

const strike=document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");

const click = new Audio("sounds/gameClick.wav");
const gameOver = new Audio("sounds/gameOver.wav");





selctor.forEach((title)=>title.addEventListener('click',titleClick))
function setHoverText(){
    selctor.forEach((title)=>{
        title.classList.remove("x-hover");
        title.classList.remove("o-hover");
    })
    const hoverClass = `${turn.toLowerCase()}-hover`
    selctor.forEach(title=>{
        if(title.innerText == ""){
            title.classList.add(hoverClass);
        }
    })
}

setHoverText()

function titleClick(event){
    
    click.play();
    if(gameOverArea.classList.contains("visible")){
        return
    }
    const title =event.target;
    const titleNumber=title.dataset.index;
    

    // console.log(titleNumber)
    if(title.innerText != ""){
        return
    }
    if(turn === PLAYER_X){
        
        title.innerText=PLAYER_X;
        boardState[titleNumber-1]=PLAYER_X;
        // console.log(boardState[titleNumber-1])
        turn = PLAYER_O;
    }
    else{
        
        title.innerText=PLAYER_O;
        boardState[titleNumber-1]=PLAYER_O;
        // console.log(boardState[titleNumber-1])
        turn = PLAYER_X; 
    }
    setHoverText();
    checkWinner();
    

}

const winningCombinations = [
    { combo:[1, 2, 3], strikeClass: "strike-row-1"},
    { combo:[4, 5, 6], strikeClass: "strike-row-2"},
    { combo:[7, 8, 9], strikeClass: "strike-row-3"},
    { combo:[1, 4, 7], strikeClass: "strike-column-1"},
    { combo:[2, 5, 8], strikeClass: "strike-column-2"},
    { combo:[3, 6, 9], strikeClass: "strike-column-3"},
    { combo:[1, 5, 9], strikeClass: "strike-daigonal-1"},
    { combo:[3, 5, 7], strikeClass: "strike-daigonal-2"}
]

function checkWinner(){
   for(const winningCombination of winningCombinations) {
    // const combo = winningCombination.combo;
    // const strikeClass = winningCombination.strikeClass;
    // console.log(winningCombination)
    const {combo,strikeClass} = winningCombination;
    const titleValue1 = boardState[combo[0] - 1];
    const titleValue2 = boardState[combo[1] - 1];
    const titleValue3 = boardState[combo[2] - 1];
    // console.log(boardState[combo[0]-1])
    if(titleValue1 != null &&
         titleValue1 === titleValue2 
         && titleValue1 === titleValue3){
            
        strike.classList.add(strikeClass);
        gameOverScreen(titleValue1);
       
      }
      
    
   }
   // check for a draw
   const allTitleFilledIn = boardState.every((title) => title !== null);
   if(allTitleFilledIn){
    gameOverScreen(null);
   }
}

function gameOverScreen(winner){
    // console.log(winner)
    let text = "Game is tie!"
    if(winner != null){
        text = `Winner is ${winner}`
    }
    gameOverArea.classList.add("visible");
    gameOverText.innerText= text;
   
    gameOver.play()
}

playAgain.addEventListener('click',newGame=>{
    strike.className='strike';
    gameOverArea.className='hidden';
    boardState.fill(null);
    selctor.forEach((title)=>(title.innerText=""))
})