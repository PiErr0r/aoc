const bin = (n) => (n >>> 0).toString(2);
const float = (n) => Number(n);
const int = (n) => parseInt(n, 10);
const num = (n, b = 10) => parseInt(n, b);

module.exports = {
	bin,
	float,
	int,
	num,
}