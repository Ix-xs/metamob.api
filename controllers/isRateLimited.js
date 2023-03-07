const rateLimits = require("../data/rateLimits.json");
const Save = require("./Save");

const isRateLimited = function() {

	if (!rateLimits.lastRequest || Date.now() - rateLimits.lastRequest >= 60000) {
		rateLimits.lastRequest = Date.now();
		rateLimits.ratelimit = 0;
		Save("data/rateLimits.json");
	}

	if (rateLimits.ratelimit >= 60) {
		return true;
	}
	else {
		rateLimits.ratelimit += 1;
		Save("data/rateLimits.json");
		return false;
	}

};

module.exports = isRateLimited;