// solves josephus problem: https://en.wikipedia.org/wiki/Josephus_problem
const joseph = (n, q) => {
	let D = 1;
	while (D <= (q-1) * n) {
		D = Math.ceil(D * q / (q-1));
	}
	return q * n + 1 - D
}