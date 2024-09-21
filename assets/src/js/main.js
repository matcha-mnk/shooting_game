import { getKeyBind } from './keyBinder.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const spriteNames = ['player_1', 'enemy_1'];
const effectNames = ['player_shot_1'];
const backgroundNames = ['space_1'];
const uiNames = ['letter_box'];

let oldCountHit = 0;//リファクタしてね
let oldCountShot = 0;
let isDownKey = false;

//Game Manager プロパティ
const gameManager = {
  timeCounter: 0,
  playerShots: [],
  enemies: [],
  stars: [],
  spriteImage: {},
  effectImage: {},
  backgroundImage: {},
  uiImage: {},
  isGameOver: true,
  playerLevel: 0,
  life: 0,
  bombs: 0,
  score: 0,
  count: 0,
  timer: null
};

//ゲーム内シーンの状態
const gameSceneState = {
  titleScene: false,
  keyBindingScene: false,
  gameScene: false,

  changeScene(targetScene){
    this.titleScene = false;
    this.keyBindingScene = false;
    this.gameScene = false;

    if(targetScene in this){
      this[targetScene] = true;
    }else{
      console.error('不正なScene名');
    }
  }
}

//シーンチェンジのテスト
//sceneChangeTest();
function sceneChangeTest(){
  if(
    gameSceneState.titleScene === false
    && gameSceneState.keyBindingScene === false
    && gameSceneState.gameScene === false
  );//正常
  else console.error('ERROR-sceneChangeTest');

  gameSceneState.changeScene('keyBindingScene');
  if(
    gameSceneState.titleScene === false
    && gameSceneState.keyBindingScene === true
    && gameSceneState.gameScene === false
  );//正常
  else console.error('ERROR-sceneChangeTest')

  gameSceneState.changeScene('titleScene');
  if(
    gameSceneState.titleScene === true
    && gameSceneState.keyBindingScene === false
    && gameSceneState.gameScene === false
  );//正常
  else console.error('ERROR-sceneChangeTest')

  gameSceneState.changeScene('gameScene');
  if(
    gameSceneState.titleScene === false
    && gameSceneState.keyBindingScene === false
    && gameSceneState.gameScene === true
  );//正常
  else console.error('ERROR-sceneChangeTest');

  console.log('sceneChangeTest finished');
}

//画像読み込み関数
function imageLoader(imgNames, imgType){
  return new Promise((resolve) => {
    let imageLoadCounter = 0;
    let img={};

    for(const imageName of imgNames){
      const imagePath = `assets/images/${imgType}${imageName}.png`;
      img[imageName] = new Image();
      img[imageName].src = imagePath;
      img[imageName].onload = () => {
        imageLoadCounter += 1;
        if(imageLoadCounter === imgNames.length){
          //console.log(`${imgType}:画像ロード完了`);
          resolve(img);
        }
      };
      img[imageName].onerror = () => {
        console.error(`${imgType}:${imagePath}の画像ロード失敗`);
      };
    }
  })
}

assetLoader();

//画像ロード
async function assetLoader(){
  const [spriteImage, effectImage, backgroundImage, uiImage] = await Promise.all([
    imageLoader(spriteNames, 'sprite-'),
    imageLoader(effectNames, 'effect-'),
    imageLoader(backgroundNames, 'background-'),
    imageLoader(uiNames, 'ui-')
  ]);
  gameManager.spriteImage = spriteImage;
  gameManager.effectImage = effectImage;
  gameManager.backgroundImage = backgroundImage;
  gameManager.uiImage = uiImage;

  init();
}

//初期化
function init(){
  gameManager.timeCounter = 0;
  gameManager.enemies = [];
  gameManager.isGameOver = false;
  gameManager.life = 5;
  gameManager.bombs = 3;
  gameManager.count = 0;
  gameManager.score = 0;

  gameSceneState.changeScene('titleScene');

  //Player初期設定
  createPlayer();
  gameManager.player.moveSpeed = 10;
  gameManager.player.x = canvas.width / 2;
  gameManager.player.y = canvas.height / 2 + 220;

  gameManager.timer = setInterval(ticker, 30);//カウント開始
}

//Update
function ticker(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  //Star生成
  if(Math.floor(Math.random() * 5) === 0){
    createBackgroundStar();
  }

  //処理
  shotPlayer();//PlayerShot処理
  enemyCreateManager();//Enemy生成
  //移動
  moveBackgroundStars();//Star移動
  moveEnemies();//Enemy移動
  movePlayerShots();//Shot移動
  movePlayer();//Player移動
  //描画
  drawBackground();//Background描画
  drawBackgroundStars();//Star描画
  drawEnemies();//Enemy描画
  drawPlayerShots();//Shot描画
  drawPlayer();//Player描画
  drawUI();//UI描画

  //当たり判定
  hitCheckPlayer();
  hitCheckPlayerShot();

  //カウンタ更新
  gameManager.count++;
  gameManager.timeCounter = (gameManager.timeCounter + 1) & 1000000;
}

//Player
//Player プロパティ
function createPlayer(){
  gameManager.player = {
    x: gameManager.spriteImage.player_1.width / 2,
    y: canvas.height - gameManager.spriteImage.player_1.height / 2,
    moveX: 0,
    moveY: 0,
    width: gameManager.spriteImage.player_1.width,
    height: gameManager.spriteImage.player_1.height,
    image: gameManager.spriteImage.player_1,
    moveSpeed: 0
  }
}

//Player Shot
function shotPlayer(){
  if(isShot){
    const interval = 2;
    const count = gameManager.count;
    if((count - oldCountShot) > interval){
      oldCountShot = count;
      createPlayerShot1(gameManager.player.x, gameManager.player.y - 5)//弾発射
      //console.log('SHOT!');
    }
  }

  if(isBomb && !isDownKey && gameManager.bombs > 0){
    isDownKey = true;
    gameManager.bombs--;
    //TASK:Bomb発射
    //console.log('BOMB!');
  }else if (!isBomb){
    isDownKey = false;
  }
}

//Player移動
function movePlayer(){
  let speed = gameManager.player.moveSpeed;
  const slowSpeedRatio = 0.2;

  //移動計算
  if((isMoveRight || isMoveLeft) && (isMoveUp || isMoveDown)){
    if(isSlowMove) speed = gameManager.player.moveSpeed / 2 * slowSpeedRatio//斜め+低速移動 リファクタできそう
    else speed = gameManager.player.moveSpeed / 2;//斜め移動
  }
  else if (isSlowMove) speed = gameManager.player.moveSpeed * slowSpeedRatio//低速移動 リファクタできそう
  else speed = gameManager.player.moveSpeed;//通常移動

  if(isMoveRight && isMoveLeft) gameManager.player.moveX = 0;//左右同時は停止
  else if(isMoveRight && gameManager.player.x < 710) gameManager.player.moveX = speed;//右
  else if(isMoveLeft && gameManager.player.x > 250) gameManager.player.moveX = -speed;//左
  else gameManager.player.moveX = 0;//停止

  if(isMoveUp && isMoveDown) gameManager.player.moveY = 0;//上下同時は停止
  else if(isMoveUp && gameManager.player.y > 0) gameManager.player.moveY = -speed;//上
  else if(isMoveDown && gameManager.player.y < 540) gameManager.player.moveY = speed;//下
  else gameManager.player.moveY = 0;//停止

  //移動代入
  gameManager.player.x += gameManager.player.moveX;
  gameManager.player.y += gameManager.player.moveY;
}

//Player描画
function drawPlayer(){
  ctx.drawImage(
    gameManager.spriteImage.player_1,
    gameManager.player.x - gameManager.player.width / 2,
    gameManager.player.y - gameManager.player.height / 2
  );
}

//Shot
//Shotプロパティ
function createPlayerShot1(posX, posY){
  // console.log('shot');
  gameManager.playerShots.push({
    x: posX,
    y: posY,
    width: gameManager.effectImage.player_shot_1.width,
    height: gameManager.effectImage.player_shot_1.height,
    moveX: 0,
    moveY: -20,
    image: gameManager.effectImage.player_shot_1,
    isDied: false
  })
}

//Shot移動
function movePlayerShots(){
  for(const shot of gameManager.playerShots){
    shot.x += shot.moveX;
    shot.y += shot.moveY;
  }
  gameManager.playerShots = gameManager.playerShots.filter(shot =>
    shot.x < 710 && shot.x > 250 && shot.y > 0 && shot.y < 540 && !shot.isDied
  );
}

//Shot描画
function drawPlayerShots(){
  for(const shot of gameManager.playerShots){
    ctx.drawImage(shot.image, shot.x - shot.width/2, shot.y - shot.height/2);
  }
}

//Enemy
//Enemy生成Manager
function enemyCreateManager(){
  const t = gameManager.count;

  if(t === 50){
    createEnemy1(300, 0);
    createEnemy1(330, 0);
  }
  if(t === 90){
    for(const enemy of gameManager.enemies){
      enemy.moveX = 1.5;
    }
  }
  if(t === 100){
    createEnemy1(canvas.width - 300, 0);
    createEnemy1(canvas.width - 330, 0);
  }
  if(t === 140){
    for(const enemy of gameManager.enemies){
      enemy.moveX = -1.5;
    }
  }
  if(t === 200){
    for(let i=0; i<7; i++){
      createEnemy1(300+25*i, 0-50*i);
      createEnemy1(canvas.width - 300-25*i, 0-50*i);
    }
  }
}

//Enemy1 プロパティ
function createEnemy1(posX, posY){
  gameManager.enemies.push({
    x: posX,
    y: posY,
    width: gameManager.spriteImage.enemy_1.width,
    height: gameManager.spriteImage.enemy_1.height,
    moveX: 0,
    moveY: 5,
    image: gameManager.spriteImage.enemy_1,
    scorePoint: 5,
    isDied: false
  });
}

//Enemy移動
function moveEnemies(){
  for(const enemy of gameManager.enemies){
    enemy.x += enemy.moveX;
    enemy.y += enemy.moveY;
  }
  gameManager.enemies = gameManager.enemies.filter(enemy =>
    enemy.x < 710 && enemy.x > 250 /*&& enemy.y > 0*/ && enemy.y < 540 && !enemy.isDied
  );
}

//Enemy描画
function drawEnemies(){
  for(const enemy of gameManager.enemies){
    ctx.drawImage(enemy.image, enemy.x - enemy.width/2, enemy.y - enemy.height/2);
  }
}

//Background描画
function drawBackground(){
  ctx.drawImage(
    gameManager.backgroundImage.space_1,
    canvas.width / 2 - gameManager.backgroundImage.space_1.width/2, 0
  );
}

//Star
//Starプロパティ
function createBackgroundStar(){
  const size = 1;
  const starX = Math.random() * (460 - size) + 250;
  gameManager.stars.push({
    x: starX,
    y: 0,
    width: size,
    height: size,
    moveY: 10
  });
}

//Star移動
function moveBackgroundStars(){
  for(const star of gameManager.stars){
    star.y += star.moveY;
  }
  gameManager.stars = gameManager.stars.filter(star => star.y > -star.width);
}

//Star描画
function drawBackgroundStars(){
  ctx.fillStyle = 'white';
  for(const star of gameManager.stars){
    ctx.fillRect(star.x - star.width / 2, star.y - star.height / 2,  star.width, star.height);
  }
}

//UI描画
function drawUI(){
  //Letter Box
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, 250, canvas.height);
  ctx.fillRect(canvas.width-250, 0, 250, canvas.height);

  //Score
  ctx.textAlign = 'left';
  ctx.font = '13px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('SCORE', 730, 25);
  ctx.font = '24px misaki_gothic_2nd';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(gameManager.score, canvas.width-10, 50);

  //Level
  ctx.textAlign = 'left';
  ctx.font = 'italic 24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('LV.', 730, 150);
  ctx.font = ' 48px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(gameManager.playerLevel, 785, 150);

  //Life
  ctx.font = '24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`LIFE ${gameManager.life}`, 730, 210);

  //Bomb
  ctx.font = '24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`BOMB ${gameManager.bombs}`, 730, 250);


  //Count
  ctx.font = '24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`COUNT ${gameManager.count}`, 730, 320);
}

//Input
let isMoveRight = false;
let isMoveLeft = false;
let isMoveUp = false;
let isMoveDown = false;
let isSlowMove =false;

let isShot = false;
let isBomb = false;

document.addEventListener('keydown', event => {
  //一応拡張しやすいように残しておく
  let isKeyMoveRight = event.code === getKeyBind('moveRight');
  let isKeyMoveLeft = event.code === getKeyBind('moveLeft');
  let isKeyMoveUp = event.code === getKeyBind('moveUp');
  let isKeyMoveDown = event.code === getKeyBind('moveDown');

  //移動
  if(isKeyMoveRight) isMoveRight = true;
  if(isKeyMoveLeft) isMoveLeft = true;
  if(isKeyMoveUp) isMoveUp = true;
  if(isKeyMoveDown) isMoveDown = true;
  if(event.code === getKeyBind('slowMove')) isSlowMove = true;

  //shot
  if(event.code === getKeyBind('shot')) isShot = true;
  //bomb
  if(event.code === getKeyBind('bomb')) isBomb = true;
});
document.addEventListener('keyup', event => {
  let isKeyMoveRight = event.code === getKeyBind('moveRight');
  let isKeyMoveLeft = event.code === getKeyBind('moveLeft');
  let isKeyMoveUp = event.code === getKeyBind('moveUp');
  let isKeyMoveDown = event.code === getKeyBind('moveDown');

  if(isKeyMoveRight) isMoveRight = false;
  if(isKeyMoveLeft) isMoveLeft = false;
  if(isKeyMoveUp) isMoveUp = false;
  if(isKeyMoveDown) isMoveDown = false;
  if(event.code === getKeyBind('slowMove')) isSlowMove = false;

  if(event.code === getKeyBind('shot')) isShot = false;
  if(event.code === getKeyBind('bomb')) isBomb = false;
});

//当たり判定
//Player当たり判定
function hitCheckPlayer(){
  for(const enemy of gameManager.enemies) {
    const interval = 50;
    const count = gameManager.count;

    if(
      Math.abs(gameManager.player.x - enemy.x) < gameManager.player.width / 16 + enemy.width * 0.5 / 2 &&
      Math.abs(gameManager.player.y - enemy.y) < gameManager.player.height / 16 + enemy.height * 0.5 /2 &&
      (count - oldCountHit) > interval
    ){
      oldCountHit = count;
      //TASK:被弾表現
      //console.log('HIT!');

      if(gameManager.life > 0){
        gameManager.life--;
      }else{
        gameManager.isGameOver = true;

        //GameOver表現
        ctx.font = '50px misaki_gothic_2nd';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`Game Over`, 480, 270);

        clearInterval(gameManager.timer);
      }
    }
  }
}

//PlayerShot当たり判定
function hitCheckPlayerShot(){
  for(const enemy of gameManager.enemies){
    for(const shot of gameManager.playerShots){
      if(
        Math.abs(shot.x - enemy.x) < shot.width * 0.8 / 2 + enemy.width * 0.7 / 2 &&
        Math.abs(shot.y - enemy.y) < shot.height * 0.6 / 2 + enemy.height * 0.7 /2
      ){
        //console.log('HIT!!!');
        enemy.isDied = true;//Enemy消す
        shot.isDied = true;//Shot消す
        gameManager.score += enemy.scorePoint;//スコア加算
      }
    }
  }
}