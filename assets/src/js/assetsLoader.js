//画像読み込み関数
export function imageLoad(imgNames, imgType){
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

const audioCtx = new AudioContext();
let audioSource;

async function fetchAudio(audioUrl){
  const response = await fetch(audioUrl);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

export async function playAudio(audioUrl){
  const audioBuffer = await fetchAudio(audioUrl);
  audioSource = audioCtx.createBufferSource();
  audioSource.buffer = await audioCtx.decodeAudioData(audioBuffer);
  audioSource.loop = true;

  audioSource.connect(audioCtx.destination);
  audioSource.start();
}

export function stopAudio(){
  if(audioSource){
    audioSource.stop();
    audioSource.disconnect();
    audioSource = null;
  }
}

export async function playSE(audioUrl){
  const audioBuffer = await fetchAudio(audioUrl);
  audioSource = audioCtx.createBufferSource();
  audioSource.buffer = await audioCtx.decodeAudioData(audioBuffer);

  audioSource.connect(audioCtx.destination);
  audioSource.start();
}