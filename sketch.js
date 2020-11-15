var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, bananaGroup, stoneGroup ,obstacleGroup;
var score;
var banana; 
var stone;
var survivalTime = 0;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;
var gameOver;
var gameoverSound,jump,increase;
var bananaImage,obstacleImage,jungleImage;
var jungle;


function preload(){
  
//loading animation for moving the monkey 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

//loading the image for collied monkey
  monkey_collided = loadImage("sprite_0.png");
  
//loading image for banana
  bananaImage = loadImage("banana.png");
 
//loading image for the obstacles
  obstaceImage = loadImage("obstacle.png");

//loading image for gameover
 gameoverSound = loadSound("gameoverSound.mp3");

  
  jungleImage = loadImage("jungle.jpg");
  
//loading sound for jump
   jump = loadSound("jump.mp3");


   increase = loadSound("increasing.mp3");
}



function setup() {
  createCanvas(500,500);
  
  jungle = createSprite(250,250,250,250);
  jungle.addImage("jungle",jungleImage);
  jungle.scale = 1;
  
  
  
  
//creating monkey
  monkey = createSprite(60,400,20,20);
  monkey.addAnimation("monkey",monkey_running); 
  monkey.scale = 0.13;  
  
  
  
//creating the ground
  ground = createSprite(250,450,980,10); 

//creating groups for obstacles anda the bananas
  bananaGroup = new Group();
  stoneGroup = new Group();  


  
}


function draw() {
  background("white");

//colliding the monkey with tyhe ground
  monkey.collide(ground);  

  
//playstate
  if (gameState === PLAY){

  //moving the ground
    ground.velocityX = -16;

    
    ground.visible = false;
    
    
  //the monkey will jump when space is pressed  
    if (keyDown("space") && monkey.y >=100){
      monkey.velocityY = -12;
      jump.play();
    }  

  //grvity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8   

  //creating scrolling ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }  

  //calling function for food and obstacles  
    food();
    obstacles();  

  //displaying survival time
   survivalTime = survivalTime + Math.round(getFrameRate()/60);

  //distroying banana group when mokey is touching it
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+1;
   }  
    
  //entering into endState
    if (stoneGroup.isTouching(monkey)){
      gameState = END;
      gameoverSound.play();
      
    }
  
  jungle.velocityX = -3;

if (jungle.x < 0){
  
  jungle.x = jungle.width/2;
  
}
  
  
  
  
  
  } 
  

  switch (score){
    case 10 : monkey.scale = 0.15;
            break;
    case 20 : monkey.scale = 0.17;
            break;
    case 30 : monkey.scale = 0.19;
            break;
    case 40 : monkey.scale = 0.21;
  }
  
  
  
  
//drawing the sprites  
  drawSprites();  

//displaying score  
  stroke("black");
  textSize(27);
  fill("white")
  text("Score:" + score,320,50);

//displayig survival time
  stroke("black");
  textSize(27); 
  fill("white");
  text("Sruvival Time:" + survivalTime,50,50)
  
//endState
  if (gameState===END){

  //stoping the ground
    ground.velocityX = 0; 
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  
  //displaying text gameover
    textSize(40);
    text("Game Over",150,220);
    
  //adding image to the monkey and giving velocity
    monkey.addImage("monkey",monkey_collided);
    monkey.velocityY = 0;
    
  //diplaying text press r to restart
    textSize(20);
    text("press R to restart",180,250);
    
  //giving infintie lifetime to stone and banana
    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1)

    monkey.scale = 0.12;
    
    jungle.velocityX = 0;
    
  //restarting the game by pressing R
    if (keyDown("R")){
      reset();
    }
 }
}

//function for the food
function food(){

//displaying bananas at different positions
  if (frameCount % 80 ===0){
    banana = createSprite(400,400,20,20);
    banana.y = Math.round(random(250,310))
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -(6 + 3*score/10);
    banana.lifetime = 70;
    bananaGroup.add(banana);
  }
 }

//function for obstacle
function obstacles(){
  
//displaying bananas at different positions  
  if (frameCount % 300 ===0){
    stone = createSprite(400,425,20,20);
    stone.addImage(obstaceImage);
    stone.scale = 0.11;
    stone.velocityX = -(4 + 3*survivalTime/300);
    stone.lifetime = 70;
    stoneGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  score = 0;
  survivalTime = 0;
  monkey.addAnimation("monkey",monkey_running);
stoneGroup.destroyEach();
  bananaGroup.destroyEach();

}



