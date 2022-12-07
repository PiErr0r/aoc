
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const findLevel = (p) => {
	if (p === "/") return [0,0];
	let level = 0;
	let last = 0;
	let i = 0;
	while (i < p.length) {
		if (p[i] === "/") {
			++level;
			last = i;
		}
		++i;
	}
	return [level, last];
}

const MOST = 100000;

const findDirectChildren = (fileTree, curr) => {
	const [level, _] = findLevel(curr);
	const fi = fileTree.findIndex(d => d.name === curr);
	const children = [];
	range(fi, fileTree.length)(i => {
		if (!fileTree[i].name.startsWith(curr)) {
			return;
		}
		const [l, _] = findLevel(fileTree[i].name);
		if (l === level + 1) {
			children.push({ i, name: fileTree[i].name })
		}
	});
	return [children, fi];
}

const calcSize = (fileTree, curr) => {
	const [children, fi] = findDirectChildren(fileTree, curr);
	let size = 0;
	iter(children, c => {
		if (fileTree[c.i].type === 'f') {
			size += fileTree[c.i].size;
		} else {
			size += calcSize(fileTree, c.name);
		}
	});
	fileTree[fi].size = size;
	return size;
}

function part1(data) {
	data = lines(data);
	let res = 0;
	const fileTree = [{ name: "/", size: null, type: "d" }];
	let parent = "";
	iter(data, row => {
		if (row[0] === "$") {
			if (row.slice(2, 4) === "cd") {
				const [_, __, dir] = row.split(" ");
				if (dir === "..") {
					const [depth, lastSlash] = findLevel(parent);
					if (depth >= 2) {
						parent = parent.slice(0, lastSlash);
					} else {
						parent = '/';
					}
				} else {
					if (parent === "") {
						parent = dir;
					} else  if (parent === "/") {
						parent += dir;
					} else {
						parent += "/" + dir;
					}
				}
			} else {
				// continue
			}
		} else {
			if (row.slice(0, 3) === "dir") {
				const [_, name] = row.split(" ");
				fileTree.push({ name: parent + (parent === "/" ? "" : "/") + name, size: null, type: "d" });
			} else {
				const [size, name] = row.split(" ");
				fileTree.push({ name: parent + (parent === "/" ? "" : "/") + name, size: int(size), type: "f" });
			}
		}
	});

	calcSize(fileTree, "/")
	iter(fileTree, file => {
		res += (file.type === 'd' && file.size <= MOST ? file.size : 0);
	})
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(fileTree);
}

function part2(fileTree) {
	const available = 70000000;
	const used = fileTree[0].size;
	const toFree = 30000000 - (available - used);
	let res = used + 1;
	iter(fileTree, row => {
		if (row.type === 'f') return;
		if (row.size >= toFree) res = min(res, row.size);
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const setSize = (tree, p, size) => {
	while (p !== null) {
		tree[p].size += size;
		p = tree[p].p;
	}
}

const solve = (data) => {
	data = lines(data);
	let i = 0;
	const tree = { '-/': { p: null, size: 0 }};
	let p = '';
	while (i < data.length) {
		const tmp = data[i].split(" ");
		switch (tmp[1]) {
			case "cd":
				if (tmp[2] === '..') {
					p = tree[p].p;
				} else {
					p += '-' + tmp[2];
				}
				break;
			case "ls":
				++i;
				while (i < data.length && data[i][0] !== "$") {
					let [desc, name] = data[i].split(" ");
					switch (desc) {
						case "dir":
							tree[p + '-' + name] = { p, size: 0 };
							break;
						default:
							desc = int(desc);
							setSize(tree, p, desc);
					}
					// debug(i)
					++i;
				}
				continue;
		}
		++i;
	}
	let res = 0;
	const available = 70000000;
	const used = tree['-/'].size;
	const toFree = 30000000 - (available - used);
	let mn = used + 1;
	keys(tree).forEach(k => {
		if (tree[k].size <= MOST) res += tree[k].size;
		if (tree[k].size >= toFree) mn = min(mn, tree[k].size);
	});
	debug(res);
	console.log("END OF PART1");
	debug(mn);
	console.log("END OF PART2");
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");

	// part1(data);
	solve(data);
	// part2(data);
	process.exit(0);
}

main();
