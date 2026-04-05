const assert = require('node:assert/strict');
const {
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
} = require('../logic.js');

function values(fill) {
  return Object.fromEntries(strategyPillars.map((p) => [p.key, fill]));
}

assert.deepEqual(classifyScore(82), { label: 'Maturidade alta', className: 'level-ok' });
assert.deepEqual(classifyScore(60), { label: 'Maturidade média', className: 'level-warn' });
assert.deepEqual(classifyScore(20), { label: 'Maturidade baixa', className: 'level-bad' });

assert.equal(calculateWeightedScore(values(10)), 100);
assert.equal(calculateWeightedScore(values(0)), 0);

const mixed = {
  profileCompleteness: 8,
  categories: 7,
  reviews: 6,
  reviewReplies: 5,
  posts: 4,
  media: 7,
  qa: 3,
  conversion: 6,
  monitoring: 2
};
assert.equal(calculateWeightedScore(mixed), 55);

assert.equal(competitorGap({ reviews: 5 }, 20, 50), 40);
assert.equal(competitorGap({ reviews: 10 }, 120, 50), 0);

assert.deepEqual(getPriority(40), { level: 'Alta', text: 'Intervenção imediata' });
assert.deepEqual(getPriority(70), { level: 'Média', text: 'Otimização contínua' });
assert.deepEqual(getPriority(90), { level: 'Baixa', text: 'Manutenção e escala' });

const topActions = buildPriorityActions(mixed);
assert.equal(topActions.length, 3);
assert.match(topActions[0], /Monitoramento e rotina/);

assert.deepEqual(estimateRoiPotential(45, 30, 4.2), {
  level: 'Médio',
  text: 'Há oportunidade relevante com consistência operacional.'
});

const fit = calculateProspectFit({
  verificationStatus: 'notVerified',
  urgency: 8,
  hasTracking: 'no',
  hasWebsite: 'no',
  gap: 35,
  marketingBudget: 2
});
assert.equal(fit.level, 'Excelente');

const gaps = getDataGaps({
  profileUrl: '',
  decisionMaker: '',
  hasTracking: 'no',
  hasWebsite: 'no'
});
assert.equal(gaps.length, 4);

const script = generateApproachScript(
  {
    decisionMaker: 'Carla',
    businessName: 'Clínica Sorriso',
    region: 'Campinas',
    contactChannel: 'whatsapp'
  },
  ['Elevar "Monitoramento e rotina" de 2/10 para pelo menos 8/10.']
);
assert.match(script, /Carla/);
assert.match(script, /Clínica Sorriso/);

console.log('All logic tests passed.');
