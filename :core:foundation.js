export const foundation = {
  normalize(command) {
    // 基礎統合層：入力コマンドを数値化・正規化
    // 文字コードの総和などを使用
    let sum = 0;
    for (let i = 0; i < command.length; i++) {
      sum += command.charCodeAt(i);
    }
    // 正規化して0-1に収める
    return sum / (command.length * 255);
  }
};