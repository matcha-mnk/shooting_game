//関数
import { enemyCreateManager, moveEnemies, drawEnemies } from './enemy.js';
import { createPlayer, shotPlayer, movePlayer, drawPlayer } from './player.js';
import { movePlayerShots, drawPlayerShots } from './playerShot.js';
import { moveEnemyShots, drawEnemyShot } from './enemyShot.js';
import { drawBackground, createBackgroundStar, moveBackgroundStars, drawBackgroundStars } from './background.js';
import { drawUI } from './ui.js';
import { hitCheckPlayer, hitCheckPlayerShot } from './hitCheck.js';
import { imageLoad } from './assetsLoader.js';
import { getKeyBind } from './keyBinder.js';
//変数
import { gameManager, gameSceneState, assetsNames } from './gameManager.js';
import { isAction } from './input.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let titleSelect = 0;
let onUpKey = false;
let onDownKey = false;
let titleSceneTimer;
let onMenuKey = false;


assetLoader();

//画像ロード
async function assetLoader(){
  const [spriteImage, effectImage, backgroundImage, uiImage] = await Promise.all([
    imageLoad(assetsNames.spriteNames, 'sprite-'),
    imageLoad(assetsNames.effectNames, 'effect-'),
    imageLoad(assetsNames.backgroundNames, 'background-'),
    imageLoad(assetsNames.uiNames, 'ui-')
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
  gameManager.life = 5;
  gameManager.bombs = 3;
  gameManager.count = 0;
  gameManager.score = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  startTitleScene();
}


//TitleScene
function startTitleScene(){
  gameSceneState.changeScene('titleScene');

  //タイトル画面描画
  ctx.textAlign = 'center';
  ctx.font = 'bold 48px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('SHOOTING GAME', canvas.width/2, 150);

  ctx.textAlign = 'right';
  ctx.font = '13px misaki_gothic_2nd';
  ctx.fillText(`${getKeyBind('moveUp')}:Up   `, canvas.width-5, canvas.height-40);
  ctx.fillText(`${getKeyBind('moveDown')}:Down `, canvas.width-5, canvas.height-25);
  ctx.fillText(`${getKeyBind('shot')}:Enter`, canvas.width-5, canvas.height-10);

  titleSceneTimer = setInterval(titleTicker, 30);
}

//Title Update
function titleTicker(){
  ctx.clearRect(0, canvas.height/2-50, canvas.width, 200);//画面クリア

  //Select 入力検知
  if(isAction.isMoveUp && titleSelect > 0 && !onUpKey){
    onUpKey = true;
    titleSelect--;
  }else if(!isAction.isMoveUp){
    onUpKey = false;
  }
  if(isAction.isMoveDown && titleSelect < 2 && !onDownKey){
    onDownKey = true;
    titleSelect++;
  }else if(!isAction.isMoveDown){
    onDownKey = false;
  }

  //Select 表示切り替え
  switch(titleSelect){
    case 0:
      ctx.textAlign = 'center';
      ctx.font = 'italic bold 32px misaki_gothic_2nd';
      ctx.fillText('play', canvas.width/2, 270);
      ctx.font = '32px misaki_gothic_2nd';
      ctx.fillText('how to play', canvas.width/2, 330);
      ctx.font = '32px misaki_gothic_2nd';
      ctx.fillText('setting', canvas.width/2, 390);
      break;
    case 1:
      ctx.textAlign = 'center';
      ctx.font = '32px misaki_gothic_2nd';
      ctx.fillText('play', canvas.width/2, 270);
      ctx.font = 'italic bold 32px misaki_gothic_2nd';
      ctx.fillText('how to play', canvas.width/2, 330);
      ctx.font = '32px misaki_gothic_2nd';
      ctx.fillText('setting', canvas.width/2, 390);
      break;
    case 2:
      ctx.textAlign = 'center';
      ctx.font = '32px misaki_gothic_2nd';
      ctx.fillText('play', canvas.width/2, 270);
      ctx.font = '32px misaki_gothic_2nd';
      ctx.fillText('how to play', canvas.width/2, 330);
      ctx.font = 'italic bold 32px misaki_gothic_2nd';
      ctx.fillText('setting', canvas.width/2, 390);
      break;
  }

  //Enter 入力検知
  if(isAction.isShot){
    clearInterval(titleSceneTimer);

    switch(titleSelect){
      case 0:
        //GameSceneへ
        startGameScene();
        break;
      case 1:
        //遊び方へ
        break;
      case 2:
        //設定へ
        break;
    }
  }
}


//GameScene
function startGameScene(){
  gameSceneState.changeScene('gameScene');

  //Player初期設定
  createPlayer();
  gameManager.player.moveSpeed = 10;
  gameManager.player.x = canvas.width / 2;
  gameManager.player.y = canvas.height / 2 + 220;

  gameManager.timer = setInterval(gameTicker, 30);//カウント開始
}

//Update
function gameTicker(){
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
  moveEnemyShots();//EnemyShot移動
  moveEnemies();//Enemy移動
  movePlayerShots();//Shot移動
  movePlayer();//Player移動
  //描画
  drawBackground();//Background描画
  drawBackgroundStars();//Star描画
  drawEnemyShot();//EnemyShot描画
  drawEnemies();//Enemy描画
  drawPlayerShots();//Shot描画
  drawPlayer();//Player描画
  drawUI();//UI描画

  //当たり判定
  hitCheckPlayer();
  hitCheckPlayerShot();

  //Menu 入力検知
  if(isAction.isMenuKey && !onMenuKey){
    onMenuKey = true;
    //メニュー処理
  }else if(!isAction.isMenuKey){
    onMenuKey = false;
  }

  //カウンタ更新
  gameManager.count++;
  gameManager.timeCounter = (gameManager.timeCounter + 1) & 1000000;
}