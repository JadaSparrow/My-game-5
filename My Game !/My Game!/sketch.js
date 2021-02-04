 var BasketballImage , BasketballCourtImage ,BastketballHoopRight;
 var BasketballHoopLImage,BasketballHoopRImage , BasketballHoopLeft;
 var PlayerOneImage , PlayerTwoImage;
 var PlayerOne , PlayerTwo , Basketball;
 var PlayerOneFlipped , PlayerTwoFlipped;
 var invGround;
 var playerOneScore , playerTwoScore;
 var playerOneTotal , playerTwoTotal;
playerOneScore = 0;
playerTwoScore = 0;
playerOneTotal = 0;
playerTwoTotal = 0;
var sec, timer;
var gameState;
gameState = "levelOne";
timer = World.seconds;

 function preload(){
    BasketballImage = loadImage("Basketball.png");
    BasketballCourtImage = loadImage("basketballCourt.jpg");
    BasketballHoopLImage = loadImage("basketballHoopLeft.png");
    BasketballHoopRImage = loadImage("BasketballHoopRight3.png");
    PlayerOneImage = loadImage("PlayerOnee-removebg-preview.png");
    PlayerTwoImage = loadImage("PlayerTwoo-removebg-preview.png");
    PlayerOneFlipped = loadImage("playerOneFlipped.png");
    PlayerTwoFlipped = loadImage("playerTwoFlipped.png");
 }
 function setup(){
    createCanvas(1000,700);
//groud
   invGround = createSprite(500,450,1000,10);
   invGround.visible = false;

//BasketballHoops
    BasketballHoopLeft = createSprite(70,250,10,10);
    BasketballHoopRight = createSprite(930,250,10,10);
    BasketballHoopRight.addImage(BasketballHoopRImage);
    BasketballHoopLeft.addImage(BasketballHoopLImage);
    BasketballHoopLeft.scale = 0.8;
    BasketballHoopRight.scale = 0.8;
    
//Players
    PlayerOne = createSprite(700,350,10,10);
    PlayerTwo = createSprite(300,350,10,10);
    PlayerOne.addImage("player1LookingL",PlayerOneImage);
    PlayerOne.addImage("player1LookingR",PlayerOneFlipped);
    PlayerTwo.addImage("player2LookingR" , PlayerTwoImage);
    PlayerTwo.addImage("player2LookingL" , PlayerTwoFlipped);
    PlayerOne.scale = 0.35;
//Creates Basketball
    Basketball = createSprite(500,350,10,10);
    Basketball.addImage(BasketballImage);
    Basketball.scale = 0.09;

//collider
    //PlayerOne.debug = true;
    //PlayerTwo.debug = true;
    //Basketball.debug = true;
    Basketball.setCollider("circle",0,0,300);
    PlayerTwo.setCollider("rectangle",0,0,150,180);
    PlayerOne.setCollider("rectangle",0,0,350,590);


   //BasketballHoopRight.debug = true;
   //BasketballHoopLeft.debug = true;
   BasketballHoopLeft.setCollider("rectangle",30,-150,150,140);
   BasketballHoopRight.setCollider("rectangle",-15,-150,150,140); 

 }
 function draw(){
    background(BasketballCourtImage);

    console.log(gameState)

 if(gameState === "levelOne" || gameState === "levelTwo"){
//Player moves

   if(keyDown(LEFT_ARROW) ){
      PlayerOne.x -= 4;
      PlayerOne.changeImage("player1LookingL",PlayerOneImage);
   }
   if(keyDown(RIGHT_ARROW) ){
      PlayerOne.x += 4;
      PlayerOne.changeImage("player1LookingR",PlayerOneFlipped);
   }
   if(keyDown("A") ){
      PlayerTwo.x -= 4;
      PlayerTwo.changeImage("player2LookingL" , PlayerTwoFlipped);
   }
   if(keyDown("D") ){
      PlayerTwo.x += 4;
      PlayerTwo.changeImage("player2LookingR" , PlayerTwoImage);
   }

//Shoots

 //Player one
    if(Basketball.isTouching(PlayerOne) ){
      if(keyDown(RIGHT_ARROW)){
         Basketball.velocityX = random(1,7);
      }
      if(keyDown(LEFT_ARROW)){
         Basketball.velocityX = random(-1,-7);
      }
       Basketball.velocityY = random(-1,-7);   
   }
    
//player two
    if(Basketball.isTouching(PlayerTwo) ){
      if(keyDown("D")){
         Basketball.velocityX = random(1,7);
      }
      if(keyDown("A")){
         Basketball.velocityX = random(-1,-7);
      }
      Basketball.velocityY = random(-1,-7);
   }
//edges
   edges = createEdgeSprites();
   Basketball.bounceOff(edges[2]);

//ground
   Basketball.bounceOff(invGround);


//return to center

   if(Basketball.isTouching(edges[1]) || Basketball.isTouching(edges[0])){
      Basketball.x = 500;
      Basketball.y = 350;
      Basketball.velocityX = 0;
      Basketball.velocityY = 0;
   }

//scoring

if(Basketball.isTouching(BasketballHoopRight)){
   playerTwoTotal = playerTwoTotal + playerTwoScore++;
   Basketball.x = 500;
   Basketball.y = 350;
   Basketball.velocityX = 0;
   Basketball.velocityY = 0;
   
}
if(Basketball.isTouching(BasketballHoopLeft)){
  playerOneTotal = playerOneTotal + playerOneScore++;
   Basketball.x = 500;
   Basketball.y = 350;
   Basketball.velocityX = 0;
   Basketball.velocityY = 0;
}
textSize(20);
fill("purple");
text("Player 1"+": " +playerOneScore,600,100);
text("Player 2"+": " +playerTwoScore,300,100);

if(gameState === "levelOne"){

//Levels
fill("blue");
text("Level one",460,20);
text("First player to reach 10 points wins level one !",360,50);
console.log(playerOneTotal);
console.log(playerTwoTotal);

//the winner of level one
   if(playerOneScore === 10 || playerTwoScore === 10){
     
      if(playerOneScore === 10){
         text("Player One has won level One !",400,150);
      } 
      else
         text("Player Two has won level One !",400,150);
      Basketball.velocityX = 0;
      Basketball.velocityY = 0;

      setTimeout(levelTwoStart, 5000);

     // if(World.seconds === timer + 10){
         //console.log("Hi");
      //   gameState = "levelTwoStart";
    //  }
   }
}
   if(gameState === "levelTwo"){
      fill("blue");
      text("Level Two",460,20);
      text("First player to reach 20 points wins level Two !",360,50);
   }

   if(playerOneScore === 20 || playerTwoScore === 20){
     
      if(playerOneScore === 2){
         text("Player One has won The game , Thanks for playing :)!",350,150);
      } 
      else
         text("Player Two has won The Game , Thanks for playinh :) !",350,150);
      Basketball.velocityX = 0;
      Basketball.velocityY = 0;
      
}


    drawSprites();
 }
 }et

 function levelTwoStart(){

//levelTwo
  // if(gameState === "levelTwoStart"){
   playerOneScore = 0;
   playerTwoScore = 0;
   gameState = "levelTwo";
//}
 }