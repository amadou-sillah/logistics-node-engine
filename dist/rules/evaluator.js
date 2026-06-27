"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateRule = evaluateRule;
function evaluateRule(rules, gpsData) {
    return rules.some(rule => rule.condition(gpsData));
}
