// VARIAVEIS

//Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 18;
let raioBolinha = diametroBolinha / 2

//Velocidade Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Raquete
let xRaquete = 10;
let yRaquete = 160;
let comprRaquete = 10;
let alturaRaquete = 80;

// Oponente
let xOponente = 600 - 20;
let yOponente = 400 - yRaquete;
let velocidadeYOponente;

// Placar
let pontos = 0;
let pontosOponente = 0;

// Sons
let trilha;
let raquetada;
let score;

var colisao = false;

// CANVAS
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

// SONS
function preload() {
  trilha = loadSound("sons/trilha.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
  score = loadSound("sons/ponto.mp3")
}

// BOLINHA
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentoBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinha() {
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raioBolinha > height - raioBolinha || yBolinha < 0) {
    velocidadeYBolinha *= -1;
  }
}

// RAQUETE
function mostraRaquete(x, y) {
  rect(x, y, comprRaquete, alturaRaquete)
}

// MOVIMENTO
function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 5;
  }
}

function movimentoOponente() {
  velocidadeYOponente = yBolinha - yOponente - comprRaquete / 2 - 40;
  yOponente += velocidadeYOponente
}

// COLISAO
function colisaoRaquete() {
  if (xBolinha - raioBolinha < xRaquete + comprRaquete &&
    yBolinha - raioBolinha < yRaquete + alturaRaquete &&
    yBolinha + raioBolinha > yRaquete) {
    velocidadeXBolinha *= -1;
  }
}

function colisaoBiblioteca(x, y) {
  colisao =
    collideRectCircle(x, y, comprRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if (colisao) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

// PLACAR
function incluiPlacar() {
  stroke(255);
  fill(color(0, 128, 128));
  rect(130, 10, 60, 20);
  rect(430, 10, 60, 20);
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text(pontos, 160, 26);
  text(pontosOponente, 460, 26);
}

function marcacaoPontos() {
  if (xBolinha > 592) {
    pontos++
    score.play();
  }
  if (xBolinha < 8) {
    pontosOponente++
    score.play();
  }
}

function draw() {
  background(0);
  // bolinha 
  mostraBolinha();
  movimentoBolinha();
  colisaoBolinha();
  //raquete
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentoRaquete();
  movimentoOponente();
  //colisao;
  colisaoBiblioteca(xRaquete, yRaquete);
  colisaoBiblioteca(xOponente, yOponente);
  //placar
  incluiPlacar();
  marcacaoPontos();
}