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
      console.error('不正なScene');
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

  //Letter Box 描画
  ctx.fillStyle = '#2C2C2C';
  ctx.fillRect(0, 0, 250, canvas.height);
  ctx.fillRect(canvas.width-250, 0, 250, canvas.height);

  ctx.drawImage(gameManager.backgroundImage.space_1, 250, 0)//Background 描画

  createPlayer();

  setInterval(ticker, 30);//カウント開始
}

function ticker(){
  //
}

//Player プロパティ
function createPlayer(){
  gameManager.player = {
    x: gameManager.spriteImage.player_1.width / 2,
    y: canvas.height - gameManager.spriteImage.player_1.height / 2,
    moveY: 0,
    width: gameManager.spriteImage.player_1.width,
    height: gameManager.spriteImage.player_1.height,
    image: gameManager.spriteImage.player_1
  }
}

//Input
document.addEventListener('keydown', event => {
  if(event.code === getKeyBind('')){
    //右移動
  }
  else if(event.code === ''){
    //左移動
  }
})