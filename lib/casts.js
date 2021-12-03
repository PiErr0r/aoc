const bin = (n) => (n >>> 0).toString(2);
const float = (n) => Number(n);
const hex = (n) => (n >>> 0).toString(16);
const int = (n) => parseInt(n, 10);
const num = (n, b = 10) => parseInt(n, b);
const oct = (n) => (n >>> 0).toString(8);

module.exports = {
	bin,
	float,
	hex,
	int,
	num,
	oct,
}