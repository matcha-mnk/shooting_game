//気休め
export function encrypt(num) {
  const digits = num.toString().length;//桁数
  let text = digits + num.toString();//桁数の情報を追加してStringに
  let dummyText = '';
  for (let i = 0; i < 15 - digits; i++) {
      const dummyNum = Math.floor(Math.random() * (9 + 1));
      dummyText += dummyNum;
  }
  text += dummyText;//Scoreの最大桁分ダミーな数字をランダムに生成
  const alphabets1 = 'xtamqlbzgd'.split('');
  let textArray = text.split('').map((n) => {
      return alphabets1[n];//対応するアルファベットに変換
  });
  //桁数情報の桁数
  if (digits.toString().length === 1) {
      textArray.unshift('h', 'n', 'i');
  } else {
      textArray.unshift('s', 'i', 'c');
  }
  const alphabets2 = "abcdefghijklmnopqrstuvwxyz".split('');
  textArray = textArray.map((a) => {
    if(alphabets2.indexOf(a) === alphabets2.length -1) return alphabets2[2];
    else if (alphabets2.indexOf(a) === alphabets2.length -2) return alphabets2[1];
    else if (alphabets2.indexOf(a) === alphabets2.length -3) return alphabets2[0];
    else return alphabets2[alphabets2.indexOf(a) + 3];
  });//アルファベット3つずらす
  let randomTextArray = [];
  for (let i = 0; i < textArray.length; i++) {
      randomTextArray.push(alphabets2[Math.floor(Math.random() * alphabets2.length)]);//同じ長さのランダム文字列生成
  }
  let joinArray = [];
  for (let i = 0; i < textArray.length; i++) {
      joinArray.push(randomTextArray[i]);
      joinArray.push(textArray[i]);
  }//合成
  const joinText = btoa(joinArray.join(''));//Base64でエンコード
  const equals = (joinText.match(/=/g) || []).length;//=の数
  const alphabets3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
  const joinTextArray = joinText.slice(0, joinText.length - equals).split('').map((a) => {
      return alphabets3[alphabets3.indexOf(a) === alphabets3.length - 1 ? 0 : alphabets3.indexOf(a) + 1];//アルファベット1つずらす
  });
  let equalText = '';
  for (let i = 0; i < equals; i++) {
      equalText += '=';
  }
  const cipherText = joinTextArray.join('') + equalText;

  return cipherText;
}

export function decrypt(text) {
  const alphabets2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split('');
  const equals = (text.match(/=/g) || []).length;//=の数
  const textArray1 = text.slice(0, text.length - equals).split('').map((a) => {
      return alphabets2[alphabets2.indexOf(a) === 0 ? alphabets2.length + 1 : alphabets2.indexOf(a) - 1];
  });//アルファベット-1ずらす
  let equalText = '';
  for (let i = 0; i < equals; i++) {
      equalText += '=';
  }
  const text1 = textArray1.join('') + equalText;//=つなげる
  const text2 = atob(text1);//デコード
  let textArray2 = [];
  for (let i = 1; i < text2.length*2; i += 2) {
      textArray2.push(text2.split('')[i]);
  }//一個飛ばし
  const alphabets3 = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const textArray3 = textArray2.map((a) => {
    if(alphabets3.indexOf(a) === 0) return alphabets3[alphabets3.length-3];
    else if (alphabets3.indexOf(a) === 1) return alphabets3[alphabets3.length-2];
    else if (alphabets3.indexOf(a) === 2) return alphabets3[alphabets3.length-1];
    else return alphabets3[alphabets3.indexOf(a) - 3];
  });//アルファベット-3ずらす
  const text3 = textArray3.join('');
  //桁数情報の桁数を読む
  let digits;
  if (text3.slice(0, 3) === 'hni') {
      digits = 1;
  } else if (text3.slice(0, 3) === 'sic') {
      digits = 2;
  }
  const text4 = text3.slice(3, text3.length);//桁数情報の桁数の文字列除外
  const alphabets1 = 'xtamqlbzgd'.split('');
  let textArray4 = text4.split('').map((a) => {
      return alphabets1.indexOf(a);//対応する数字に変換
  });
  const digits2 = textArray4.join('').slice(0, digits);//桁数部分だけ取る
  const resultText = textArray4.join('').slice(digits, Number(digits)+Number(digits2));//Score部分だけ

  return resultText;
}

//暗号化のテスト
export function cipherTest(){
  //15桁までにしておくが吉
  let num = [1, 200, 150, 223, 123788721, 12378127820, 23, 0, 999999999999999];
  for(let i=0; i<num.length; i++){
    if(num[i] != decrypt(encrypt(num[i]))) console.error('error');
  }
  for(let i=0; i<1000; i++){
    const n = Math.floor(Math.random() * 1000000000000000);
    if(n != decrypt(encrypt(n))) console.error('error');
  }
  console.log('cipherTest was finished');
}