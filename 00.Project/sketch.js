let bullet = [];
let bulletcheck = [];
let enemy = [];
let enemyNum = 5;
let enemycheck = [];
let angle1;
let angle2;
let angle3;
let angle4;
let angle5;
let angle6;
let tri = [];
let tri2 = [];
let startTime;
let bulletNum = 10;
let bossx;
let bossy;
let bossd;
let bossHP = 15;
let disboss;

function preload(){
  imgsheep = loadImage('media/sheep.png');
  imgleftsheep = loadImage('media/leftsheep.png');
  imgrightsheep = loadImage('media/rightsheep.png');
  imglogo = loadImage('media/logo.png');
  imgstory = loadImage('media/story.png');
  imgend = loadImage('media/ending.png');
  imggameover = loadImage('media/gameover.png');
  imgrestart = loadImage('media/restart.png');
  imgnextstage = loadImage('media/nextstage.png');
  imgboss = loadImage('media/boss.gif');
  imgclearpose = loadImage('media/clearpose.png');
  imgclear = loadImage('media/clear.png');
  backmusic = loadSound('media/background.mp3');
  imgback1 = loadImage ('media/back.png');
  imgenemy = loadImage('media/flower.png');
  imgback2 = loadImage('media/back.jpg');
  imgwood = loadImage('media/wood.jpg');
  imgstart = loadImage('media/start.jpg');
  imgstoryback = loadImage('media/storyback.jpg');
  imgnext = loadImage('media/nextstage.jpg')
  imggover = loadImage('media/gover.jpg');
  imgcleargame = loadImage('media/cleargame.jpg')
}

let x = 50 // 도형의 시작점
let y = 10 // 도형의 시작점
let d = 100 // 도형의 크기
let velocityX = 1 // 주인공이 움직임
let velocityY = 1
let s = 0 // y 값이 점점 증가

let n; // 장애물 개수
let dis; // 장애물 간의 거리
let dish;
let speed;
let speedY;


function setup() {

  backmusic.play(); // 루프 걸어주는거
  backmusic.setVolume(0.1); // 볼륨 바꾸는거


  createCanvas(500, 700);  


  for(let i = 0; i<bulletNum; i++)
    { 
      bullet[i] = new Circle();
      bulletcheck[i] = 0;
    }

    for(let i = 0; i<bulletNum; i++)
    { 
      enemy[i] = new CircleEnemy();
    } 


    mode = 0;
}

function touchStarted() {
  getAudioContext().resume();
}

function draw() {

  Timecheck();

  if(mode == 0) {
    background(imgstart);
    image(imglogo, 50, 100, 400, 300)

    fill(255);

    push();
    textSize(27);
    textStyle(BOLD);
    text('pressed mouse everywhere or \n automatically pass', 40, 650);
    pop();

    push();
    textSize(25)
    text(' [control] \n jump : Enter \n shot : z \n - If you meet boss, \n you should you must defeat \n the boss to clear it. \n - This manual disappears \n after 7 seconds.  ' , 30, 400)
    pop();

    if(mouseIsPressed || NowTime > 7) {
      mode = 1;
    }

  }

  if(mode == 1){
    background(imgstoryback);

    image(imgstory, 40, 10)

    // 설명
    fill(0);
    textSize(25);
    textStyle(BOLD);
    text(' pressed key s or Automatically skips \n after 3 seconds', 10, 650)
    
    // 수동으로 넘어가기
    if(keyIsPressed && key == 's') {
      mode = 2;
    }
    
    //자동으로 넘어가기
    if(NowTime > 11 ) {
      mode = 2;
    }

  }

  if(mode == 2) {

    // 1단계 스테이지
    n = 500 // 장애물 개수
    dis = 300 // 장애물 간의 거리
    dish = dis/2
    speed = 6
    speedY = 0.4

    background(imgback1);
    push();
    fill(180, 145, 115);
    rect(0, 0, 50, height)
    rect(450, 0, width, height);
    pop();

    bulletCheck();
    enemyCheck();
    collienemybullet();
    colliMeEnemy();
    colliMeTriangle();

    // 삼각형 장애물
    for(i = 1; i < 100; i++) {
      fill(180, 145, 115)
      obstacle(i);
    } 
      s = s + 1
    
    // 캐릭터 x,y 제한 -> 벽을 넘어가면 안되기 때문에
    push(); 
    x = constrain(x, 75, 425)
    y = constrain(y, 0, 360)
    imageMode(CENTER);

    // 벽에 닿았을 경우 캐릭터 모습이 바뀜
    if(x < 80) {
      image(imgleftsheep, x, y, d, d);
    }
    else if(x > 400){
      image(imgrightsheep, x, y, d, d);
    } else {
      image(imgsheep, x, y, d, d);
    }

    // 캐릭터 방향 전환
    x = x + speed * velocityX;
    y = y + speedY
    pop();

    if (keyIsPressed && keyCode == 32) {
      if(x > 425 || x < 75) {
      velocityX *= - 1
      }
    }

    // 다음 스테이지를 넘어가기 위한 시간 제한
    if(NowTime > 34) {
      mode = 3;
    }

    // 시간 표시
    TimeText();
  }

  if(mode == 3) {

    background(imgnext);
    image(imgnextstage, -10, 100, 500, 600);
    if(NowTime> 36) {
      mode = 4;
    }
  }

  if(mode == 4) {

    // 2단계 스테이지  -> 단계와 반복
    n = 500 // 장애물 개수
    dis = 180 // 장애물 간의 거리
    dish = dis/2
    speed = 7  
    speedY = 0.6
   
    background(imgback2);

    push();
    fill(119, 79, 47);
    rect(0, 0, 50, height)
    rect(450, 0, width, height)
    pop();

    bulletCheck();
    enemyCheck();
    collienemybullet();
    colliMeEnemy();
    colliMeTriangle();


    for(i = 13; i < 100; i++) {
      fill(119, 79, 47);
      obstacle(i);
    } 
      s = s + 1
    
    push(); 
    x = constrain(x, 75, 425)
    y = constrain(y, 0, 360)
    imageMode(CENTER);

    if(x < 80) {
      image(imgleftsheep, x, y, d, d);
    }
    else if(x > 400){
      image(imgrightsheep, x, y, d, d);
    } else {
      image(imgsheep, x, y, d, d);
    }

    x = x + speed * velocityX;
    y = y + speedY
    pop();

    if (keyIsPressed && keyCode == 32) {
      if(x > 425 || x < 75) {
       velocityX *= - 1
     }
    }

    // boss 설정

    bossx = 250;
    bossy = 600;
    bossd = 400;
    
    push();
    imageMode(CENTER);
    image(imgboss , bossx, bossy, bossd, bossd);
    pop();
    bossy -= 0.1
    colliBossEnemy();
    
    //보스 HP
    push();
    textStyle(BOLD);
    fill(255, 0, 0);
    textSize(30);
    text('bossHP : ' + bossHP, 320 , 50 );
    pop();

  }

  if(mode == 5) {
    background(imggover);
    image(imggameover, 10, 100, 500, 350);
    image(imgrestart, 60, 450, 400, 200 );
    
  }

  if(mode == 6) {
    background(imgcleargame);
    imageMode(CENTER);
    image(imgclear, 250, 200, 400, 300);
    image(imgclearpose, 250, 500, 400, 300);
  }

}

function bulletCheck() {
  for(let i = 0; i<bulletNum; i++)
  { 
    bullet[i].display();
    bullet[i].move();
    
  }            
  for(let i = 0; i<bulletNum; i++)
  { 
    if(bullet[i].y > 700)
    {
      bulletcheck[i] = 0;
    }
  } 
}

function enemyCheck() {
  if(mode == 2 || mode == 4) {
  let i = 0;
  while(i<enemyNum)
  {
    enemy[i].display();
    enemy[i].move1();
    i++;
  }
}
  for(let i = 0; i<enemyNum; i++)
  { 
    if(enemy[i].eY < 0)
    {
      enemy[i].reset();
    }
  } 
}


function keyPressed() {
  if( key == 'z'){     
    for(let i = 0; i<bulletNum; i++)
    {
      if(bulletcheck[i] == 0)
      {
        bullet[i].x = x;
        bullet[i].y = y;
        bulletcheck[i] = 1;
        break;
      }
    }        
  }    
}

function collienemybullet() {

  for(let i = 0; i<enemyNum; i++)
  { 
    for(let j = 0; j<bulletNum; j++)
    {
      let betweendis;
      if(bulletcheck[j] == 1) 
      {
        betweendis = dist(bullet[j].x, bullet[j].y, enemy[i].eX, enemy[i].eY);
      }
      if(betweendis < 35)
      {
        //bullet[j].reset();
        enemy[i].eX += 400;
      }
    }
  } 

}

function colliMeEnemy()
{
  for(let i = 0; i<enemyNum; i++)
  { 
    let disE = 100;
    disE = dist(x, y, enemy[i].eX, enemy[i].eY);
   if(disE < d/2)
    {
      mode = 5;
      enemy[i].delet();
    }   
  }
}

function colliMeTriangle() {
 distance = dist();
}

//삼각형 장애물
function obstacle(i) {

  triangle(50, i*dis-s, 50, i*dis+30-s, 50+100, i*dis+15-s);
  triangle(450, i*dis+dish-s, 450, i*dis+30+dish-s, 450-100, i*dis+15+dish-s);
  
  distance1 = dist(x, y , 100, i*dis-s + 15);
  distance2 = dist(x, y , 400, i*dis+dish-s + 15);

  if(distance1 < 40) {
    GameOver();
  }
  if(distance2 < 40) {
    GameOver();
  }
}

function GameOver() {
  mode = 5;
}

function Timecheck() {

  getTime = millis();
  
  NowTime = int(getTime/1000);
}

function TimeText() {
  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  fill(255, 0, 0);
  text('time :', 45, 35);
  text(NowTime, 100, 37);
}

function colliBossEnemy() {

  for(let j = 0; j<bulletNum; j++)
  {
    if(bulletcheck[j] == 1) 
    {
      disboss = dist(bullet[j].x, bullet[j].y,bossx, bossy);
      if(disboss < 8) {
        bossHP--; 
      }
    }
    if(bossHP < 0){
      End();
    }
  }
  print(bossHP)
}

function End() {

  mode = 6;

}
