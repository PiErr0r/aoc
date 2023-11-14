const ord = (c) => (c.charCodeAt(0));
const chr = (n) => (String.fromCharCode(n));
const count = (s, l) => {
	let cnt = 0;
	for (let i = 0; i < s.length; ++i) 
		if (s[i] === l)
			++cnt
	return cnt;
}

module.exports = {
	ord,
	chr,
	count,
}
