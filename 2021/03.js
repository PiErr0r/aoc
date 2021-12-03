
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

function part1(data) {

	data = lines(data);
	let res = empty(data[0].length);

	iter(data)(i => {
		range(i.length)(j => {
			res[j] += int(i[j]);
		}) 
	}); 

	let g = num(res.map(a => a >= data.length / 2 ? '1' : '0').join(''), 2);
	let e = num(res.map(a => a > data.length / 2 ? '0' : '1').join(''), 2);
	res = g*e;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const getCnt = (data, pos) => {
	let res = 0;
	iter(data)(i => {
		res += i[pos] === '1';
	});

	return res >= data.length / 2;
}

function part2(data) {

	data = lines(data);
	let res;


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

	res = num(O.join(''),2) * num(CO2.join(''), 2);
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");

	part1(data);
	part2(data);

}

main();
