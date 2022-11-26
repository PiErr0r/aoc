var fs = require('fs');
var { debug } = require("../lib");

function part1(data) {


	console.log("END OF PART1");
	return;
}

const FFT = (data) => {
	const res = new Array(data.length);
	let S = 0;
	for (let i = data.length - 1; i >= 0; --i) {
		S = (S + data[i]) % 10;
		res[i] = S;
	}
	return res;
}

function part2(data) {
	let seq = (new Array(10000)).fill(data).join('').split('').map(n => Number(n));
	const goal = Number(data.substr(0, 7));

	for (let i = 0; i < 100; ++i) {
		seq = FFT(seq);
		// console.log(i, "end")
	}

	debug(seq.slice(goal, goal + 8).join(''))
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("16_input").toString("utf-8");
	// data = data.split('\n');
	// data = data.split('').map(a => Number(a));

	part1(data);
	part2(data);
}

main();
