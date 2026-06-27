export function processGpsStream(event: any) {
  return [event]
    .filter(e => e.latitude && e.longitude)
    .map(e => ({
      ...e,
      location: `${e.latitude.toFixed(4)}, ${e.longitude.toFixed(4)}`
    }))
    .reduce((acc, e) => e, {});
}
