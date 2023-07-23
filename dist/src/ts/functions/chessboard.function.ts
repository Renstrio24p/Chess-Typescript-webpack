export default function Chess_function(){
    let boardSquaresArray: any[] = [];
let moves: any[]=[];
const castlingSquares: string[]=["g1","g8","c1","c8"];
let isWhiteTurn: boolean = true;
let enPassantSquare: string="blank";
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

setupBoardSquares();
setupPieces();
fillBoardSquaresArray();

function fillBoardSquaresArray() {
  const boardSquares = document.getElementsByClassName("square");
  for (let i = 0; i < boardSquares.length; i++) {
    let row: number = 8 - Math.floor(i / 8);
    let column:string = String.fromCharCode(97 + (i % 8));
    let square: any = boardSquares[i];
    square.id = column + row;
    let color: string = "";
    let pieceType: string = "";
    let pieceId: string ="";
    if (square.querySelector(".piece")) {
        if(square.querySelector('.piece') !== null){
            color = square.querySelector(".piece").getAttribute("color") as any;
            pieceType = square.querySelector(".piece").classList[1];
            pieceId=square.querySelector(".piece").id;
        }
    } else {
      color = "blank";
      pieceType = "blank";
      pieceId ="blank";
    }
    let arrayElement = {
      squareId: square.id,
      pieceColor: color,
      pieceType: pieceType,
      pieceId:pieceId
    };
    boardSquaresArray.push(arrayElement);
  }
}
function updateBoardSquaresArray(
  currentSquareId: any,
  destinationSquareId: any,
  boardSquaresArray: any[],
) {
  let currentSquare = boardSquaresArray.find(
    (element) => element.squareId === currentSquareId
  );
  let destinationSquareElement = boardSquaresArray.find(
    (element) => element.squareId === destinationSquareId
  );
  let pieceColor = currentSquare.pieceColor;
  let pieceType =currentSquare.pieceType;
  let pieceId=currentSquare.pieceId;
  destinationSquareElement.pieceColor = pieceColor;
  destinationSquareElement.pieceType = pieceType;
  destinationSquareElement.pieceId=pieceId;
  currentSquare.pieceColor = "blank";
  currentSquare.pieceType = "blank";
  currentSquare.pieceId = "blank";
}
function makeMove(startingSquareId: any,destinationSquareId: any,pieceType: any,pieceColor: any,captured: any) {
  moves.push({
    from: startingSquareId,
    to: destinationSquareId,
    pieceType: pieceType,
    pieceColor:pieceColor,
    captured: captured,
});
}
function performCastling(piece: any,pieceColor: any,startingSquareId: any, destinationSquareId: any, boardSquaresArray: any[]) {
  let rookId: any, rookDestinationSquareId: any, checkSquareId: any;
  if (destinationSquareId == "g1") {
      rookId = "rookh1";
      rookDestinationSquareId = "f1";
      checkSquareId = "f1";
  } else if (destinationSquareId == "c1") {
      rookId = "rooka1";
      rookDestinationSquareId = "d1";
      checkSquareId = "d1";
  } else if (destinationSquareId == "g8") {
      rookId = "rookh8";
      rookDestinationSquareId = "f8";
      checkSquareId = "f8";
  } else if (destinationSquareId == "c8") {
      rookId = "rooka8";
      rookDestinationSquareId = "d8";
      checkSquareId = "d8";
  }
  if (isKingInCheck(checkSquareId, pieceColor, boardSquaresArray)) return;
  let rook: any = document.getElementById(rookId);
  let rookDestinationSquare: any = document.getElementById(rookDestinationSquareId);
  rookDestinationSquare.appendChild(rook);
  updateBoardSquaresArray(
      rook.id.slice(-2),
      rookDestinationSquare.id,
      boardSquaresArray
  );

    const destinationSquare=document.getElementById(destinationSquareId) as any;
    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
    updateBoardSquaresArray(
      startingSquareId,
      destinationSquareId,
      boardSquaresArray
    );
    let captured=false;
    makeMove(startingSquareId,
      destinationSquareId,"king",pieceColor,captured);
    checkForCheckMate();
    return;
}
function performEnPassant(piece: any,pieceColor: any,startingSquareId: any,destinationSquareId: any){

    let file = destinationSquareId[0];
    let rank = parseInt(destinationSquareId[1]);
    rank += (pieceColor === 'white') ? -1 : 1;
    let squareBehindId=file+rank;

    const squareBehindElement=document.getElementById(squareBehindId) as any;
    while (squareBehindElement.firstChild) {
      squareBehindElement.removeChild(squareBehindElement.firstChild);
    }
    
  let squareBehind = boardSquaresArray.find(
    (element) => element.squareId === squareBehindId
  );
  squareBehind.pieceColor = "blank";
  squareBehind.pieceType = "blank";
  squareBehind.pieceId = "blank";


  const destinationSquare=document.getElementById(destinationSquareId) as any;
  destinationSquare.appendChild(piece);
  isWhiteTurn = !isWhiteTurn;
  updateBoardSquaresArray(
    startingSquareId,
    destinationSquareId,
    boardSquaresArray
  );
  let captured=true;
  makeMove(startingSquareId,
    destinationSquareId,"pawn",pieceColor,captured)
  checkForCheckMate();
  return;
}


function deepCopyArray(array: any[]){
  let arrayCopy=array.map(element=>{
    return {...element}
  });
  return arrayCopy;
}

function setupBoardSquares() {
  for (let i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener("dragover", allowDrop);
    boardSquares[i].addEventListener("drop", drop);
    let row = 8 - Math.floor(i / 8);
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];
    square.id = column + row;
  }
}
function setupPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener("dragstart", drag);
    pieces[i].setAttribute("draggable", 'true');
    pieces[i].id =
      pieces[i].className.split(" ")[1] + pieces[i].parentElement!.id;
  }
  for (let i = 0; i < piecesImages.length; i++) {
    piecesImages[i].setAttribute("draggable", 'false');
  }
}
function allowDrop(ev: any) {
  ev.preventDefault();
}
function drag(ev: any) {
  const piece = ev.target;
  const pieceColor = piece.getAttribute("color");
  const pieceType = piece.classList[1];
  const pieceId=piece.id;
  if (
    (isWhiteTurn && pieceColor == "white") ||
    (!isWhiteTurn && pieceColor == "black")
  ) {
    const startingSquareId = piece.parentNode.id;
    ev.dataTransfer.setData("text", piece.id+"|"+startingSquareId);
    const pieceObject={pieceColor:pieceColor,pieceType:pieceType,pieceId:pieceId}
    let legalSquares= getPossibleMoves(startingSquareId, pieceObject,boardSquaresArray);
    let legalSquaresJson=JSON.stringify(legalSquares);
    ev.dataTransfer.setData("application/json",legalSquaresJson );

  } 
}

function drop(ev: any) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let [pieceId, startingSquareId] = data.split("|");
  let legalSquaresJson = ev.dataTransfer.getData("application/json");
  if (legalSquaresJson.length==0) return;
  let legalSquares = JSON.parse(legalSquaresJson);

  const piece = document.getElementById(pieceId);
  const pieceColor: any = piece!.getAttribute("color");
  const pieceType = piece!.classList[1];
  
  const destinationSquare = ev.currentTarget;
  let   destinationSquareId = destinationSquare.id;

  legalSquares=isMoveValidAgainstCheck(legalSquares,startingSquareId,pieceColor,pieceType);

  if (pieceType == "king") {
    let isCheck = isKingInCheck(
      destinationSquareId,
      pieceColor,
      boardSquaresArray
    );
    if (isCheck) return;
  }

    let squareContent=getPieceAtSquare(destinationSquareId,boardSquaresArray);
  if (
     squareContent.pieceColor == "blank" &&
     legalSquares.includes(destinationSquareId)
  ) {
    let isCheck=false;
    if(pieceType=="king") 
     isCheck=isKingInCheck(startingSquareId,pieceColor,
      boardSquaresArray
    );
    if(pieceType=="king" && !kingHasMoved(pieceColor) && castlingSquares.includes(destinationSquareId) && !isCheck ) {
      performCastling(piece,pieceColor,startingSquareId,destinationSquareId,boardSquaresArray);
      return;
    } 
    if(pieceType=="king" && !kingHasMoved(pieceColor) && castlingSquares.includes(destinationSquareId)&& isCheck) return;

    
    if(pieceType=="pawn" && enPassantSquare==destinationSquareId){
        performEnPassant(piece,pieceColor,startingSquareId,destinationSquareId);
        enPassantSquare="blank";
        return;
    }


    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
    updateBoardSquaresArray(
      startingSquareId,
      destinationSquareId,
      boardSquaresArray
    );
    let captured=false;
    makeMove(startingSquareId,
      destinationSquareId,pieceType,pieceColor,captured)
    checkForCheckMate();
    return;
  }
  if (
     squareContent.pieceColor!= "blank" &&
     legalSquares.includes(destinationSquareId)
  ) {

    while (destinationSquare.firstChild) {
      destinationSquare.removeChild(destinationSquare.firstChild);
    }
    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
    updateBoardSquaresArray(
      startingSquareId,
      destinationSquareId,
      boardSquaresArray
    );
    let captured=true;
    makeMove(startingSquareId,
      destinationSquareId,pieceType,pieceColor,captured)
    checkForCheckMate();
    return;
  }
}

function getPossibleMoves(startingSquareId: any, piece: any,boardSquaresArray: any[]) {
  const pieceColor = piece.pieceColor;
  const pieceType=piece.pieceType;
  let legalSquares=[];
  if (pieceType=="rook") {
    legalSquares=getRookMoves(startingSquareId, pieceColor,boardSquaresArray);
    return legalSquares;
  }
  if (pieceType=="bishop") {
    legalSquares=getBishopMoves(startingSquareId, pieceColor,boardSquaresArray);
    return legalSquares;
  }
  if (pieceType=="queen") { 
    legalSquares=getQueenMoves(startingSquareId, pieceColor,boardSquaresArray);
    return legalSquares;
  }
  if (pieceType=="knight") {
    legalSquares=getKnightMoves(startingSquareId, pieceColor,boardSquaresArray);
    return legalSquares;
  }

  if (pieceType=="pawn") {
    legalSquares=getPawnMoves(startingSquareId, pieceColor,boardSquaresArray);
    return legalSquares;
  }
  if (pieceType=="king") {
    legalSquares=getKingMoves(startingSquareId, pieceColor,boardSquaresArray);
    return legalSquares;
  }
}

function getPawnMoves(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  let diogonalSquares = checkPawnDiagonalCaptures(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let forwardSquares = checkPawnForwardMoves(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let legalSquares = [...diogonalSquares, ...forwardSquares];
  return legalSquares;
}

function checkPawnDiagonalCaptures(
  startingSquareId: any,
  pieceColor: any,
  boardSquaresArray: any[]
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let legalSquares = [];
  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;

  const direction = pieceColor == "white" ? 1 : -1;

  currentRank += direction;
  for (let i = -1; i <= 1; i += 2) {
    currentFile = String.fromCharCode(file.charCodeAt(0) + i);
    if (currentFile >= "a" && currentFile <= "h") {
      currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element: any) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent != pieceColor)
        legalSquares.push(currentSquareId);
        if (squareContent == "blank"){
          currentSquareId = currentFile + rank;
          let pawnStartingSquareRank=rankNumber+direction*2;
          let pawnStartingSquareId=currentFile+pawnStartingSquareRank;
        
          if(enPassantPossible(currentSquareId,pawnStartingSquareId,direction))
          {
            let pawnStartingSquareRank=rankNumber+direction;
            let enPassantSquare=currentFile+pawnStartingSquareRank;
            legalSquares.push(enPassantSquare);
          }
  
        }
    }
  }
  return legalSquares;
}
function enPassantPossible(currentSquareId: any,pawnStartingSquareId: any,direction: any){
  let file: any = currentSquareId.charAt(0);
  let rank: any = pawnStartingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  if(moves.length==0) return false;
  let lastMove= moves[moves.length-1];
  if(!(lastMove.to===currentSquareId && lastMove.from===pawnStartingSquareId && lastMove.pieceType=="pawn")) return false;
  file=currentSquareId[0];
  rank=parseInt(currentSquareId[1]);
  rank+=direction;
  let squareBehindId=file+rank;
  enPassantSquare=squareBehindId;
  return true;
}
function checkPawnForwardMoves(
  startingSquareId: any,
  pieceColor: any,
  boardSquaresArray: any[]
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let legalSquares: string[] = [];

  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;

  const direction = pieceColor == "white" ? 1 : -1;
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  let currentSquare = boardSquaresArray.find(
    (element: any) => element.squareId === currentSquareId
  );
  let squareContent = currentSquare.pieceColor;
  if (squareContent != "blank") return legalSquares;
  legalSquares.push(currentSquareId);
  if (!((rankNumber == 2 && pieceColor=="white" ) || (rankNumber ==7 && pieceColor=="black")) )return legalSquares;
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  currentSquare = boardSquaresArray.find(
    (element: any) => element.squareId === currentSquareId
  );
  squareContent = currentSquare.pieceColor;
  if (squareContent != "blank")
    if (squareContent != "blank") return legalSquares;
  legalSquares.push(currentSquareId);
  return legalSquares;
}

function getKnightMoves(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  const file = startingSquareId.charCodeAt(0) - 97;
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares: string[] = [];

  const moves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];
  moves.forEach((move) => {
    currentFile = file + move[0];
    currentRank = rankNumber + move[1];
    if (
      currentFile >= 0 &&
      currentFile <= 7 &&
      currentRank > 0 &&
      currentRank <= 8
    ) {
      let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element: any) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(String.fromCharCode(currentFile + 97) + currentRank);
    }
  });
  return legalSquares;
}
function getRookMoves(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  let moveToEighthRankSquares = moveToEighthRank(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToFirstRankSquares = moveToFirstRank(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToAFileSquares = moveToAFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToHFileSquares = moveToHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let legalSquares = [
    ...moveToEighthRankSquares,
    ...moveToFirstRankSquares,
    ...moveToAFileSquares,
    ...moveToHFileSquares,
  ];
  return legalSquares;
}

function getBishopMoves(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  let moveToEighthRankHFileSquares = moveToEighthRankHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToEighthRankAFileSquares = moveToEighthRankAFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToFirstRankHFileSquares = moveToFirstRankHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToFirstRankAFileSquares = moveToFirstRankAFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let legalSquares = [
    ...moveToEighthRankHFileSquares,
    ...moveToEighthRankAFileSquares,
    ...moveToFirstRankHFileSquares,
    ...moveToFirstRankAFileSquares,
  ];
  return legalSquares;
}
function getQueenMoves(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  let bishopMoves = getBishopMoves(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let rookMoves = getRookMoves(startingSquareId, pieceColor, boardSquaresArray);
  let legalSquares = [...bishopMoves, ...rookMoves];
  return legalSquares;
}

function getKingMoves(startingSquareId: any, pieceColor: any,boardSquaresArray: any[]) {
  const file = startingSquareId.charCodeAt(0) - 97; // get the second character of the string
  const rank = startingSquareId.charAt(1); // get the second character of the string
  const rankNumber = parseInt(rank); // convert the second character to a number
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares: string[]=[];
  const moves = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
    [1, 0],
  ];

  moves.forEach((move) => {
    let currentFile = file + move[0];
    let currentRank = rankNumber + move[1];

    if (
      currentFile >= 0 &&
      currentFile <= 7 &&
      currentRank > 0 &&
      currentRank <= 8
    ) {
      let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
      let currentSquare=boardSquaresArray.find((element: any)=>element.squareId===currentSquareId);
      let squareContent=currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor) {
        return legalSquares;
      }
      legalSquares.push(String.fromCharCode(currentFile + 97) + currentRank);
    }
  });
  let shortCastleSquare=isShortCastlePossible(pieceColor,boardSquaresArray);
  let longCastleSquare=isLongCastlePossible(pieceColor,boardSquaresArray);
  if(shortCastleSquare!="blank")legalSquares.push(shortCastleSquare);
  if(longCastleSquare!="blank")legalSquares.push(longCastleSquare);


  return legalSquares;
}

interface Square {
    squareId: string;
    pieceColor: string;
    // Add other properties if needed...
  }


  function isShortCastlePossible(pieceColor:string, boardSquaresArray: any[]) {
    let rank = pieceColor === "white" ? "1" : "8";
    let fSquare: any  = boardSquaresArray.find(element => element.squareId === `f${rank}`);
    let gSquare: any  = boardSquaresArray.find(element => element.squareId === `g${rank}`);
  
    // Check if the squares are not undefined before accessing their properties
    if (!fSquare || !gSquare || fSquare.pieceColor !== "blank" || gSquare.pieceColor !== "blank" || kingHasMoved(pieceColor) || rookHasMoved(pieceColor, (`h${rank}`) as any)) {
      return "blank";
    }
  
    return `g${rank}`;
  }
  
  function isLongCastlePossible(pieceColor: any, boardSquaresArray: Square[]) {
    let rank = pieceColor === "white" ? "1" : "8";
    let dSquare: Square | undefined = boardSquaresArray.find(element => element.squareId === `d${rank}`);
    let cSquare: Square | undefined = boardSquaresArray.find(element => element.squareId === `c${rank}`);
    let bSquare: Square | undefined = boardSquaresArray.find(element => element.squareId === `b${rank}`);
  
    if (!dSquare || !cSquare || !bSquare || dSquare.pieceColor !== "blank" || cSquare.pieceColor !== "blank" || bSquare.pieceColor !== "blank" || kingHasMoved(pieceColor) || rookHasMoved(pieceColor, (`a${rank}`) as any)) {
      return "blank";
    }
  
    return `c${rank}`;
  }
  
  
function kingHasMoved(pieceColor: any){
  let result=moves.find((element)=>(element.pieceColor===pieceColor)&&(element.pieceType==="king"));
  if(result!=undefined) return true;
  return false;
}
function rookHasMoved(pieceColor: any,startingSquareId: any[]){
  let result=moves.find((element)=>(element.pieceColor===pieceColor)&&(element.pieceType==="rook")&&(element.from===startingSquareId));
  if(result!=undefined) return true;
  return false;
}



function moveToEighthRank(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalSquares = [];
  while (currentRank != 8) {
    currentRank++;
    let currentSquareId = file + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element: any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToFirstRank(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalSquares = [];
  while (currentRank != 1) {
    currentRank--;
    let currentSquareId = file + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element: any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToAFile(startingSquareId: any, pieceColor: any, boardSquaresArray: any) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  let legalSquares = [];

  while (currentFile != "a") {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) - 1
    );
    let currentSquareId = currentFile + rank;
    let currentSquare = boardSquaresArray.find(
      (element: any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToHFile(startingSquareId: any, pieceColor: any, boardSquaresArray: any[]) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  let legalSquares = [];
  while (currentFile != "h") {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) + 1
    );
    let currentSquareId = currentFile + rank;
    let currentSquare = boardSquaresArray.find(
      (element: any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToEighthRankAFile(startingSquareId: any,pieceColor: any,boardSquaresArray: any[]) {
  const file=startingSquareId.charAt(0);
  const rank=startingSquareId.charAt(1);
  const rankNumber =parseInt(rank);
  let currentFile=file;
  let currentRank=rankNumber;
  let legalSquares=[];
  while(!(currentFile=="a" || currentRank==8)){
    currentFile=String.fromCharCode(
      currentFile.charCodeAt(currentFile.length-1)-1
    );
    currentRank++;
    let currentSquareId=currentFile+currentRank;
    let currentSquare = boardSquaresArray.find(
      (element: any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if(squareContent!="blank" && squareContent==pieceColor)
      return legalSquares;
      legalSquares.push(currentSquareId);
      if(squareContent!="blank" && squareContent!=pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToEighthRankHFile(startingSquareId:any,pieceColor: any,boardSquaresArray: any[]) {
  const file=startingSquareId.charAt(0);
  const rank=startingSquareId.charAt(1);
  const rankNumber =parseInt(rank);
  let currentFile=file;
  let currentRank=rankNumber;
  let legalSquares=[];
  while(!(currentFile=="h" || currentRank==8)){
    currentFile=String.fromCharCode(
      currentFile.charCodeAt(currentFile.length-1)+1
    );
    currentRank++;
    let currentSquareId=currentFile+currentRank;
    let currentSquare = boardSquaresArray.find(
      (element:any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if(squareContent!="blank" && squareContent==pieceColor)
      return legalSquares;
      legalSquares.push(currentSquareId);
      if(squareContent!="blank" && squareContent!=pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToFirstRankAFile(startingSquareId: any,pieceColor: any,boardSquaresArray:any[]) {
  const file=startingSquareId.charAt(0);
  const rank=startingSquareId.charAt(1);
  const rankNumber =parseInt(rank);
  let currentFile=file;
  let currentRank=rankNumber;
  let legalSquares=[];
  while(!(currentFile=="a" || currentRank==1)){
    currentFile=String.fromCharCode(
      currentFile.charCodeAt(currentFile.length-1)-1
    );
    currentRank--;
    let currentSquareId=currentFile+currentRank;
    let currentSquare = boardSquaresArray.find(
      (element:any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if(squareContent!="blank" && squareContent==pieceColor)
      return legalSquares;
      legalSquares.push(currentSquareId);
      if(squareContent!="blank" && squareContent!=pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToFirstRankHFile(startingSquareId: any,pieceColor: any,boardSquaresArray: any[]) {
  const file=startingSquareId.charAt(0);
  const rank=startingSquareId.charAt(1);
  const rankNumber =parseInt(rank);
  let currentFile=file;
  let currentRank=rankNumber;
  let legalSquares=[];
  while(!(currentFile=="h" || currentRank==1)){
    currentFile=String.fromCharCode(
      currentFile.charCodeAt(currentFile.length-1)+1
    );
    currentRank--;
    let currentSquareId=currentFile+currentRank;
    let currentSquare = boardSquaresArray.find(
      (element: any) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if(squareContent!="blank" && squareContent==pieceColor)
      return legalSquares;
      legalSquares.push(currentSquareId);
      if(squareContent!="blank" && squareContent!=pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function getPieceAtSquare(squareId: number, boardSquaresArray: any[]) {
  let currentSquare = boardSquaresArray.find(
    (element:any) => element.squareId === squareId
  );
  const color = currentSquare.pieceColor;
  const pieceType = currentSquare.pieceType;
  const pieceId=currentSquare.pieceId;
  return { pieceColor: color, pieceType: pieceType,pieceId:pieceId};
}

function isKingInCheck(squareId: any, pieceColor: any, boardSquaresArray: any[]) {
    let rookMoves = getRookMoves(squareId, pieceColor, boardSquaresArray);
    for (let rookSquareId of rookMoves) {
      let rookPiece = getPieceAtSquare(rookSquareId, boardSquaresArray);
      if ((rookPiece.pieceType === "rook" || rookPiece.pieceType === "queen") && pieceColor !== rookPiece.pieceColor) {
        return true;
      }
      
    }
  
    let bishopMoves = getBishopMoves(squareId, pieceColor, boardSquaresArray);
    for (let bishopSquareId of bishopMoves) {
      let bishopPiece = getPieceAtSquare(bishopSquareId, boardSquaresArray);
      if ((bishopPiece.pieceType === "bishop" || bishopPiece.pieceType === "queen") && pieceColor !== bishopPiece.pieceColor) {
        return true;
      }
    }
  
    let knightMoves: any[] = getKnightMoves(squareId, pieceColor, boardSquaresArray);
    for (let knightSquareId of knightMoves) {
      let knightPiece = getPieceAtSquare(knightSquareId, boardSquaresArray);
      if (knightPiece.pieceType === "knight" && pieceColor !== knightPiece.pieceColor) {
        return true;
      }
    }
  
    let pawnCaptures = checkPawnDiagonalCaptures(squareId, pieceColor, boardSquaresArray);
    for (let captureSquareId of pawnCaptures) {
      let capturePiece = getPieceAtSquare(captureSquareId, boardSquaresArray);
      if (capturePiece.pieceType === "pawn" && pieceColor !== capturePiece.pieceColor) {
        return true;
      }
    }
  
    let kingMoves: any[] = getKingMoves(squareId, pieceColor, boardSquaresArray);
    for (let kingSquareId of kingMoves) {
      let kingPiece = getPieceAtSquare(kingSquareId, boardSquaresArray);
      if (kingPiece.pieceType === "king" && pieceColor !== kingPiece.pieceColor) {
        return true;
      }
    }
  
    return false;
  }

  
  
function getkingLastMove(color: any){
  let kingLastMove = moves.findLast(element => element.pieceType === "king" && element.pieceColor === color);
  if(kingLastMove==undefined)
    return isWhiteTurn ? "e1" : "e8";
    return kingLastMove.to;
}
function isMoveValidAgainstCheck(legalSquares: any,startingSquareId: any,pieceColor: any,pieceType: any){
  let kingSquare=isWhiteTurn ? getkingLastMove("white") : getkingLastMove("black");
  let boardSquaresArrayCopy=deepCopyArray(boardSquaresArray);
  let legalSquaresCopy = legalSquares.slice();
  legalSquaresCopy.forEach((element: any)=>{
    let destinationId=element;
    boardSquaresArrayCopy=deepCopyArray(boardSquaresArray);
    updateBoardSquaresArray(startingSquareId,destinationId,boardSquaresArrayCopy);
    if(pieceType!="king" && isKingInCheck(kingSquare,pieceColor,boardSquaresArrayCopy)){
      legalSquares=legalSquares.filter((item: any)=>item!=destinationId);
    }
    if(pieceType=="king" && isKingInCheck(destinationId,pieceColor,boardSquaresArrayCopy)){
      legalSquares=legalSquares.filter((item: any)=>item!=destinationId);
    }
  })
  return legalSquares;
}

function checkForCheckMate(){
  let kingSquare=isWhiteTurn ? getkingLastMove("white") : getkingLastMove("black");
  let pieceColor=isWhiteTurn ? "white" : "black";
  let boardSquaresArrayCopy=deepCopyArray(boardSquaresArray);
  let kingIsCheck=isKingInCheck(kingSquare,pieceColor,boardSquaresArrayCopy);
  if(!kingIsCheck)return;
  let possibleMoves=getAllPossibleMoves(boardSquaresArrayCopy,pieceColor);
  if(possibleMoves.length>0) return;
  let message="";
  isWhiteTurn ? (message="Black Wins!") : (message="White Wins!");
  showAlert(message);
}
function getAllPossibleMoves(squaresArray: any[],color: any) {
  return squaresArray
  .filter((square)=>square.pieceColor===color).
  flatMap((square)=>{
    const {pieceColor,pieceType,pieceId} = getPieceAtSquare(square.squareId,squaresArray);
    if(pieceId==="blank") return [];
    let squaresArrayCopy=deepCopyArray(squaresArray);
    const pieceObject={pieceColor:pieceColor,pieceType:pieceType,pieceId:pieceId}
    let legalSquares=getPossibleMoves(square.squareId,pieceObject,squaresArrayCopy);
    legalSquares=isMoveValidAgainstCheck(legalSquares,square.squareId,pieceColor,pieceType);
    return legalSquares;
  })
}
function showAlert(message: any) {
  const alert: any= document.getElementById("alert");
  alert.innerHTML=message;
  alert.style.display="block";

  setTimeout(function(){
     alert.style.display="none";
  },3000);
}

}