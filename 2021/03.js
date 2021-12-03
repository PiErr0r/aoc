
const fs = require('fs');
const { exec } = require("child_process");
const { ord, chr, count, debug, disp, int, num, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => {
	arr.sort(fn);
}
const in_ = (a, arr) => arr.indexOf(a) !== -1;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const binBigInt = (n) => {
	let res = 0n;
	for (let i = 0n; i < n.length; ++i) {
		if (n[i] === '1') {
			res += (1n << (BigInt(n.length) - i - 1n));
		}
	}
	return res;
}

function part1(data) {

	data = lines(data);
	let res = new Array(data[0].length).fill(0).map(a => 0n);

	iter(data,i => {
		range(i.length)(j => {
			res[j] += binBigInt(i[j]);
		}) 
	}); 

	let g = 0n, e = 0n, l = BigInt(res.length), d = BigInt(data.length);
	for (let i = 0n; i < res.length; ++i) {
		if (res[i] >= d / 2n) {
			g += (1n << (l - i - 1n));	
		} else {
			e += (1n << (l - i - 1n))
		}
	}

	// debug(g, e)
	debug(g * e)
	// debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const getCnt = (data, pos) => {
	let res = 0;
	iter(data,i => {
		res += i[pos] === '1';
	});

	return res >= data.length / 2;
}

function part2(data) {

	data = lines(data);
	let O = [...data], CO2 = [...data];

	let i = 0;
	while (i < O[0].length && O.length > 1) {
		const tmp = getCnt(O, i);
		O = O.filter(a => tmp ? a[i] === '1' : a[i] === '0');
		++i;
	}
	i = 0;
	while (i < CO2[0].length && CO2.length > 1) {
		const tmp = getCnt(CO2, i);
		CO2 = CO2.filter(a => !tmp ? a[i] === '1' : a[i] === '0');
		++i;
	}

	let res = num(O.join(''),2) * num(CO2.join(''), 2);
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");
	part1(data);
	part2(data);

	let dataBB = fs.readFileSync("03_bigboy").toString("utf-8");

	part1(dataBB);
	part2(dataBB);
	process.exit(0);
}

main();
