let board = [
    0b000000000, // X
    0b000000000, // O
]

let winPattern = [
    0b100100100,
    0b010010010,
    0b001001001,
    0b111000000,
    0b000111000,
    0b000000111,
    0b100010001,
    0b001010100
]

let movePattern = [
    0b100000000,
    0b010000000,
    0b001000000,
    0b000100000,
    0b000010000,
    0b000001000,
    0b000000100,
    0b000000010,
    0b000000001
]

function generateMoves() {
    let moves = []
    let pattern
    let allBoard = board[0] | board[1]
    for (let i = 0; i < movePattern.length; i++) {
        pattern = movePattern[i]
        if ((pattern & allBoard) == 0) {
            moves.push(pattern)
        }
    }
    return moves
}

function makeMove(turn,move) {
    board[turn] |= move
}

function unMakeMove(turn,move) {
    board[turn] ^= move
}

function isDraw() {
    if ((board[0] | board[1]) == 0b111111111) {
        return true
    }
    return false
}

function isEndGame() {
    let pattern
    for (let i = 0; i < winPattern.length; i++) {
        pattern = winPattern[i]
        if (((board[0] & pattern) == pattern) || ((board[1] & pattern) == pattern)) {
            return true
        }
    }
    return false
}

function isOWin() {
    let pattern
    for (let i = 0; i < winPattern.length; i++) {
        pattern = winPattern[i]
        if ((board[1] & pattern) == pattern) {
            return true
        }
    }
    return false
}

function isXWin() {
    let pattern
    for (let i = 0; i < winPattern.length; i++) {
        pattern = winPattern[i]
        if ((board[0] & pattern) == pattern) {
            return true
        }
    }
    return false
}

function negamax(depth, whoToMove) {
    let turn = whoToMove == 1 ? 0 : 1
    if (isEndGame()) {
        return -whoToMove * whoToMove // Gana el que jugó
    }
    if (depth == 0) {
        return 0 // Empate
    }
    let moves = generateMoves()
    let score = -2
    for (let i=0; i < moves.length; i++) {
        makeMove(turn,moves[i])
        score = Math.max(score,-negamax(depth-1,-whoToMove))
        unMakeMove(turn,moves[i])
    }
    return score
}
let drawCount = 0
let OWinCount = 0
let XWinCount = 0
function perft(depth,whoToMove) {
    if (isOWin()) {
        OWinCount++
        return 1
    } else if (isXWin()) {
        XWinCount++
        return 1
    } else if (isDraw()) {
        drawCount++
        return 1
    }
    if (depth == 0) {
        return 1
    }
    let total = 0
    let moves = generateMoves()
    for (let i=0; i < moves.length; i++) {
        makeMove(whoToMove,moves[i])
        total += perft(depth-1, whoToMove == 0 ? 1 : 0)
        unMakeMove(whoToMove,moves[i])
    }
    return total
}
for (let i = 1; i<10;i++) {
    drawCount = 0
    XWinCount = 0
    OWinCount = 0
    console.log("Depth",i,"Nodes",perft(i,0),"Draws",drawCount,"First Player Win",XWinCount,"Second Player Win",OWinCount)
}
