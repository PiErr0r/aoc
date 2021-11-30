function disp(grid) {
	for (let i = 0; i < grid.length; ++i) {
		if (Array.isArray(grid[i])) 
			console.log("%s", grid[i].join(''));
		else {
			console.log("%s", grid[i]);
		}
	}
	console.log();
}

function debug(...data) {
	let msg = '';
	const logData = [];
	data.forEach((dIn, data) => {
		if (Array.isArray(dIn)) {
			if (dIn.length) {
				if (typeof dIn[0] === 'object') {
					msg += '%s ';
				} else {
					msg += '%j ';
				}
			} else {
				msg += '%j ';
			}
		} else if (typeof dIn === 'number') {
			if (Number.isInteger(dIn)) {
				msg += '%d ';
			} else if (!Number.isNaN(dIn)) {
				msg += '%f ';
			} else {
				msg += '%o ';
			}
		} else if (typeof dIn === 'string') {
			msg += '%s ';
		} else {
			msg += dIn instanceof Set ? '%o ' : '%s ';
		}
		if (msg.endsWith('%s ') && typeof dIn === "object") {
			logData.push(JSON.stringify(dIn, null, 2));
		} else {
			logData.push(dIn);
		}

	});

	console.log(msg, ...logData);
}

module.exports.disp = disp;
module.exports.debug = debug;