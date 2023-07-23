
import CreateElements, { CreateChessBoard } from "../security/create.element";
import UniqueHash from "../security/hashes";
import ChessBoard from "../ts/board";

export default function Render() {
  // Get Render's ID
  const ContainerDOM = document.getElementById('container') as HTMLDivElement | null;
    CreateElements();
    ContainerDOM?.appendChild(CreateChessBoard);   
 

  // Hash Applied
  window.addEventListener('DOMContentLoaded', () => {
    ContainerDOM?.setAttribute('id', UniqueHash());
  
  });

  // Render the JS Component
  if(ChessBoard){
    ChessBoard(CreateChessBoard);
  }
}
