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

module.exports = {
	next_permutation,	
}