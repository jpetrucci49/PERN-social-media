const utils = require('./authHelpers');
const { requireAuth } = require('./passport_config');

module.exports = { ...utils, requireAuth };
