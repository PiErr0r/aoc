const swap = (arr, i1, i2) => {
	const tmp = arr[i1];
	arr[i1] = arr[i2];
	arr[i2] = tmp;
}

const reverse = (arr, i1, i2) => {
	const tmp = arr.slice(i1, i2);
	tmp.reverse();
	arr.splice(i1, i2-i1, ...tmp);
}

const next_permutation = (arr) => {
	if (arr.length === 0) return false;
	let i = 0;
	++i;
	if (i === arr.length) return false;
	i = arr.length;
	--i;

	while (true) {
		let j = i;
		--i;
		if (arr[i] < arr[j]) {
			let k = arr.length;
			while (!(arr[i] < arr[--k]))
				/* pass */;
			swap(arr, i, k);
			reverse(arr, j, arr.length);
			return true;
		}
		if (i === 0) {
			arr.reverse();
			return false;
		}
	}
}

const product = (a, b) => {
	const res = [];
	for (let i = 0; i < a.length; ++i) {
		for (let j = 0; j < b.length; ++j) {
			res.push([a[i], b[j]]);
		}
	}
	return res;
}

const _combinations_with_replacement = (p, j, r) => {
	if (r <= 0) return [];
	if (r > p.length || j >= p.length) return [];
	// console.log(j, r)
	const res = [];
	for (let i = j; i < p.length; ++i) {
		// console.log('#', i+1, r-1)
		const tmp = _combinations_with_replacement(p, i, r - 1);
		if (tmp.length === 0)
			res.push([p[i]]);
		tmp.forEach(t => {
			res.push([p[i], ...t]);
		})
	}
	return res;
}

const combinations_with_replacement = (p, r) => _combinations_with_replacement(p, 0, r);

const _combinations = (p, j, r) => {
	if (r <= 0) return [];
	if (r > p.length || j >= p.length) return [];
	const res = [];
	for (let i = j; i < p.length - r + 1; ++i) {
		const tmp = _combinations(p, i + 1, r - 1);
		if (tmp.length === 0) {
			res.push([p[i]]);
		}
		tmp.forEach(t => {
			res.push([p[i], ...t]);
		})
	}
	return res;	
}

const combinations = (p, r) => _combinations(p, 0, r);

const unique_permutations = (p) => {
	if (p.length <= 1) return p;

	const uniq = new Set(p);
	const res = []
	for (const first of uniq) {
		const remaining = Array.from(p);
		const i = remaining.indexOf(first);
		remaining.splice(i, 1);
		for (const subPerm of unique_permutations(remaining)) {
			res.push( [first].concat(subPerm) );
		}
	}
	return res;
}

module.exports = {
	combinations,
	combinations_with_replacement,
	next_permutation,
	product,
	unique_permutations,
}