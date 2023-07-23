import { cx } from "../start";

// exporting Create Div Element
export const CreateChessBoard = document.createElement('div');

const CreateElements = () => {
          // adding class and Id of the created div
          CreateChessBoard.classList.add(`${cx('chessboard-container')}`);
          CreateChessBoard.id = 'chessboard-container';   
}

export default CreateElements;