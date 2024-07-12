const ticTacToe = new TicTacToeAI()
let turn = 1
let result = ""
let notFinished = true
document.getElementById("moveAI").addEventListener("click",moveAI)
document.getElementById("perft-button").addEventListener("click",function(){
    if (notFinished) {
        document.getElementById("perft-result").innerHTML = ticTacToe.perftTest(turn)
    }
})

for (let i = 0; i < 9; i++) {
    document.getElementById("sq-" + i).addEventListener("click",function(){
        if (notFinished) {
            let id = i
            let self = document.getElementById("sq-" + id)
            if (self.innerHTML == "") {
                ticTacToe.makeMove(turn,ticTacToe.MOVE_PATTERN[id])
                if (turn == 1) {
                    self.innerHTML = "X"
                } else {
                    self.innerHTML = "O"
                }
                turn *= -1
                checkPosition()
                if (notFinished) {
                    moveAI()
                }
            }
        }
    })
}

function checkPosition() {
    if (ticTacToe.isFirstPlayerWin()) {
        result = "The Player X is Winner!"
        notFinished = false
    } else if (ticTacToe.isSecondPlayerWin()) {
        result = "The Player O is Winner!"
        notFinished = false
    } else if (ticTacToe.isDraw()) {
        result = "Draw!"
        notFinished = false
    } else if (turn == 1) {
        document.getElementById("whoToMove").innerHTML = "X"
    } else {
        document.getElementById("whoToMove").innerHTML = "O"
    }
    document.getElementById("result").innerHTML = result
}

function moveAI() {
    if (notFinished) {
        let bestMove = ticTacToe.getBestMove(turn)
        ticTacToe.makeMove(turn,ticTacToe.MOVE_PATTERN[bestMove])
        if (turn == 1) {
            document.getElementById("sq-"+bestMove).innerHTML = "X"
        } else {
            document.getElementById("sq-"+bestMove).innerHTML = "O"
        }
        turn *= -1
        checkPosition()
    }
}