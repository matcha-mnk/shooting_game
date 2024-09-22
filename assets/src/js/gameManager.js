//Game Manager プロパティ
export const gameManager = {
  timeCounter: 0,
  playerShots: [],
  enemyShots: [],
  enemies: [],
  stars: [],
  spriteImage: {},
  effectImage: {},
  backgroundImage: {},
  uiImage: {},
  playerLevel: 0,
  life: 0,
  isHitPlayerEffect: false,
  bombs: 0,
  score: 0,
  count: 0,
  timer: null
};

//ゲーム内シーンの状態
export const gameSceneState = {
  titleScene: false,
  keyBindingScene: false,
  gameScene: false,
  gameOverScene: false,

  changeScene(targetScene){
    this.titleScene = false;
    this.keyBindingScene = false;
    this.gameScene = false;
    this.gameOverScene = false;

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

//Assets Name
export const assetsNames ={
  spriteNames: ['player_1', 'player_1_hit', 'enemy_1'],
  effectNames: ['player_shot_1', 'enemy_shot_1'],
  backgroundNames: ['space_1'],
  uiNames: ['letter_box']
}