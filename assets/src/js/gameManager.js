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
  defaultLife: 10,
  isHitPlayerEffect: false,
  oldCountHit: 0,
  oldCountShot1: 0,
  oldCountShot2: 0,
  onBombKey: false,
  bombs: 0,
  defaultBombs: 3,
  highScore: 0,
  score: 0,
  count: 0,
  isBgm: false,
  isSe: false,
  isTalking: false,
  timer: null
};

//ゲーム内シーンの状態
export const gameSceneState = {
  loading: false,
  titleScene: false,
  howToPlayScene: false,
  settingScene: false,
  gameScene: false,
  gameOverScene: false,

  changeScene(targetScene){
    this.loading = false;
    this.titleScene = false;
    this.howToPlayScene = false;
    this.settingScene = false;
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
    && gameSceneState.settingScene === false
    && gameSceneState.gameScene === false
  );//正常
  else console.error('ERROR-sceneChangeTest');

  gameSceneState.changeScene('keyBindingScene');
  if(
    gameSceneState.titleScene === false
    && gameSceneState.settingScene === true
    && gameSceneState.gameScene === false
  );//正常
  else console.error('ERROR-sceneChangeTest')

  gameSceneState.changeScene('titleScene');
  if(
    gameSceneState.titleScene === true
    && gameSceneState.settingScene === false
    && gameSceneState.gameScene === false
  );//正常
  else console.error('ERROR-sceneChangeTest')

  gameSceneState.changeScene('gameScene');
  if(
    gameSceneState.titleScene === false
    && gameSceneState.settingScene === false
    && gameSceneState.gameScene === true
  );//正常
  else console.error('ERROR-sceneChangeTest');

  console.log('sceneChangeTest was finished');
}

//Assets Name
export const assetsNames ={
  spriteNames: ['player_1', 'player_1_hit', 'enemy_1', 'enemy_2', 'char_1_normal_1', 'char_1_normal_2', 'char_1_normal_3', 'char_2', 'dummy_image'],
  effectNames: ['player_shot_1', 'player_shot_2', 'enemy_shot_1'],
  backgroundNames: ['space_1'],
  uiNames: ['letter_box'],
  seNames: ['kill_1'],
  bgmNames: ['title_1', 'game_1', 'game_2']
}