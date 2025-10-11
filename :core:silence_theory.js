export const silenceTheory = {
  apply(value) {
    // 数理的沈黙層：ゼロ・無限・有限の融合を概念化
    return Math.tanh(value * 10); // 本実装として非線形変換
  }
};