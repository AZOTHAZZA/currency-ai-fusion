import { TokenManager } from '../economy/token.js';

export const FusionMint = {
  mint(user, amount) {
    TokenManager.deposit(user, amount);
    return TokenManager.getBalance(user);
  }
};