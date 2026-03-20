let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

document.querySelector("#move").addEventListener('click', () =>{
    gameLoop()
   
});

const BALL_SIZE = 5;
let ballPosition = {
    x: 20,
    y: 30
};

let xSpeed = 4;
let ySpeed = 2;

function draw() {
    ctx.fillStyle = "darkblue";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE)

}

draw();

function update() {
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
     document.querySelector("#x").textContent = ballPosition.x
    document.querySelector("#y").textContent = ballPosition.y
}

function checkCollision(){
    let ball = {
        left: ballPosition.x,
        right:ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    }

    if(ball.left < 0 || ball.right > width){
        xSpeed = -xSpeed;
    }
    if(ball.top < 0 || ball.bottom > height){
        ySpeed = -ySpeed;
    }
}
// Typical Game loop shape

/**
 *   1.  Clear canvas
      2.  Draw image
      3.  Get player input
      4.  Update state: Meaning -> to move objects to their new positions
      5.  Check collisions
      6.  Wait a short time
      7.  Repeat
 */

function gameLoop() {
    draw();
    update();
    checkCollision();

    // setTimeout(gameLoop, 100)
}
// Call this function again after a timeout 
gameLoop();