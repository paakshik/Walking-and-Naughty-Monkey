var monk_im;
var monkey;
var ground;
var gravity = 0.3;
var score = 0;
var gameState = "PLAY";
function preload(){
    monk_im = loadAnimation(
        "sprite_0.png", "sprite_1.png","sprite_2.png", "sprite_3.png","sprite_4.png", "sprite_5.png","sprite_6.png", "sprite_7.png", "sprite_8.png");
   bas = loadImage("banana.png");     
   stones = loadImage("obstacle.png");
   backer = loadImage("backs.jpg");
}
function setup(){
    createCanvas(400,400);
    backs = createSprite(200,200);
    backs.addImage(backer);
monkey = createSprite(60,350,10,10);
monkey.addAnimation("running",monk_im);
monkey.scale = 0.1;
ground = createSprite(0,400,800,20);
ground.visible = 0;
bananaG = new Group();
stoneG = new Group();

}
function draw(){
    background("lightSkyblue");
    if (gameState === "PLAY"){
    text("Score: "+ score,300,10);
    
    if (keyDown("space")&&monkey.y > 250){
        monkey.velocityY = -2;
    }
    monkey.velocityY += gravity;
    monkey.collide(ground);
  
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
        gameState = "END";
    }
    text(mouseX+","+mouseY,mouseX,mouseY);
    }
      
    drawSprites();
}
