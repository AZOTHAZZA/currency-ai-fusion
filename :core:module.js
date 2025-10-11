import { mathematicalSilence } from './mathematical_silence.js';
import { foundation } from './foundation.js';
import { silenceTheory } from './silence_theory.js';

export const CoreModule = {
  // 全体統合管理
  async process(command) {
    // 基礎層で正規化
    const baseValue = foundation.normalize(command);

    // 数理的沈黙層で変換
    const silenceValue = silenceTheory.apply(baseValue);

    // 統合完結層で最終変換
    const finalValue = mathematicalSilence.integrate(silenceValue);

    return finalValue;
  }
};