# tres-en-raya

Decidí hacer una IA de Tres en Raya sencillo porque me entró curiosidad conocer cuantas posiciones posibles se pueden alcanzar en el juego. Luego de desarrollarlo, llegué a la siguiente conclusión:

El juego contiene 255,168 estados posibles, de los cuales el primer jugador gana 131,184, el segundo jugador gana 77,904 y 46,080 son empates.

La solución del juego es Empate.

# Como usar ticTacToeAI.js

## Instanciar la IA

let ttt = new TicTacToeAI()

## Métodos

### ttt.makeMove(turn, move)

Realiza una jugada.

turn es el jugador a realizar la jugada, 1 para el primer jugador, -1 para el segundo jugador.

move es la jugada, desde 0 (esquina superior izquierda) hasta 8 (esquina inferior derecha).

### ttt.unMakeMove(turn, move)

Deshace la jugada.

turn es el jugador a deshacer la jugada, 1 para el primer jugador, -1 para el segundo jugador.

move es la jugada, desde 0 (esquina superior izquierda) hasta 8 (esquina inferior derecha).

### ttt.negamax(turn)

Evalúa el juego actual. 1 para victoria primer jugador, -1 para victoria segundo jugador, 0 para empate.

turn es el turno del juego, 1 para el primer jugador, -1 para el segundo jugador.

### ttt.getBestMove(turn)

Genera la mejor jugada para el jugador.

turn es el jugador a buscar la jugada, 1 para el primer jugador, -1 para el segundo jugador.

### ttt.perft(depth, turn)

Calcula la cantidad de nodos del juego.

depth es la profundidad máxima a buscar, el juego tiene un máximo de 9.

turn es el turno del jugador, 1 para el primer jugador, -1 para el segundo jugador.


Para mas información: [Post del proyecto](https://deybismelendez.github.io/2024/07/como-hacer-un-tres-en-raya.html)