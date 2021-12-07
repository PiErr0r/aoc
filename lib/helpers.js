const copy = (a) => (a.map(b => Array.isArray(b) ? copy(b) : b));

module.exports = {
	copy,
}