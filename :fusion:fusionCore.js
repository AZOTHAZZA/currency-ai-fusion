import { CoreModule } from '../core/module.js';
import { TokenManager } from '../economy/token.js';

export const FusionCore = {
  async executeCommand(command, user = 'defaultUser') {
    const value = await CoreModule.process(command);
    const earned = Math.floor(value * 100);
    TokenManager.deposit(user, earned);
    return { value, earned, balance: TokenManager.getBalance(user) };
  }
};