const { writeFileSync } = require("node:fs");

const Save = async function(path) {

	return await new Promise((resolve, reject) => {

		try {

			writeFileSync(`${process.cwd()}/${path}`, JSON.stringify(require(`${process.cwd()}/${path}`), null, 4), error => {
				if (error) { reject(error); }
				else {
					resolve(`✅ Save ${process.cwd()}/${path} done.`);
				}
			});

		}

		catch (error) {
			reject(error);
		}

	});

};

module.exports = Save;