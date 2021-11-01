
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
			msg += '%o ';
		}
	});
	console.log(msg, ...data);
}

module.exports.debug = debug;