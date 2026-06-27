export function evaluateRule(rules: any[], gpsData: any): boolean {
  return rules.some(rule => rule.condition(gpsData));
}
