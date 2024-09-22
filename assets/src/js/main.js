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

let onUpKey = false;
let onDownKey = false;
let onMenuKey = false;
let onEnterKey = false;
let titleSelect = 0;
let menuSelect = 0;
let gameOverSelect = 0;

let titleSceneTimer;
let menuTimer;
let howToPlayTimer;
let gameOverTimer;


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

  startTitleScene();
}

//初期化
function init(){
  gameManager.timeCounter = 0;
  gameManager.playerShots = [];
  gameManager.enemyShots = [];
  gameManager.enemies = [];
  gameManager.stars = [];
  gameManager.playerLevel = 0;
  gameManager.life = 10;
  gameManager.isHitPlayerEffect = false;
  gameManager.oldCountHit = 0;
  gameManager.oldCountShot = 0;
  gameManager.onBombKey = false;
  gameManager.bombs = 3;
  gameManager.count = 0;
  gameManager.score = 0;

  onUpKey = false;
  onDownKey = false;
  onMenuKey = false;
  onEnterKey = false;
  titleSelect = 0;
  menuSelect = 0;
  gameOverSelect = 0;
}

//TitleScene
function startTitleScene(){
  gameSceneState.changeScene('titleScene');

  titleSceneTimer = setInterval(titleTicker, 30);
}

//Title Update
function titleTicker(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

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
  if(isAction.isShot && !onEnterKey){
    onEnterKey = true;
    clearInterval(titleSceneTimer);

    switch(titleSelect){
      case 0:
        //GameSceneへ
        startGameScene();
        break;
      case 1:
        //遊び方へ
        startHowToPlayScene();
        break;
      case 2:
        //設定へ
        startSettingScene();
        break;
    }
  }else if(!isAction.isShot){
    onEnterKey = false;
  }
}

//GameScene
function startGameScene(){
  init();

  gameSceneState.changeScene('gameScene');

  //Player初期設定
  createPlayer();
  gameManager.player.moveSpeed = 8;
  gameManager.player.x = canvas.width / 2;
  gameManager.player.y = canvas.height / 2 + 220;

  gameManager.timer = setInterval(gameTicker, 30);//カウント開始
}

//GameScene Update
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
  if(isAction.isMenu && !onMenuKey){
    onMenuKey = true;
    //メニュー処理
    startMenu();
  }else if(!isAction.isMenu){
    onMenuKey = false;
  }

  //GameOver監視
  if(gameSceneState.gameOverScene === true){
    startGameOverScene();
  }

  //カウンタ更新
  gameManager.count++;
  gameManager.timeCounter = (gameManager.timeCounter + 1) & 1000000;
}

//Menu
function startMenu(){
  clearInterval(gameManager.timer);//Gameストップ

  menuTimer = setInterval(menuTicker, 30);
}

//Menu Update
function menuTicker(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  drawBackground();//Background描画
  drawBackgroundStars();//Star描画
  drawEnemyShot();//EnemyShot描画
  drawEnemies();//Enemy描画
  drawPlayerShots();//Shot描画
  drawPlayer();//Player描画
  drawUI();//UI描画


  //Menu 入力検知
  if(isAction.isMenu && !onMenuKey){
    onMenuKey = true;
    clearInterval(menuTimer);
    gameManager.timer = setInterval(gameTicker, 30);//Game再開
  }else if(!isAction.isMenu){
    onMenuKey = false;
  }

  //Enter 入力検知
  if(isAction.isShot && !onEnterKey){
    onEnterKey = true;
    switch(menuSelect){
      case 0:
        clearInterval(menuTimer);
        gameManager.timer = setInterval(gameTicker, 30);//Game再開
        break;
      case 1:
        //本当に？
        menuSelect = 2;
        break;
      case 2:
        clearInterval(menuTimer);
        clearInterval(gameManager.timer);
        startTitleScene();
        menuSelect = 0;
        break;
      case 3:
        menuSelect = 0;
        break;
    }
  }else if(!isAction.isShot){
    onEnterKey = false;
  }

  //Select 入力検知
  if(isAction.isMoveUp && menuSelect === 1 && !onUpKey){
    onUpKey = true;
    menuSelect--;
  }else if(!isAction.isMoveUp){
    onUpKey = false;
  }
  if(isAction.isMoveDown && menuSelect === 0 && !onDownKey){
    onDownKey = true;
    menuSelect++;
  }else if(!isAction.isMoveDown){
    onDownKey = false;
  }
  if(isAction.isMoveUp && menuSelect === 3 && !onUpKey){
    onUpKey = true;
    menuSelect--;
  }else if(!isAction.isMoveUp){
    onUpKey = false;
  }
  if(isAction.isMoveDown && menuSelect === 2 && !onDownKey){
    onDownKey = true;
    menuSelect++;
  }else if(!isAction.isMoveDown){
    onDownKey = false;
  }

  //Select 表示切り替え
  switch(menuSelect){
    case 0:
      //薄暗く
      ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //Menuテキスト
      ctx.textAlign = 'center';
      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillStyle = '#dbdbdb';
      ctx.fillText('pause', canvas.width/2, 200);

      ctx.font = 'italic bold 24px misaki_gothic_2nd';
      ctx.fillText('ゲームに戻る', canvas.width/2, 250);

      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillText('タイトルに戻る', canvas.width/2, 290);
      break;
    case 1:
      //薄暗く
      ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //Menuテキスト
      ctx.textAlign = 'center';
      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillStyle = '#dbdbdb';
      ctx.fillText('pause', canvas.width/2, 200);

      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillText('ゲームに戻る', canvas.width/2, 250);

      ctx.font = 'italic bold 24px misaki_gothic_2nd';
      ctx.fillText('タイトルに戻る', canvas.width/2, 290);
      break;
    case 2:
      //薄暗く
      ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //Menuテキスト
      ctx.textAlign = 'center';
      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillStyle = '#dbdbdb';
      ctx.fillText('本当にタイトルに戻りますか?', canvas.width/2, 200);
      ctx.fillText('(スコアはセーブされません)', canvas.width/2, 230);

      ctx.font = 'italic bold 24px misaki_gothic_2nd';
      ctx.fillText('Yes', canvas.width/2, 280);

      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillText('No', canvas.width/2, 320);
      break;
    case 3:
      //薄暗く
      ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //Menuテキスト
      ctx.textAlign = 'center';
      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillStyle = '#dbdbdb';
      ctx.fillText('本当にタイトルに戻りますか?', canvas.width/2, 200);
      ctx.fillText('(スコアはセーブされません)', canvas.width/2, 230);

      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillText('Yes', canvas.width/2, 280);

      ctx.font = 'italic bold 24px misaki_gothic_2nd';
      ctx.fillText('No', canvas.width/2, 320);
      break;
  }
}

//HowToPlay Scene
function startHowToPlayScene(){
  gameSceneState.changeScene('howToPlayScene');

  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  ctx.textAlign = 'left';
  ctx.font = '18px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`press ${getKeyBind('bomb')} to go back`, 20, 45);

  ctx.textAlign = 'center';
  ctx.font = '32px misaki_gothic_2nd';
  ctx.fillText('あそびかた', canvas.width/2, 55);

  ctx.font= '24px misaki_gothic_2nd';
  ctx.fillText('操作方法(default)', canvas.width/2, 120);
  ctx.textAlign = 'left';
  ctx.fillText('Move / Select : Arrow', 330, 180);
  ctx.fillText('Shot / Enter  : Z', 330, 220);
  ctx.fillText('Bomb / Cancel : X', 330, 260);
  ctx.fillText('Slow Move     : Left Shift', 330, 300);
  ctx.fillText('Open Menu     : Left Ctrl', 330, 340);

  ctx.textAlign = 'center';
  ctx.fillText('Setting > KeyBind で変更可', canvas.width/2, 400);

  howToPlayTimer = setInterval(howToPlayTicker, 30);
}

function howToPlayTicker(){
  if(isAction.isBomb && !onEnterKey){
    onEnterKey = true;
    clearInterval(howToPlayTimer);
    startTitleScene();
  }else if(!isAction.isBomb){
    onEnterKey = false;
  }
}

//Setting Scene
function startSettingScene(){
  gameSceneState.changeScene('settingScene');
}

//GameOver Scene
function startGameOverScene(){
  clearInterval(gameManager.timer);

  gameOverTimer = setInterval(gameOverTicker, 30);
}

function gameOverTicker(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  drawBackground();//Background描画
  drawBackgroundStars();//Star描画
  drawEnemyShot();//EnemyShot描画
  drawEnemies();//Enemy描画
  drawPlayerShots();//Shot描画
  drawPlayer();//Player描画
  drawUI();//UI描画


  //Enter 入力検知
  if(isAction.isShot && !onEnterKey){
    onEnterKey = true;
    switch(gameOverSelect){
      case 0:
        //TASK:スコア保存
        //もう一度
        clearInterval(gameOverTimer);
        startGameScene();
        break;
      case 1:
        //TASK:スコア保存
        //タイトルへ
        clearInterval(gameOverTimer);
        startTitleScene();
        gameOverSelect = 0;
        break;
    }
  }else if(!isAction.isShot){
    onEnterKey = false;
  }

  //Select 入力検知
  if(isAction.isMoveUp && gameOverSelect === 1 && !onUpKey){
    onUpKey = true;
    gameOverSelect--;
  }else if(!isAction.isMoveUp){
    onUpKey = false;
  }
  if(isAction.isMoveDown && gameOverSelect === 0 && !onDownKey){
    onDownKey = true;
    gameOverSelect++;
  }else if(!isAction.isMoveDown){
    onDownKey = false;
  }

  //Select 表示切り替え
  switch(gameOverSelect){
    case 0:
      //薄暗く
      ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //GameOver描画
      ctx.font = '50px misaki_gothic_2nd';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(`Game Over`, 480, 200);

      ctx.font = 'italic bold 24px misaki_gothic_2nd';
      ctx.fillText('やりなおす', canvas.width/2, 250);

      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillText('タイトルに戻る', canvas.width/2, 290);
      break;
    case 1:
      //薄暗く
      ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //GameOver描画
      ctx.font = '50px misaki_gothic_2nd';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(`Game Over`, 480, 200);

      ctx.font = '24px misaki_gothic_2nd';
      ctx.fillText('やりなおす', canvas.width/2, 250);

      ctx.font = 'italic bold 24px misaki_gothic_2nd';
      ctx.fillText('タイトルに戻る', canvas.width/2, 290);
      break;
  }
}