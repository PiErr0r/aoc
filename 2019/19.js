
var fs = require('fs');
var { ord, chr, debug, disp, range, drange, trange, int, float, randint, set } = require("../helpers");
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
var { IntCode } = require('./intcode');

function part1(data) {
	let cnt = 0;
	const inData = [];
	drange(50)((i,j) => {
		inData.push(i, j);
		const game = new IntCode([...data], [i, j]);
		game.calculate();
		cnt += game.getOutput(-1)[0];
	})
	debug(cnt)
	console.log("END OF PART1");
	return;
}

const DIRS = [[99, 0], [0, -99], [99, -99]];

const checkFit = (data, x, y) => {
	const res = [];
	for (let d of DIRS) {
		const [dx, dy] = d;
		let nx = x + dx;
		let ny = y + dy;
		const game = new IntCode([...data], [nx, ny]);
		game.calculate();
		res.push(game.getOutput(-1)[0]);
	}
	return res.every(r => r);
}

function part2(data) {
	let pos = [5,20];
	let res;
	while (true) {
		let tmp = 0;
		let [x, y] = pos;
		++y;
		while (!tmp) {
			++x;
			const game = new IntCode([...data], [x, y]);
			game.calculate();
			tmp = game.getOutput(-1)[0];
		}
		debug(pos, x, tmp)
		if (checkFit(data, x, y)) {
			res = [x, y - 99];
			break;
		}
		pos = [int(y/2), y];
	}

	debug(res[0] * 10000 + res[1]);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("19_input").toString("utf-8");
	// data = data.split('\n');
	data = data.split(',').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
