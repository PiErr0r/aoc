const int = (n) => Math.trunc(Number(n));
const float = (n) => Number(n);
const randint = (a, b) => (a + Math.floor(Math.random() * (b - a)));

module.exports = {
	int,
	float, 
	randint
}