const ChessBored = document.querySelector('#GameBored');

console.log(ChessBored);

const Pieces = [
    Rook,Knight,Bishop,queen,king,Bishop,Knight,Rook,
    Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,
    Rook,Knight,Bishop,queen,king,Bishop,Knight,Rook
];



    Pieces.forEach((piece,i)=>{
        const ChessP = document.createElement('div');
        ChessP.setAttribute('Piece-id',i);
        ChessP.setAttribute('draggable',true);
        ChessP.classList.add('pieceBack');

        let row = Math.floor((63-i)/8)+1;

        if(row%2==0){
            ChessP.classList.add(i%2==0 ? 'blue':'green');
        }
        else{
            ChessP.classList.add(i%2==0 ? 'green':'blue');
        }

        ChessP.innerHTML = piece;
        ChessBored.append(ChessP);

        if(i <=15){
            ChessP.firstChild.classList.add('white');
        }

        if(i>=48){
    
            ChessP.classList.add('black');
        }
    })

const MoveElement = document.querySelectorAll('.pieceBack');

MoveElement.forEach((Pieces)=>{
    Pieces.addEventListener('dragstart',DragStart);
    Pieces.addEventListener('dragover',DragOver);
    Pieces.addEventListener('drop',DropPicec);
})



let ElementPiece;
let ElementId;
function DragStart(event){
    ElementPiece = event.target.firstChild;
    console.log(ElementPiece);
};

function DragOver(event){
    event.preventDefault();
}

function DropPicec(event){
    
    event.target.firstChild.remove();
    event.target.append(ElementPiece);
    // console.log(event.target)
}