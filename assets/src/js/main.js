import { getKeyBind } from './keyBinder.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const spriteNames = ['player_1', 'enemy_1'];
const backgroundNames = ['space_1'];
const uiNames = ['letter_box'];


//Game Manager プロパティ
const gameManager = {
  timeCounter: 0,
  enemies: [],
  spriteImage: {},
  backgroundImage: {},
  uiImage: {},
  isGameOver: true,
  score: 0,
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
          console.log(`${imgType}:画像ロード完了`);
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

async function assetLoader(){
  //画像ロード
  const [spriteImage, backgroundImage, uiImage] = await Promise.all([
    imageLoader(spriteNames, 'sprite-'),
    imageLoader(backgroundNames, 'background-'),
    imageLoader(uiNames, 'ui-')
  ]);
  gameManager.spriteImage = spriteImage;
  gameManager.backgroundImage = backgroundImage;
  gameManager.uiImage = uiImage;

  init();
}


//初期化
function init(){
  gameManager.timeCounter = 0;
  gameManager.enemies = [];
  gameManager.isGameOver = false;
  gameManager.score = 0;

  gameSceneState.changeScene('titleScene');

  //Player初期設定
  createPlayer();
  gameManager.player.moveSpeed = 5;
  gameManager.player.x = canvas.width / 2;
  gameManager.player.y = canvas.height / 2;

  setInterval(ticker, 30);//カウント開始
}

function ticker(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  drawBackground();//Background描画
  movePlayer();//Player移動
  drawPlayer();//Player描画
  drawUI();//UI描画

  gameManager.timeCounter = (gameManager.timeCounter + 1) & 1000000;//カウンタ更新
}


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

//Player移動
function movePlayer(){
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

//Background描画
function drawBackground(){
  ctx.drawImage(
    gameManager.backgroundImage.space_1,
    canvas.width / 2 - gameManager.backgroundImage.space_1.width/2, 0
  );
}

//UI描画
function drawUI(){
  //Letter Box
  ctx.fillStyle = '#2C2C2C';
  ctx.fillRect(0, 0, 250, canvas.height);
  ctx.fillRect(canvas.width-250, 0, 250, canvas.height);
}

//Input
document.addEventListener('keydown', event => {
  let isKeyMoveRight = event.code === getKeyBind('moveRight');
  let isKeyMoveLeft = event.code === getKeyBind('moveLeft');
  let isKeyMoveUp = event.code === getKeyBind('moveUp');
  let isKeyMoveDown = event.code === getKeyBind('moveDown');
  let speed = gameManager.player.moveSpeed;

  if(isKeyMoveRight && !isKeyMoveLeft && gameManager.player.x <= 710)
  {
    if(isKeyMoveUp){
      //右上
      gameManager.player.moveX = speed / 2;
      gameManager.player.moveY = -speed / 2;
    }else if(isKeyMoveDown){
      //右下
      gameManager.player.moveX = speed / 2;
      gameManager.player.moveY = speed / 2;
    }else{
      //右
      gameManager.player.moveX = speed;
    }
  }
  else if(isKeyMoveLeft && !isKeyMoveRight && gameManager.player.x >= 250)
  {
    if(isKeyMoveUp){
      //左上
      gameManager.player.moveX = -speed / 2;
      gameManager.player.moveY = -speed / 2;
    }else if(isKeyMoveDown){
      //左下
      gameManager.player.moveX = -speed / 2;
      gameManager.player.moveY = speed / 2;
    }else{
      //左
      gameManager.player.moveX = -speed;
    }
  }
  else if(isKeyMoveUp && !isKeyMoveDown && gameManager.player.x >= 250)
  {
    if(isKeyMoveRight){
      //右上
      gameManager.player.moveX = speed / 2;
      gameManager.player.moveY = -speed / 2;
    }else if(isKeyMoveLeft){
      //左上
      gameManager.player.moveX = -speed / 2;
      gameManager.player.moveY = -speed / 2;
    }else{
      //上
      gameManager.player.moveY = -speed;
    }
  }
  else if(isKeyMoveDown && !isKeyMoveUp && gameManager.player.x >= 250)
  {
    if(isKeyMoveRight){
      //右下
      gameManager.player.moveX = speed / 2;
      gameManager.player.moveY = speed / 2;
    }else if(isKeyMoveLeft){
      //左下
      gameManager.player.moveX = -speed / 2;
      gameManager.player.moveY = speed / 2;
    }else{
      //下
      gameManager.player.moveY = speed;
    }
  }
})