import { CoreModule } from '../core/module.js';
import { TokenManager } from '../economy/token.js';

export const SelfLayer = {
  async reflect(command, user = 'defaultUser') {
    // 自己生成・自己更新ロジック
    const processed = await CoreModule.process(command);

    // 生成AIへのフィードバックとして反映
    const feedback = Math.floor(processed * 50);
    TokenManager.deposit(user, feedback);

    return {
      processed,
      feedback,
      balance: TokenManager.getBalance(user)
    };
  },

  async heal(user = 'defaultUser') {
    // トークンを利用して自己回復・更新
    const healAmount = Math.floor(TokenManager.getBalance(user) * 0.1);
    TokenManager.withdraw(user, healAmount);
    return {
      healed: healAmount,
      balance: TokenManager.getBalance(user)
    };
  },

  async update() {
    // CoreModuleや自身のアップデート処理
    return await CoreModule.update();
  }
};