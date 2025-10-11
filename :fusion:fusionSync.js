import { TokenManager } from '../economy/token.js';

export const FusionSync = {
  syncBalance(user, externalBalance) {
    // 外部システムと同期
    TokenManager.balances[user] = externalBalance;
    return TokenManager.getBalance(user);
  }
};