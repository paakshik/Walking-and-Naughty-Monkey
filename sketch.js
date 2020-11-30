var monk_im;
var monkey;
var ground;
var gravity = 0.3;
var score = 0;
var gameState = "PLAY";
var time = 0;
var promp;
var loca = "NO";
var lives = 3;
function preload(){
    monk_im = loadAnimation(
        "sprite_0.png", "sprite_1.png","sprite_2.png", "sprite_3.png","sprite_4.png", "sprite_5.png","sprite_6.png", "sprite_7.png", "sprite_8.png");
   bas = loadImage("banana.png");     
   stones = loadImage("obstacle.png");
   backer = loadImage("backs.jpg");
 
   monkeys = loadAnimation("sprite_0.png");
  
}
function setup(){
    createCanvas(400,400);
    backs = createSprite(200,200);
    backs.addImage(backer);
    backs.visible =0;

monkey = createSprite(60,350,10,10);
monkey.addAnimation("running",monk_im);
monkey.scale = 0.1;
monkey.visible = 0;

monkey.addAnimation("stop",monkeys)
ground = createSprite(0,400,800,20);
ground.visible = 0;


bananaG = new Group();
stoneG = new Group();
if (!localStorage["score"]){
localStorage["score"] = 0;
}

if (!localStorage["Highest_score"]){
    localStorage["Highest_score"] = 0;
    }

}
function draw(){
    background("lightSkyblue");
     monkey.collide(ground);
     drawSprites();
   
  
    if (gameState === "PLAY"){
        time = time + Math.round(getFrameRate()/60);
        monkey.visible = 1;
        backs.visible = 1;
        
    
    if (keyDown("space")&&monkey.y > 250){
        monkey.velocityY = -2;
    }
    monkey.velocityY += gravity;
   
    if (World.frameCount % 150 === 0){
 var banana = createSprite(312,random(340,350),10,10);
 banana.addImage(bas);
 banana.velocityX = -2;
banana.scale = 0.1;
bananaG.add(banana);
    }
    if (World.frameCount % 100 === 0){
var stone = createSprite(360,380,10,10);
stone.velocityX = -2;
stone.addImage(stones)
stone.scale = 0.08;
stoneG.add(stone);
}
    if (bananaG.isTouching(monkey)){
        bananaG.destroyEach();

        score = score+1;
      
        
    }

    if (stoneG.isTouching(monkey)){
 lives = lives - 1;

stoneG.destroyEach();
if (lives === 0){
    gameState = "LOSE";
}
       

    }

   fill("white");
   textFont("Georgia");
   noStroke();
   textSize(20)
    text("Score: "+score,300,50);
   text("LIVES: "+ lives,200,50)
text("Survival Time: "+ time,20,50)

    }
 
if (gameState === "LOSE"){
localStorage["score"] = score;
ground.velocityX = 0;
stoneG.setVelocityEach(0,0);
bananaG.setVelocityEach(0,0);
bananaG.setLifetimeEach(-300)
stoneG.setLifetimeEach(-300);
monkey.changeAnimation("stop");

monkey.velocityY = 0;
fill("green");
noStroke;
text("GAME OVER")
rect(50,50,300,300)

fill("ghostWhite");
textFont("Georgia");
noStroke();
textSize(20);
text("GAME OVER!!",150,100)
text("SCORE: "+ score,150,200);
text("HIGHEST SURVIVAL: "+ localStorage["Highest_score"],100,220);
text("PRESS Y key to restart",50,280)
if (keyDown("Y")){
    gameState = "PLAY";
    time = 0;
    lives = 3;
    score = 0;
    monkey.changeAnimation("running");
    stoneG.destroyEach();
    bananaG.destroyEach();
}
if (localStorage["Highest_score"] < time){
    localStorage["Highest_score"] = time;
   loca = "PLAT";
    
}
if (loca === "PLAT"){
    text("'Congratulations!!'",120,140)
  
}
}   

}
