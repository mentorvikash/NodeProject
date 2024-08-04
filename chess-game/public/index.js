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
                pieceElement.innerHTML = ""
                pieceElement.draggable = playerRole === colData.color;

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

            squarebox.addEventListener("dragend", (e) => {
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
    console.log(board)
}

renderBoard()

const handelMove = () => { }

const getPieceUnicode = () => { }
