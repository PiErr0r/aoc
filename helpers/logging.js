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
	data.forEach(dIn => {
		if (typeof dIn === 'number') {
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
			msg += dIn instanceof Set ? '%o ' : '%j ';
		}
	});
	console.log(msg, ...data);
}

module.exports.disp = disp;
module.exports.debug = debug;