"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRules = loadRules;
function loadRules() {
    // In production, load from file/db
    return [
        { condition: (data) => data.latitude > 40.75, action: 'ALERT "North of city"' }
    ];
}
