import { Router } from 'express';
import { evaluateRule } from '../rules/evaluator';
import { loadRules } from '../rules/rule-store';
import { callJavaApi } from '../integration/java-api-client';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.post('/rules', (req, res) => {
  const { ruleText } = req.body;
  // store rule (simplified)
  res.json({ message: 'Rule stored' });
});

router.post('/evaluate', (req, res) => {
  const { gpsData } = req.body;
  const rules = loadRules();
  const result = evaluateRule(rules, gpsData);
  res.json(result);
});

router.post('/shipments', async (req, res) => {
  const data = req.body;
  const result = await callJavaApi('POST', '/api/shipments', data);
  res.json(result);
});

export default router;
