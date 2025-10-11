// /ai/generator.js
import { CoreModule } from '../core/module.js';
import { TokenManager } from '../economy/token.js';
import { MathematicalSilence } from '../core/mathematical_silence.js';

export async function generate(command, user = 'defaultUser') {
  // 1. CoreModuleで入力を正規化・統合
  const normalizedValue = await CoreModule.process(command);

  // 2. 数理的沈黙層による非線形変換
  const silentValue = MathematicalSilence.apply(normalizedValue);

  // 3. トークン計算（価値に応じた付与）
  let earned = Math.floor(silentValue * 100); 

  // 4. 取引制約チェック
  const maxEarnable = TokenManager.getDailyLimit(user);
  if (earned > maxEarnable) earned = maxEarnable;

  // 5. 残高更新
  TokenManager.deposit(user, earned);

  // 6. 履歴更新
  TokenManager.addHistory(user, {
    timestamp: Date.now(),
    command,
    earned,
    balance: TokenManager.getBalance(user)
  });

  // 7. 結果返却（UI 反映用）
  return {
    command,
    normalizedValue,
    silentValue,
    earned,
    balance: TokenManager.getBalance(user),
    history: TokenManager.getHistory(user)
  };
}