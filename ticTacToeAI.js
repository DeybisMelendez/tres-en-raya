class TicTacToeAI {
    board = [
        0b000000000, // Tablero Primer jugador
        0b000000000, // Tablero Segundo jugador
    ]
    FIRST_PLAYER = 0
    SECOND_PLAYER = 1
    DRAW_PATTERN = 0b111111111
    WIN_PATTERN = [
        0b100100100,
        0b010010010,
        0b001001001,
        0b111000000,
        0b000111000,
        0b000000111,
        0b100010001,
        0b001010100
    ]
    MOVE_PATTERN = [
        0b100000000,
        0b010000000,
        0b001000000,
        0b000100000,
        0b000010000,
        0b000001000,
        0b000000100,
        0b000000010,
        0b000000001,
    ]
    generateMoves() {
        let moves = []
        let allBoard = this.board[this.FIRST_PLAYER] | this.board[this.SECOND_PLAYER]
        for (let i = 0; i < this.MOVE_PATTERN.length; i++) {
            if ((this.MOVE_PATTERN[i] & allBoard) == 0) {
                moves.push(this.MOVE_PATTERN[i])
            }
        }
        return moves
    }
    makeMove(turn, move) {
        if (turn == 1) {
            this.board[this.FIRST_PLAYER] |= move
        } else {
            this.board[this.SECOND_PLAYER] |= move
        }
    }
    
    unMakeMove(turn, move) {
        if (turn == 1) {
            this.board[this.FIRST_PLAYER] ^= move
        } else {
            this.board[this.SECOND_PLAYER] ^= move
        }
    }
    isDraw() {
        if ((this.board[this.FIRST_PLAYER] | this.board[this.SECOND_PLAYER]) == this.DRAW_PATTERN) {
            return true
        }
        return false
    }
    isEndGame() {
        for (let i = 0; i < this.WIN_PATTERN.length; i++) {
            if ((this.board[this.FIRST_PLAYER] & this.WIN_PATTERN[i]) == this.WIN_PATTERN[i] ||
                (this.board[this.SECOND_PLAYER] & this.WIN_PATTERN[i]) == this.WIN_PATTERN[i]) {
                return true
            }
        }
        return false
    }
    negamax(turn, depth) {
        if (this.isEndGame()) {
            return -turn * (9-depth) * turn
        } else if (this.isDraw()) {
            return 0
        }
        let moves = this.generateMoves()
        let score = -1000
        for (let i=0; i < moves.length; i++) {
            this.makeMove(turn, moves[i])
            score = Math.max(score, -this.negamax(-turn, depth++))
            this.unMakeMove(turn, moves[i])
        }
        return score
    }
    getBestMove(turn) {
        let moves = this.generateMoves()
        let bestScore = -1000
        let bestMove = 0
        for (let i = 0; i < moves.length; i++) {
            this.makeMove(turn,moves[i])
            let score = -this.negamax(-turn,1)
            if (score > bestScore) {
                bestScore = score
                bestMove = moves[i]
            }
            this.unMakeMove(turn,moves[i])
        }
        return this.MOVE_PATTERN.indexOf(bestMove)
    }
    // Para contar estadísticas
    isFirstPlayerWin() {
        for (let i = 0; i < this.WIN_PATTERN.length; i++) {
            if ((this.board[this.FIRST_PLAYER] & this.WIN_PATTERN[i]) == this.WIN_PATTERN[i]) {
                return true
            }
        }
        return false
    }
    isSecondPlayerWin() {
        for (let i = 0; i < this.WIN_PATTERN.length; i++) {
            if ((this.board[this.SECOND_PLAYER] & this.WIN_PATTERN[i]) == this.WIN_PATTERN[i]) {
                return true
            }
        }
        return false
    }
    // Perft
    firstPlayerWinCount = 0
    secondPlayerWinCount = 0
    drawsCount = 0

    perft(depth, turn) {
        if (this.isFirstPlayerWin()) {
            this.firstPlayerWinCount++
            return 1
        } else if (this.isSecondPlayerWin()) {
            this.secondPlayerWinCount++
            return 1
        } else if (this.isDraw()) {
            this.drawsCount++
            return 1
        }
        if (depth == 0) {
            return 1
        }
        let total = 0
        let moves = this.generateMoves()
        for (let i=0; i < moves.length; i++) {
            this.makeMove(turn, moves[i])
            total += this.perft(depth-1, -turn)
            this.unMakeMove(turn, moves[i])
        }
        return total
    }
    perftTest() {
        for (let i = 1; i<10;i++) {
            let start = performance.now()
            this.drawsCount = 0
            this.secondPlayerWinCount = 0
            this.firstPlayerWinCount = 0
            let perftResult = this.perft(i,1)
            let end = performance.now()
            console.log("Depth",i,"Nodes",perftResult,"Draws",this.drawsCount,"First Player Win",this.firstPlayerWinCount,"Second Player Win",this.secondPlayerWinCount, "Time millis",end-start)
        }
    }
}

const ticTacToe = new TicTacToeAI()
ticTacToe.perftTest()
//console.log(ticTacToe.getBestMove(1))