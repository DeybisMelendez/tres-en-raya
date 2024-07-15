const ticTacToe = new TicTacToeAI()
let turn = 1
let result = ""
let notFinished = true
document.getElementById("moveAI").addEventListener("click",moveAI)
document.getElementById("perft-button").addEventListener("click",function(){
    if (notFinished) {
        document.getElementById("perft-result").innerHTML = perftTest(ticTacToe, turn)
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

function perftTest(ai,turn) {
    let result = `
    <tr>
        <th>Depth</th>
        <th>Nodes</th>
        <th>Draws</th>
        <th>First Player Wins</th>
        <th>Second Player Wins</th>
        <th>Time in millis</th>
    </tr>`
    let maxMoves = 10-bitCount(ai.board[0]|ai.board[1])
    for (let i = 1; i<maxMoves;i++) {
        ai.drawsCount = 0
        ai.secondPlayerWinCount = 0
        ai.firstPlayerWinCount = 0
        let start = performance.now()
        let perftResult = ai.perft(i,turn)
        let end = performance.now()
        let depthResult = `
        <tr>
            <td>${i}</td>
            <td>${perftResult}</td>
            <td>${ai.drawsCount}</td>
            <td>${ai.firstPlayerWinCount}</td>
            <td>${ai.secondPlayerWinCount}</td>
            <td>${end-start}</td>
        </tr>`
        result += depthResult
    }
    return result
}

function bitCount (n) {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}