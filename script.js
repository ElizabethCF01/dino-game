const player = document.getElementById('dino')
const playerimg = document.getElementById('player')
const btnPS = document.getElementById('btn-play-stop')
const cactus = document.getElementById('cactus')
const back = document.getElementById('back')
const btnRes = document.getElementById('btn-restart')
const board = document.getElementById('board')
let score = 0;
let intervID 
let gameLoop

function addJump(){
    player.classList.add('playerJump')
    playerimg.src="./img/dino.png"
}
function removeJump(){
    player.classList.remove('playerJump')
    playerimg.src="./img/dinor.gif"
}
board.addEventListener('click', function(){
    addJump()
})

function checkCondition() {
    if (
        cactus.offsetLeft < (player.offsetLeft + 30)
        && cactus.offsetLeft > player.offsetLeft
        && (player.offsetTop >= (cactus.offsetTop - player.offsetHeight))
    ) {
        lostGame();
    }
    gameLoop = requestAnimationFrame(checkCondition)
}

function lostGame() {
    cancelAnimationFrame(gameLoop)
    pauseGame();
    btnPS.classList.add("reset")
    playerimg.src="./img/dino.png"
}
function startInterval(){
    intervID = setInterval(()=>{
        score++;
        document.getElementById('score').innerText = score
    }, 1000)
}
function setAnimations(action){
    cactus.style.animationPlayState = action
    player.style.animationPlayState = action
    back.style.animationPlayState = action
}
function pauseGame(){
    setAnimations('paused')
    clearInterval(intervID)
    playerimg.src="./img/dino.png"
}
function resumeGame(){
    setAnimations('running')
    playerimg.src="./img/dinor.gif"
}
function resetScore(){
    score = 0;
    document.getElementById('score').innerText = score
    startInterval()
}
function resetAnimation() {
    removeJump()
    cactus.classList.remove('cactusMovement')
    void cactus.offsetWidth
    cactus.classList.add('cactusMovement')
}
function resetGame(){
    resetAnimation()
    resumeGame()
    resetScore()
    gameLoop = requestAnimationFrame(checkCondition);
}

player.addEventListener('animationend', ()=>{
    removeJump()
})

btnPS.addEventListener('click', ()=>{
    if(btnPS.classList.contains('play')){
        resumeGame()
        btnPS.classList.remove('play')
    }else if(btnPS.classList.contains('reset')){
        resetGame();
        btnPS.classList.remove('reset')
    }else{
        pauseGame()
        btnPS.classList.add('play')
    }
})

document.addEventListener('keyup', (e)=>{
    console.log(e) 
    if(e.code=='ArrowUp' || e.code=='Space'){
        addJump()
    }
})
//startInterval();
window.addEventListener("load", () => {
    resetGame();
})