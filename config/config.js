'use strict';

const fs = require('fs');
const path = require('path');

const cwd = process.env.WEBHOOK_BOT_CWD || process.cwd();
const configPath = path.join(cwd, 'config');
let config;
try {
  config = require(configPath);
} catch (_) {
  config = {};
}
config.cwd = cwd;

module.exports = config;
