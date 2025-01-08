const GameBored = document.querySelector('#GameBored');

const GamePieces = [
    Rook,Knight,Bishop,queen,king,Bishop,Knight,Rook,
    Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    Rook,Knight,Bishop,queen,king,Bishop,Knight,Rook,
    Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn,Bawn
];

GamePieces.forEach((GamePieces,i)=>{
    const pieces = document.createElement('div');
    pieces.classList.add('pieces');
    pieces.setAttribute('Picese-id',i);

    const row = Math.floor((63-i)/8)+1;
    if(row % 2 === 0){
        pieces.classList.add(i%2==0 ? 'red':'white');
    }
    else{
        pieces.classList.add(i%2==0 ? 'white':'red');
    }

    pieces.innerHTML = GamePieces;
    GameBored.appendChild(pieces);

    if(i <=15){
        const colorOfP = pieces.firstChild.firstChild
        colorOfP.classList.add('white');
    }
});