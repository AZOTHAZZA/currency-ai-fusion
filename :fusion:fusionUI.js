export function updateUI(result, outputEl) {
  const { command, value, earned, balance } = result;
  outputEl.textContent = `
コマンド: ${command}
数理変換値: ${value.toFixed(4)}
付与トークン: ${earned}
残高: ${balance}
  `;
}