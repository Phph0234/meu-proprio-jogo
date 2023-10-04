//Crie aqui as variáveis dos personagens e cenário
var fundo,fundoImg;
var nave,naveImg;
var astronauta1, astronauta2, astronauta3, astronautaImg;
var chao;
var meteoroImg;
var obstaclesGroup;
var vidas = 3;
var score = 0;
var gameOver,gamerOverImg
var PLAY = 0;
var END = 1;
var gameState  = PLAY


var vx = 0;
var g = 0.05;
var vy = 0;

function preload(){
  //Carregar imagens e sons
  fundoImg = loadImage("bg.png")
  naveImg = loadImage("nave.webp")
  astronautaImg = loadImage("astronauta.png")
  astronautaImg = loadImage("astronauta.png")
  gameOverImg = loadImage("Game-Over novo.png")
  meteoroImg = loadImage("meteoro.png")
}

function setup(){
  //Configurar jogo
  createCanvas(windowWidth,windowHeight);
  frameRate(80);


  //Crie sprites e adicione suas imagens
  nave = createSprite(83,50,30,30)
  nave.addImage(naveImg)
  nave.scale = 0.1
  nave.setCollider("rectangle",0,0,100,500)

  astronauta1 = createSprite(width-400,180,20,20)
  astronauta1.addImage(astronautaImg)
  astronauta1.scale = 0.1

  astronauta2 = createSprite(512,288,20,20)
  astronauta2.addImage(astronautaImg)
  astronauta2.scale = 0.1

  astronauta3 = createSprite(110,523,20,20)
  astronauta3.addImage(astronautaImg)
  astronauta3.scale = 0.1

  gameOver = createSprite(width/2-150,height/2)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 1
  gameOver.visible = false

  chao = createSprite(543,544,110,20)
  chao.shapeColor = "blue"

  obstaclesGroup = new Group()
}

function draw() {
  background("white");
  image(fundoImg,0,0);
  
  push();
  fill("white")
  textSize(20)
  text("Pontos: "+score,30,30)
  text(mouseX+" , "+mouseY, mouseX, mouseY)
  text("Velocidade vertical: "+Math.round(vy), 30, 60)
  text("Vidas: "+vidas,30,90)
  pop();
  
  if(gameState == PLAY){
    gerarMeteoros();

  if(nave.isTouching(astronauta1)){
    astronauta1.destroy();
    score = score+100
  }
  
  if(nave.isTouching(astronauta2)){
    astronauta2.destroy();
    score = score+100
  }
  
  if(nave.isTouching(astronauta3)){
    astronauta3.destroy();
    score = score+100
  }

  if(obstaclesGroup.isTouching(nave) && vidas>0){
    vidas = vidas-1
    nave.x = nave.x+80
  }
  
  if(vidas == 0){
    gameState = END
  }

  

  }

  if(gameState == END){
    gameOver.visible = true
  }
  
  //descida
  vy = vy+g;
  nave.position.y = nave.position.y+vy;
  if(nave.collide(chao)){
    vy = 0
  }

  nave.collide(chao)

  drawSprites();
    
}


function impulso(){
 vy = -1 
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    impulso();

  }
  if(keyCode == LEFT_ARROW){
    nave.x = nave.x-7

  }
  if(keyCode == RIGHT_ARROW){
    nave.x = nave.x+7

  }

}

function gerarMeteoros(){
  if (frameCount % 120 === 0){
    var obstacle = createSprite(random(20,900),-40,10,40);
    obstacle.velocityY = 4;
    obstacle.addImage(meteoroImg)
     
    
     //atribua dimensão e tempo de vida aos obstáculos          
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
    //adicione cada obstáculo ao grupo
     obstaclesGroup.add(obstacle);
  }
 }