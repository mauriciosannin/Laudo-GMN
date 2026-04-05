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

  function buildPriorityActions(values) {
    return strategyPillars
      .map((pillar) => ({
        label: pillar.label,
        score: clampScore(values[pillar.key])
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map((item) => `Elevar "${item.label}" de ${item.score}/10 para pelo menos 8/10.`);
  }

  function estimateRoiPotential(score, gap, businessRating) {
    const ratingPenalty = Math.max(0, 4.6 - Number(businessRating || 0)) * 12;
    const opportunity = Math.max(0, 120 - score - Math.min(gap, 80) - ratingPenalty);

    if (opportunity >= 45) return { level: 'Alto', text: 'Existe espaço claro para ganho de tráfego e leads locais.' };
    if (opportunity >= 20) return { level: 'Médio', text: 'Há oportunidade relevante com consistência operacional.' };
    return { level: 'Moderado', text: 'O perfil já está avançado; foco em manutenção e incremento fino.' };
  }

  function calculateProspectFit(prospect) {
    let score = 0;

    if (prospect.verificationStatus === 'notVerified') score += 20;
    if (Number(prospect.urgency) >= 7) score += 20;
    if (prospect.hasTracking === 'no') score += 15;
    if (prospect.hasWebsite === 'no') score += 10;
    if (Number(prospect.gap) >= 25) score += 20;
    if (Number(prospect.marketingBudget) >= 1) score += 15;

    if (score >= 75) return { score, level: 'Excelente', text: 'Lead quente para proposta completa de gestão local.' };
    if (score >= 50) return { score, level: 'Bom', text: 'Boa oportunidade, validar objeções comerciais na call.' };
    return { score, level: 'Baixo', text: 'Necessita educação prévia antes da proposta principal.' };
  }

  function getDataGaps(prospect) {
    const gaps = [];

    if (!prospect.profileUrl) gaps.push('URL do perfil GMN não informada.');
    if (!prospect.decisionMaker) gaps.push('Nome do decisor não preenchido.');
    if (prospect.hasTracking === 'no') gaps.push('Sem rastreamento de conversões ativo (GA4/Tag Manager).');
    if (prospect.hasWebsite === 'no') gaps.push('Sem website para apoio de relevância local e conversão.');

    return gaps.length ? gaps : ['Captação completa: nenhum dado crítico pendente.'];
  }

  function generateApproachScript(prospect, priorityActions) {
    const firstAction = priorityActions[0] || 'corrigir os principais pilares de visibilidade local';

    return `Oi ${prospect.decisionMaker}, analisei o perfil do(a) ${prospect.businessName} em ${prospect.region}. Hoje o principal ponto é ${firstAction.toLowerCase()}. Se alinharmos isso em 30 dias, a tendência é aumentar presença no mapa e contatos pelo ${prospect.contactChannel}. Posso te mostrar um plano simples em 15 minutos?`;
  }

  const api = {
    strategyPillars,
    classifyScore,
    calculateWeightedScore,
    competitorGap,
    getPriority,
    buildPriorityActions,
    estimateRoiPotential,
    calculateProspectFit,
    getDataGaps,
    generateApproachScript
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  globalScope.LaudoLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
