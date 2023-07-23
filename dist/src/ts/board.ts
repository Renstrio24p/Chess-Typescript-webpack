import Chess_function from "./functions/chessboard.function"

export default function ChessBoard(Board: HTMLDivElement){

    Board.innerHTML = (
        `
        <div class="chessBoard">        
        <!-- Add the pawn div element -->
        <div class="square white">
          <div class="piece rook" color="black"  >
              <img src="./src/images/Black-Rook.png" alt="Rook" >
            </div>
        </div>
        <div class="square black">
          <div class="piece knight" color="black" >
              <img src="./src/images/Black-Knight.png" alt="pawn" >
            </div>
        </div>
        <div class="square white">
          <div class="piece bishop" color="black" >
              <img src="./src/images/Black-Bishop.png" alt="pawn" >
            </div>
        </div>
        <div class="square black">
          <div class="piece queen" color="black" >
              <img src="./src/images/Black-Queen.png" alt="Queen" >
            </div>
        </div>
        <div class="square white">
          <div class="piece king" color="black" >
              <img src="./src/images/Black-King.png" alt="King" >
            </div>
        </div>
        <div class="square black">
          <div class="piece bishop" color="black" >
              <img src="./src/images/Black-Bishop.png" alt="Bishop" >
            </div>
        </div>
        <div class="square white">
          <div class="piece knight" color="black">
              <img src="./src/images/Black-Knight.png" alt="Knight" >
            </div>
        </div>
        <div class="square black">
          <div class="coordinate rank whiteText">8</div>
  
          <div class="piece rook" color="black" >
              <img src="./src/images/Black-Rook.png" alt="Rook" >
            </div>
        </div>
       <!-- ------------------------------------------------------------------------- -->
  
        <div class="square black">
          <div class="piece pawn" color="black"  >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
        <div class="square white">
          <div class="piece pawn" color="black" >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
        <div class="square black">
          <div class="piece pawn" color="black" >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
        <div class="square white">
          <div class="piece pawn" color="black" >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
        <div class="square black">
          <div class="piece pawn" color="black"  >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
        <div class="square white">
          <div class="piece pawn" color="black"  >
              <img src="./src/images/Black-Pawn.png" alt="pawn">
            </div>
  
        </div>
        <div class="square black">
          <div class="piece pawn" color="black"  >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
        <div class="square white">
          <div class="coordinate rank blackText">7</div>
  
          <div class="piece pawn" color="black"  >
              <img src="./src/images/Black-Pawn.png" alt="pawn" >
            </div>
  
        </div>
      <!-- ------------------------------------------------------------------------- -->
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black">
          <div class="coordinate rank whiteText">6</div>
  
        </div>
      <!-- ------------------------------------------------------------------------- -->
  
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white">
          <div class="coordinate rank blackText">5</div>
  
        </div>
      <!-- ------------------------------------------------------------------------- -->
  
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black">
          <div class="coordinate rank whiteText">4</div>
  
        </div>
      <!-- ------------------------------------------------------------------------- -->
  
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white"></div>
        <div class="square black"></div>
        <div class="square white">
          <div class="coordinate rank blackText">3</div>
        </div>
      <!-- ------------------------------------------------------------------------- -->
  
        <div class="square white">
          <div class="piece pawn" color="white" >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square black">
          <div class="piece pawn" color="white"  >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square white">
          <div class="piece pawn" color="white">
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square black">
          <div class="piece pawn" color="white" >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square white">
          <div class="piece pawn" color="white" >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square black">
          <div class="piece pawn" color="white" >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square white">
          <div class="piece pawn" color="white" >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
        <div class="square black">
          <div class="coordinate rank whiteText">2</div>
  
          <div class="piece pawn" color="white" >
              <img src="./src/images/White-Pawn.png" alt="pawn" >
            </div>
        </div>
      <!-- ------------------------------------------------------------------------- -->
  
        <div class="square black">
          <div class="coordinate whiteText">a</div>
  
          <div class="piece rook" color="white">
              <img src="./src/images/White-Rook.png" alt="Rook" >
             </div>
        </div>
        <div class="square white"> 
          <div class="coordinate blackText">b</div>
  
          <div class="piece knight" color="white">
              <img src="./src/images/White-Knight.png" alt="Knight" >
             </div>
      </div>
        <div class="square black">
          <div class="coordinate whiteText">c</div>
  
          <div class="piece bishop" color="white">
              <img src="./src/images/White-Bishop.png" alt="Bishop">
             </div>
        </div>
        <div class="square white">
          <div class="coordinate blackText">d</div>
  
          <div class="piece queen" color="white" >
              <img src="./src/images/White-Queen.png" alt="Queen" >
             </div>
        </div>
        <div class="square black">
          <div class="coordinate whiteText">e</div>
  
          <div class="piece king" color="white">
              <img src="./src/images/White-King.png" alt="King">
          </div>
        </div>
        <div class="square white">
          <div class="coordinate blackText">f</div>
          <div class="piece bishop" color="white" >
              <img src="./src/images/White-Bishop.png" alt="Bishop" >
             </div>
        </div>
        <div class="square black">
          <div class="coordinate whiteText">g</div>
  
          <div class="piece knight" color="white" >
              <img src="./src/images/White-Knight.png" alt="Knight">
             </div>
        </div>
        <div class="square white">
          <div class="coordinate rank blackText">1</div>
          <div class="coordinate blackText">h</div>     
          <div class="piece rook" color="white" >
              <img src="./src/images/White-Rook.png" alt="Rook" >
             </div>
        </div>
      </div>
      <div id="alert">
       
      </div>
        `
    )

    Chess_function();

}