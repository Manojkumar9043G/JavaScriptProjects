const ChessBored = document.querySelector('#Gamebored');
const Player = document.querySelector('#player');
const information = document.querySelector('#info-display');
const Winer = document.querySelector('.Winer');
let PlayerGo = 'white';
Player.textContent = "white";
let width  = 8;
// console.log(Player);

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


function CreateGameBorad(){
    Pieces.forEach((Pieces,i)=>{
        const square = document.createElement('div');
        square.classList.add('Square');
        square.innerHTML = Pieces;
        square.firstChild && square.firstChild.setAttribute('draggable',true);
        square.setAttribute('Piece-id',i);
        
        let row = Math.floor((63-i)/8)+1;
        if(row%2==0){
            square.classList.add(i%2==0 ? 'white1':'brown');
        }
        else{
            square.classList.add(i%2==0 ? 'brown':'white1');
        }
        if(i>=48){
            square.firstChild.firstChild.classList.add('black');
        }
        if(i<=15){
            square.firstChild.firstChild.classList.add('white');
        }
        ChessBored.append(square);
    })
}


CreateGameBorad();

const MoveElement = document.querySelectorAll('#Gamebored .Square');

// console.log(MoveElement);

MoveElement.forEach((Pieces)=>{
    Pieces.addEventListener('dragstart',DragStart);
    Pieces.addEventListener('dragover',DragOver);
    Pieces.addEventListener('drop',DropPices);
})

let ElementID;
let  FullElement;

function DragStart(e){
    ElementID = e.target.parentNode.getAttribute('Piece-id');
    FullElement = e.target;
}

function DragOver(e){
    e.preventDefault();
}

function DropPices(e){
    e.stopPropagation();
    const taken = e.target.classList.contains('piece');
    const correctGo = FullElement.firstChild.classList.contains(PlayerGo);
    const valid = CheckIfValid(e.target);
    const opponetGo = PlayerGo=='white' ? 'black':'white';
    const takenByOppen = e.target.firstChild && e.target.firstChild.classList.contains(opponetGo);
    console.log(e.target);
    if(correctGo){
        if(takenByOppen && valid){
            e.target.parentNode.append(FullElement);
            e.target.remove();
            // e.target.append(FullElement);
            
            CheckThePlayerWin();
            changePlayer();
            return
        }
        if(taken && !takenByOppen){
            information.textContent  = "You Can Go There";
            setTimeout(()=>information.textContent  = "",2000);
            return
        }
        if(valid){
            e.target.append(FullElement)

            CheckThePlayerWin();
            changePlayer()
            return
        }

    }
}

function changePlayer(){
    if(PlayerGo=='black'){
        PlayerGo = 'white';
        Player.textContent = "white";
        RevertIds();
    }else{
        PlayerGo = 'black';
        Player.textContent = 'black';
        ReverseIds();
    }
}

function ReverseIds(){
    const AllSquare = document.querySelectorAll('.Square');
    AllSquare.forEach((Pieces,i)=>
        Pieces.setAttribute('Piece-id',(width*width - 1)-i));
}

function RevertIds(){
    const AllSquare = document.querySelectorAll('.Square');
    AllSquare.forEach((Pieces,i)=>
        Pieces.setAttribute('Piece-id',i));
}

function CheckIfValid(target){
    let StartId = Number(ElementID);
    let TargetId = Number(target.getAttribute('Piece-id') ||Number(target.parentNode.getAttribute('Piece-id')));
    let Piece = FullElement.id;
    console.log("S ",StartId);
    console.log("T ",TargetId);
    console.log("Ooooo ",StartId + width);
    const BawnStart = [8,9,10,11,12,13,14,15];
    // console.log("Ooooo",document.querySelector(`[Piece-id="${StartId + width - 1}"]`));
    switch (Piece) {
        case "Bawn":
            if(
                BawnStart.includes(StartId) && StartId+width*2 ===TargetId ||
                StartId+width===TargetId ||
                StartId + width - 1 === TargetId && document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild ||
                StartId + width + 1 === TargetId && document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild 

            ){
                return true;
            }
            break;
        case "Knight":
            if(
                StartId + width * 2 - 1 === TargetId ||
                StartId + width * 2 + 1 === TargetId ||
                StartId + width - 2 === TargetId ||
                StartId + width + 2 === TargetId  ||
                StartId - width * 2 - 1 === TargetId ||
                StartId - width * 2 + 1 === TargetId ||
                StartId - width - 2 === TargetId ||
                StartId - width + 2 === TargetId 
            ){
                return true;
            }
            break;
        case "bishop":
            if(
                StartId + width + 1 === TargetId ||
                StartId + width  * 2 + 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild ||
                StartId + width  * 3 + 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild ||
                StartId + width  * 4 + 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild ||
                StartId + width  * 5 + 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 + 4}"]`).firstChild ||
                StartId + width  * 6 + 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 + 5}"]`).firstChild||
                StartId + width  * 7 + 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 + 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 6 + 6}"]`).firstChild ||

                StartId + width - 1 === TargetId ||
                StartId + width  * 2 - 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild ||
                StartId + width  * 3 - 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild ||
                StartId + width  * 4 - 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild ||
                StartId + width  * 5 - 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 - 4}"]`).firstChild ||
                StartId + width  * 6 - 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 - 5}"]`).firstChild||
                StartId + width  * 7 - 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 - 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 6 - 6}"]`).firstChild ||

                StartId - width - 1 === TargetId ||
                StartId - width  * 2 - 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild ||
                StartId - width  * 3 - 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild ||
                StartId - width  * 4 - 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild ||
                StartId - width  * 5 - 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 - 4}"]`).firstChild ||
                StartId - width  * 6 - 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 - 5}"]`).firstChild||
                StartId - width  * 7 - 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 - 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 6 - 6}"]`).firstChild ||

                StartId - width + 1 === TargetId ||
                StartId - width  * 2 + 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild ||
                StartId - width  * 3 + 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild ||
                StartId - width  * 4 + 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild ||
                StartId - width  * 5 + 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 + 4}"]`).firstChild ||
                StartId - width  * 6 + 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 + 5}"]`).firstChild||
                StartId - width  * 7 + 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 + 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 6 + 6}"]`).firstChild
            ){
                return true;
            }
            break;
            case "Rook":
                if(
                    StartId + width === TargetId ||
                    StartId + width * 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild ||
                    StartId + width * 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild ||
                    StartId + width * 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild ||
                    StartId + width * 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + width * 4}"]`).firstChild ||
                    StartId + width * 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 5}"]`).firstChild ||
                    StartId + width * 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 6}"]`).firstChild ||

                    StartId - width === TargetId ||
                    StartId - width * 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild ||
                    StartId - width * 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild ||
                    StartId - width * 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild ||
                    StartId - width * 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - width * 4}"]`).firstChild ||
                    StartId - width * 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 5}"]`).firstChild ||
                    StartId - width * 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 6}"]`).firstChild ||

                    StartId + 1 === TargetId ||
                    StartId + 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild ||
                    StartId + 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild ||
                    StartId + 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild ||
                    StartId + 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + 4}"]`).firstChild ||
                    StartId + 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 5}"]`).firstChild ||
                    StartId + 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 6}"]`).firstChild ||

                    StartId - 1 === TargetId ||
                    StartId - 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild ||
                    StartId - 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild ||
                    StartId - 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild ||
                    StartId - 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - 4}"]`).firstChild ||
                    StartId - 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 5}"]`).firstChild ||
                    StartId - 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 6}"]`).firstChild


                ){
                    return true;
                }
                break;
                case "queen":
                    if(
                        StartId + width === TargetId ||
                        StartId + width * 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild ||
                        StartId + width * 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild ||
                        StartId + width * 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild ||
                        StartId + width * 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + width * 4}"]`).firstChild ||
                        StartId + width * 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 5}"]`).firstChild ||
                        StartId + width * 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width * 6}"]`).firstChild ||

                        StartId - width === TargetId ||
                        StartId - width * 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild ||
                        StartId - width * 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild ||
                        StartId - width * 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild ||
                        StartId - width * 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - width * 4}"]`).firstChild ||
                        StartId - width * 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 5}"]`).firstChild ||
                        StartId - width * 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - width}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - width * 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - width * 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width * 6}"]`).firstChild ||

                        StartId + 1 === TargetId ||
                        StartId + 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild ||
                        StartId + 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild ||
                        StartId + 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild ||
                        StartId + 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + 4}"]`).firstChild ||
                        StartId + 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 5}"]`).firstChild ||
                        StartId + 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + 6}"]`).firstChild ||

                        StartId - 1 === TargetId ||
                        StartId - 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild ||
                        StartId - 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild ||
                        StartId - 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild ||
                        StartId - 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - 4}"]`).firstChild ||
                        StartId - 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 5}"]`).firstChild ||
                        StartId - 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - 1}"]`).firstChild &&  !document.querySelector(`[Piece-id="${StartId - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 3}"]`).firstChild  && !document.querySelector(`[Piece-id="${StartId - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - 6}"]`).firstChild ||

                        StartId + width + 1 === TargetId ||
                        StartId + width  * 2 + 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild ||
                        StartId + width  * 3 + 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild ||
                        StartId + width  * 4 + 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild ||
                        StartId + width  * 5 + 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 + 4}"]`).firstChild ||
                        StartId + width  * 6 + 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 + 5}"]`).firstChild||
                        StartId + width  * 7 + 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 + 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 6 + 6}"]`).firstChild ||
        
                        StartId + width - 1 === TargetId ||
                        StartId + width  * 2 - 2 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild ||
                        StartId + width  * 3 - 3 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild ||
                        StartId + width  * 4 - 4 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild ||
                        StartId + width  * 5 - 5 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 - 4}"]`).firstChild ||
                        StartId + width  * 6 - 6 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 - 5}"]`).firstChild||
                        StartId + width  * 7 - 7 === TargetId && !document.querySelector(`[Piece-id="${StartId + width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 5 - 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId + width  * 6 - 6}"]`).firstChild ||
        
                        StartId - width - 1 === TargetId ||
                        StartId - width  * 2 - 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild ||
                        StartId - width  * 3 - 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild ||
                        StartId - width  * 4 - 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild ||
                        StartId - width  * 5 - 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 - 4}"]`).firstChild ||
                        StartId - width  * 6 - 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 - 5}"]`).firstChild||
                        StartId - width  * 7 - 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - width - 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 - 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 - 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 - 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 - 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 6 - 6}"]`).firstChild ||
        
                        StartId - width + 1 === TargetId ||
                        StartId - width  * 2 + 2 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild ||
                        StartId - width  * 3 + 3 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild ||
                        StartId - width  * 4 + 4 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild ||
                        StartId - width  * 5 + 5 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 + 4}"]`).firstChild ||
                        StartId - width  * 6 + 6 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 + 5}"]`).firstChild||
                        StartId - width  * 7 + 7 === TargetId && !document.querySelector(`[Piece-id="${StartId - width + 1}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 2 + 2}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 3 + 3}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 4 + 4}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 5 + 5}"]`).firstChild && !document.querySelector(`[Piece-id="${StartId - width  * 6 + 6}"]`).firstChild
                    ){
                        return true;
                    }
                    break;
                    case "king" :
                        if(
                            StartId + width === TargetId ||
                            StartId - width === TargetId ||
                            StartId + 1 === TargetId ||
                            StartId - 1 === TargetId ||
                            StartId + width + 1 === TargetId ||
                            StartId + width - 1 === TargetId ||
                            StartId - width - 1 === TargetId ||
                            StartId - width + 1 === TargetId 
                        ){
                            return true;
                        }
        default:
            break;
    }
}

// const Square = document.querySelectorAll('.Square');
//         Square.forEach(Square=>{
//             console.log(Square.firstChild);
//         })
function CheckThePlayerWin(){
    const kings = Array.from(document.querySelectorAll('#king'));
    if(!kings.some((kings)=>kings.firstChild.classList.contains('white'))){
        Winer.innerHTML = 'Player Black Wins';
        const Square = document.querySelectorAll('.Square');
        Square.forEach(Square=>{
            Square.firstChild && Square.firstChild.setAttribute('draggable',false);
        })
    }

    if(!kings.some((kings)=>kings.firstChild.classList.contains('black'))){
        Winer.innerHTML = 'Player White Wins';
        const Square = document.querySelectorAll('.Square');
        Square.forEach(Square=>{
            Square.firstChild && Square.firstChild.setAttribute('draggable',false);
        })
    }
}