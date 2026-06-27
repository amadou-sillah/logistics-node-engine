export function loadRules() {
  // In production, load from file/db
  return [
    { condition: (data: any) => data.latitude > 40.75, action: 'ALERT "North of city"' }
  ];
}
