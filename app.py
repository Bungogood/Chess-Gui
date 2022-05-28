#
# Web based GUI for BBC chess engine
#

# packages

import logging
from flask import Flask
from flask import render_template
from flask import request

import chess
import chess.engine

engine = chess.engine.SimpleEngine.popen_uci('stockfish')

logger = logging.getLogger()
# logger.setLevel(os.environ.get("LOGLEVEL", "INFO"))
# logger.addHandler(handler)
"""
import asyncio

async with chess.engine.popen_uci('stockfish') as engine:
    board = chess.Board()
    result = await engine.play(board, chess.engine.Limit(time=0.1))
    board.push(result.move)


async def main() -> None:
    transport, engine = await chess.engine.popen_uci('stockfish')

    board = chess.Board()
    while not board.is_game_over():
        result = await engine.play(board, chess.engine.Limit(time=0.1))
        board.push(result.move)

    await engine.quit()

asyncio.set_event_loop_policy(chess.engine.EventLoopPolicy())
asyncio.run(main())
"""

# create web app instance
app = Flask(__name__)

# define root(index) route
@app.route('/')
def root():
    return render_template('test.html')

@app.route('/make_move', methods=['post'])
def make_move():
    fen = request.form.get("fen")
    print("fen: {}".format(fen))
    board = chess.Board(fen)
    print(board)
    result = engine.play(board, chess.engine.Limit(time=0.1))
    board.push(result.move)
    print("move: {}".format(result.move))
    return {"fen": board.fen(), "move": result.move}

# main driver
if __name__ == '__main__':
    # start HTTP server
    app.run(debug=True, threaded=True)