"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluator_1 = require("../rules/evaluator");
const rule_store_1 = require("../rules/rule-store");
const java_api_client_1 = require("../integration/java-api-client");
const router = (0, express_1.Router)();
router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.post('/rules', (req, res) => {
    const { ruleText } = req.body;
    // store rule (simplified)
    res.json({ message: 'Rule stored' });
});
router.post('/evaluate', (req, res) => {
    const { gpsData } = req.body;
    const rules = (0, rule_store_1.loadRules)();
    const result = (0, evaluator_1.evaluateRule)(rules, gpsData);
    res.json(result);
});
router.post('/shipments', async (req, res) => {
    const data = req.body;
    const result = await (0, java_api_client_1.callJavaApi)('POST', '/api/shipments', data);
    res.json(result);
});
exports.default = router;
