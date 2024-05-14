let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;
const maxScore = 5; // Pontuação máxima para vencer o jogo

function setup() {
  createCanvas(800, 400);
  
  // Inicializar a bola no centro da tela
  ball = new Ball(width / 2, height / 2);
  
  // Inicializar as raquetes
  leftPaddle = new Paddle(20, height / 2);
  rightPaddle = new Paddle(width - 20, height / 2);
}

function draw() {
  background(0);
  
  // Desenhar as raquetes
  leftPaddle.show();
  rightPaddle.show();
  
  // Desenhar a bola
  ball.show();
  
  // Mostrar a pontuação
  showScores();
  
  // Movimentar as raquetes com base no teclado
  leftPaddle.update( 87, 83); // Controles para o jogador da esquerda
  rightPaddle.update(UP_ARROW, DOWN_ARROW); // Controles para o jogador da direita
  
  // Movimentar a bola
  ball.update(leftPaddle, rightPaddle);
  
  // Verificar colisões
  ball.checkCollision(leftPaddle, rightPaddle);
  
  // Verificar pontuação
  checkScore();
}

function showScores() {
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

function checkScore() {
  if (ball.isOutOfBounds()) {
    if (ball.x < 0) {
      // Ponto para o jogador da direita
      rightScore++;
    } else {
      // Ponto para o jogador da esquerda
      leftScore++;
    }
    
    // Reiniciar a posição da bola
    ball.reset();
  }
  
  // Verificar se alguém venceu o jogo
  if (leftScore >= maxScore || rightScore >= maxScore) {
    textSize(15);
    textAlign(CENTER);
    fill(255);
    if (leftScore >= maxScore) {
      text("Jogador Esquerda Venceu!", width / 2, height / 2);
    } else {
      text("Jogador Direita Venceu!", width / 2, height / 2);
    }
    noLoop(); // Parar o loop de desenho
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.speedX = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.speedY = random(3, 5) * (random() > 0.5 ? 1 : -1);
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  update(leftPaddle, rightPaddle) {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Colisão com as paredes superior e inferior
    if (this.y < this.radius || this.y > height - this.radius) {
      this.speedY *= -1;
    }
  }
  
  checkCollision(leftPaddle, rightPaddle) {
    // Colisão com as raquetes
    if (this.x - this.radius <= leftPaddle.x + leftPaddle.width &&
        this.y >= leftPaddle.y - leftPaddle.height / 2 &&
        this.y <= leftPaddle.y + leftPaddle.height / 2) {
      this.speedX *= -1;
    }
    
    if (this.x + this.radius >= rightPaddle.x - rightPaddle.width &&
        this.y >= rightPaddle.y - rightPaddle.height / 2 &&
        this.y <= rightPaddle.y + rightPaddle.height / 2) {
      this.speedX *= -1;
    }
  }
  
  isOutOfBounds() {
    return this.x < 0 || this.x > width;
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.speedX = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.speedY = random(3, 5) * (random() > 0.5 ? 1 : -1);
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 80;
    this.speed = 8;
  }
  
  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update(upKey, downKey) {
    // Movimentar a raquete com base nas teclas pressionadas
    if (keyIsDown(upKey) && this.y > this.height / 2) {
      this.y -= this.speed;
    }
    if (keyIsDown(downKey) && this.y < height - this.height / 2) {
      this.y += this.speed;
    }
  }
}
