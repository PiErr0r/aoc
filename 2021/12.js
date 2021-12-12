
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, copy } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const isUpper = (s) => s.match(/[A-Z]/g) !== null;

let smallTwice = false

const dfs = (G, node, is2) => {
	if (node === 'end') return 1;
	let res = 0;
	let didGo = false;
	let didSet = false;

	iter(G[node].children, cave => {
		if (cave === 'start') return;
		if (G[cave].isSmall && (is2 && G[cave].visited < 2 && !smallTwice || !G[cave].visited) || !G[cave].isSmall) {
			didGo = true;
			G[cave].visited++;
			if (is2 && G[cave].isSmall && G[cave].visited === 2) {
				smallTwice = true;
				didSet = true;
			}

			res += dfs(G, cave, is2);
			if (is2 && didSet) {
				smallTwice = false;
				didSet = false;
			}
			G[cave].visited--;
		} else {
			// do nothing?
		}
	})

	return didGo ? res : 0;
}

const makeGraph = (data) => {
	const G = {};
	iter(data, conn => {
		const [c1, c2] = conn;
		if (G[c1]) {
			G[c1].children.push(c2);
		} else {
			G[c1] = { children: [c2], isSmall: !isUpper(c1), visited: 0 };
		}
		if (G[c2]) {
			G[c2].children.push(c1);
		} else {
			G[c2] = { children: [c1], isSmall: !isUpper(c2), visited: 0 };
		}
	});
	return G;
}

function part1(data) {
	data = parse(data, 'w-w');

	let res;
	const G = makeGraph(data);

	G['start'].visited = true;
	res = dfs(G,'start', false);
	debug(res);
	res = dfs(G,'start', true);
	debug(res);

	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("12_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
