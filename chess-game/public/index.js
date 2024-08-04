const socket = io();
const chess = new Chess();
const chessBoard = document.querySelector(".chessboard")

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    // to insure just before game state complete board is clean
    chessBoard.innerHTML = "";
    board.forEach((rowData, rowIndex) => {
        rowData.forEach((colData, colIndex) => {
            const squarebox = document.createElement('div')
            squarebox.classList.add("square", (rowIndex + colIndex) % 2 === 0 ? "light" : "dark")
            squarebox.dataset.row = rowIndex;
            squarebox.dataset.col = colIndex;

            if (colData) {
                const pieceElement = document.createElement('div')
                pieceElement.classList.add("piece", colData.color == 'w' ? "white" : "black")
                pieceElement.innerHTML = getPieceUnicode(colData)
                pieceElement.draggable = playerRole === colData.color;

                // pieceElement.addEventListener('click', () => {
                //     alert("i got clicked")
                // })

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: colIndex }
                        e.dataTransfer.setData("text/plain", "")
                    }
                })

                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                })

                squarebox.appendChild(pieceElement)
            }

            squarebox.addEventListener("dragover", (e) => {
                e.preventDefault();
            })

            squarebox.addEventListener("drop", (e) => {
                e.preventDefault();

                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squarebox.dataset.row),
                        col: parseInt(squarebox.dataset.col)
                    }
                    handelMove(sourceSquare, targetSource)
                }
            })
            chessBoard.appendChild(squarebox)
        })
    })

    if (playerRole == 'b') {
        chessBoard.classList.add("flipped")
    } else {
        chessBoard.classList.remove("flipped")

    }
}


const handelMove = (source, target) => {
    console.log({ source, target })
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q'
    }
    socket.emit('move', move)
}

function getPieceUnicode(piece) {
    const unicodePieces = {
        'p': '♙',
        'r': '♖',
        'n': '♘',
        'b': '♗',
        "k": '♔',
        "q": "♕",
        'P': '♟',
        'R': '♜',
        'N': '♞',
        'B': '♝',
        'Q': '♛',
        'K': '♚'
    }
    return unicodePieces[piece.type] || ""
}

socket.on('player-role', (role) => {
    console.log({ role })
    playerRole = role;
    renderBoard()
})

socket.on('spaculator', () => {
    playerRole = null;
    renderBoard()
})

socket.on('boardState', (playerMove) => {
    console.log({ playerMove })
    chess.load(playerMove)
    renderBoard();
})

socket.on('move', (playerMove) => {
    chess.move(playerMove)
    renderBoard();
})

renderBoard()
