export const TokenManager = {
  balances: {},

  getBalance(user) {
    if (!this.balances[user]) this.balances[user] = 0;
    return this.balances[user];
  },

  deposit(user, amount) {
    if (!this.balances[user]) this.balances[user] = 0;
    this.balances[user] += amount;
    return this.balances[user];
  },

  withdraw(user, amount) {
    if (!this.balances[user]) this.balances[user] = 0;
    if (this.balances[user] < amount) throw new Error("残高不足");
    this.balances[user] -= amount;
    return this.balances[user];
  },

  transfer(fromUser, toUser, amount) {
    this.withdraw(fromUser, amount);
    this.deposit(toUser, amount);
    return {
      from: this.getBalance(fromUser),
      to: this.getBalance(toUser)
    };
  }
};