const rateLimits = require("../data/rateLimits.json");
const Save = require("./Save");

const isRateLimited = function() {

	if (!rateLimits.lastRequest || Date.now() - rateLimits.lastRequest >= 60000) {
		rateLimits.lastRequest = Date.now();
		rateLimits.ratelimit = 0;
		Save("node_modules/metamob.api/data/rateLimits.json");
	}

	if (rateLimits.ratelimit >= 60) {
		return true;
	}
	else {
		rateLimits.ratelimit += 1;
		Save("node_modules/metamob.api/data/rateLimits.json");
		return false;
	}

};

module.exports = isRateLimited;