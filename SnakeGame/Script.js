let Box = document.querySelector('#GameBored');
let GameBox = Box.getContext('2d');



const WIDTH = Box.width;
const HEIGHT = Box.height;
const UNIT = 20;
let Move = false;
const Snake = [
    {x:UNIT * 3,y:0},
    {x:UNIT * 2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0},
];
let count = 0;

let SnakeGrow = false;
window.addEventListener('keydown',()=>{
    Move = true;
    document.querySelector('.Start').innerHTML = "";
});
let Xvel = 20;
let Yvel = 0;

let foodX = 0;
let foodY = 0;

let BigFood = 40;
let BigX;
let BigY;

let Bcount = 0;

window.addEventListener('keydown',KeyFunction);

GameStart();

function GameStart(){
    GameBox.fillStyle ='white';
    GameBox.fillRect(0,0,WIDTH,HEIGHT);
    SnakeFood();
    DisplayFood();
    RunTheGame();
}




function SnakeFood(){
    foodX = Math.floor(Math.random() * WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random() * WIDTH/UNIT)*UNIT;

}

function DisplayFood(){
    GameBox.fillStyle = 'red';
    GameBox.fillRect(foodX,foodY,UNIT,UNIT);
    // if(Bcount==5){
    //     DisplayBigFood();
    // }
    // console.log(Bcount);
}

function DisplayBigFood(){
    GameBox.fillRect = 'red';
    GameBox.fillStyle(135,320,40,40);
}


function CleanTheBorad(){
    GameBox.fillStyle ='white';
    GameBox.fillRect(0,0,WIDTH,HEIGHT);
}


function DisplaySnake(){
    GameBox.fillStyle = 'black';
    GameBox.strokeStyle = 'white';
    Snake.forEach((SnakeParts)=>{
        GameBox.fillRect(SnakeParts.x,SnakeParts.y,
            UNIT,UNIT
        )
        GameBox.strokeRect(SnakeParts.x,SnakeParts.y,
            UNIT,UNIT
        )
    });
}

function MoveSnake(){
    const head = {x:Snake[0].x+Xvel,
        y:Snake[0].y+Yvel
    };

    Snake.forEach((snakeHead)=>{
        if(snakeHead.x == head.x && snakeHead.y == head.y){
            Move = false;
            document.querySelector('#GameOver').innerHTML = 
            'Game Over !! <br> Loser';
        }

    });

    console.log(head);
    if(SnakeGrow!=true){
        Snake.unshift(head);
        Snake.pop();
    }
    else{
        Snake.unshift(head);
        SnakeFood();
        count++;
        Bcount++;
        console.log(count);
        SnakeGrow = false;
        document.querySelector('.points').innerHTML = count;
    }

}

function checkTheGame(){
    if(foodX==Snake[1].x && foodY==Snake[1].y){
        SnakeGrow = true;
    }
    if(Snake[1].x < -1){
        Snake[0].x = 420;
    }
    if(Snake[1].y < -1){
        Snake[0].y = 420;
    }
    if(Snake[0].x > 420){
        Snake[0].x = 0;
    }
    if(Snake[0].y > 420){
        Snake[0].y = 0;
    }
}

function RunTheGame(){
    setTimeout(()=>{
        CleanTheBorad();
        DisplayFood();
        DisplaySnake();
        if(Move){
            MoveSnake();
        }
        checkTheGame();
        RunTheGame();
    },100);
}


function KeyFunction(event){
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    switch (true) {
        case(event.keyCode==LEFT && Xvel!=20):
            Xvel = -20;
            Yvel = 0;
            break;
        case(event.keyCode==RIGHT && Xvel!= -20):
            Xvel = 20;
            Yvel = 0;
            break;
        case(event.keyCode==DOWN && Yvel!=-20):
            Xvel = 0;
            Yvel = 20;
            break;
        case(event.keyCode==UP && Yvel!=20) :
            Xvel = 0;
            Yvel = -20;
            break;
        
        default:
            break;
    }

}