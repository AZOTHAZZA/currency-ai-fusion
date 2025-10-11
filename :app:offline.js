export function checkOffline() {
  return !navigator.onLine;
}

// オフライン時に特定処理をキューに溜めてオンライン復帰時に同期する場合の補助
export const OfflineQueue = {
  queue: [],
  
  add(command) {
    this.queue.push(command);
  },

  async flush(callback) {
    while(this.queue.length > 0) {
      const cmd = this.queue.shift();
      await callback(cmd);
    }
  }
};