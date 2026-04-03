(function (globalScope) {
  const strategyPillars = [
    { key: 'profileCompleteness', label: 'Perfil completo', weight: 1.25 },
    { key: 'categories', label: 'Categorias estratégicas', weight: 1.25 },
    { key: 'reviews', label: 'Volume e nota de avaliações', weight: 1.2 },
    { key: 'reviewReplies', label: 'Respostas às avaliações', weight: 0.9 },
    { key: 'posts', label: 'Constância de postagens', weight: 1.0 },
    { key: 'media', label: 'Qualidade de mídias', weight: 0.9 },
    { key: 'qa', label: 'Perguntas e respostas', weight: 0.8 },
    { key: 'conversion', label: 'Elementos de conversão', weight: 1.0 },
    { key: 'monitoring', label: 'Monitoramento e rotina', weight: 0.9 }
  ];

  function clampScore(value) {
    return Math.max(0, Math.min(10, Number(value) || 0));
  }

  function classifyScore(score) {
    if (score >= 80) return { label: 'Maturidade alta', className: 'level-ok' };
    if (score >= 55) return { label: 'Maturidade média', className: 'level-warn' };
    return { label: 'Maturidade baixa', className: 'level-bad' };
  }

  function calculateWeightedScore(values) {
    const totalWeight = strategyPillars.reduce((acc, item) => acc + item.weight, 0);
    const weighted = strategyPillars.reduce(
      (acc, item) => acc + clampScore(values[item.key]) * item.weight,
      0
    );

    return Math.round((weighted / totalWeight) * 10);
  }

  function competitorGap(values, businessReviewsCount, competitorReviewsAvg) {
    const reviewsGap = Math.max(0, Number(competitorReviewsAvg) - Number(businessReviewsCount));
    const scorePenalty = Math.max(0, 10 - clampScore(values.reviews)) * 2;
    return Math.round(reviewsGap + scorePenalty);
  }

  function getPriority(score) {
    if (score < 55) return { level: 'Alta', text: 'Intervenção imediata' };
    if (score < 80) return { level: 'Média', text: 'Otimização contínua' };
    return { level: 'Baixa', text: 'Manutenção e escala' };
  }

  const api = {
    strategyPillars,
    classifyScore,
    calculateWeightedScore,
    competitorGap,
    getPriority
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  globalScope.LaudoLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
     
