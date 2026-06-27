"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGpsStream = processGpsStream;
function processGpsStream(event) {
    return [event]
        .filter(e => e.latitude && e.longitude)
        .map(e => ({
        ...e,
        location: `${e.latitude.toFixed(4)}, ${e.longitude.toFixed(4)}`
    }))
        .reduce((acc, e) => e, {});
}
