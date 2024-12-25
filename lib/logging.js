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

function disp3(grid) {
	for (let z = 0; z < grid.length; z += 6) {
		for (let i = 0; i < grid[0].length; ++i) {
			let row = [];
			for (let k = z; k < z + 6 && k < grid.length; ++k) {
				row.push(grid[k][i].join(''));
			}
			console.log("%s", row.join(' '));
		}
		console.log();
	}
	console.log();
}

BigInt.prototype.toJSON = (n) => n.toString() + "n";
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
		} else if (typeof dIn === 'number' || typeof dIn === 'bigint') {
			if (typeof dIn === 'bigint') {
				msg += '%s ';
				dIn = dIn.toString() + "n";
			} else if (Number.isInteger(dIn)) {
				msg += '%d ';
			} else if (!Number.isNaN(dIn)) {
				msg += '%f ';
			} else {
				msg += '%o ';
			}
		} else if (typeof dIn === 'string') {
			msg += '%s ';
		} else {
			msg += dIn instanceof Set || dIn instanceof Map ? '%o ' : '%s ';
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
module.exports.disp3 = disp3;
module.exports.debug = debug;