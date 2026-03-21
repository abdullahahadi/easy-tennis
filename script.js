let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;


const BALL_SIZE = 5;
let ballPosition = {
    x: 20,
    y: 30
};

let xSpeed = 4;
let ySpeed = 2;

const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener('mousemove', (e) => {
    rightPaddleTop = e.y - canvas.offsetTop; // this way the value will be based on the distance of the mouse from the top of the canvas, instead of the top of the page
})

function draw() {
    // Fill the canvas with darkblue 
    ctx.fillStyle = "darkblue";
    ctx.fillRect(0, 0, width, height);

    // Everything else will be white 
    ctx.fillStyle = "white";

    // Draw the ball 
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE)

    // Draw the paddles 
    ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT)
    ctx.fillRect(width - PADDLE_WIDTH - PADDLE_OFFSET, rightPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT)
}

draw();

function update() {
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
}

function checkPaddleCollision(ball, paddle) {
    return (
        ball.left < paddle.right &&
        ball.right > paddle.left &&
        ball.top < paddle.bottom &&
        ball.bottom > paddle.top
    )
}

function checkCollision() {
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    }

    //  defining the four edges of the two paddles

    let leftPaddle = {
        left: PADDLE_OFFSET,
        right: PADDLE_OFFSET + PADDLE_WIDTH,
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
    };
    let rightPaddle = {
        left: width - PADDLE_WIDTH - PADDLE_OFFSET,
        right: width - PADDLE_OFFSET,
        top: rightPaddleTop,
        bottom: rightPaddleTop + PADDLE_HEIGHT
    };

    if(checkPaddleCollision(ball, leftPaddle)){
        // Left paddle collision happened
        xSpeed = Math.abs(xSpeed)
    }

    if(checkPaddleCollision(ball, rightPaddle)){
        // Right paddle collision happened 
        xSpeed = -Math.abs(xSpeed); 
    }

    if (ball.left < 0 || ball.right > width) {
        xSpeed = -xSpeed;
    }
    if (ball.top < 0 || ball.bottom > height) {
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

    setTimeout(gameLoop, 30)
}
// Call this function again after a timeout 
gameLoop();