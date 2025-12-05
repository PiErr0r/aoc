
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

/*
 * Graph algos to check out:
 * - karger
 * - kosaraju
 * - kruskal
 * - how to find cliques
 * - Dinic's
 * - Stoer–Wagner
 * - max-flow min-cut
 */

const kosaraju = (G) => {
	const L = [];
	const visited = new set();
	const dfs = (u) => {
		if (visited.has(u)) return;
		visited.add(u);
		if (u in G)
		iter(G[u], node => {
			dfs(node);
		})
		L.splice(0, 0, u);
	}
	dfs(keys(G)[0]);
	const ret = {};
	const assigned = new set();
	const assign = (u, root) => {
		if (assigned.has(u)) return;
		assigned.add(u)
		if (root in ret) ret[root].push(u);
		else ret[root] = [u];
		if (u in G)
		iter(G[u], node => {
			assign(node, root);
		})
	}
	iter(L, ll => {
		assign(ll, ll)
	})
	return ret;
}


 
// Function to check if the given set of vertices
// in store array is a clique or not
const is_clique = (G, b) => {
    // Run a loop for all the set of edges
    // for the select vertex
    for (let i = 0; i < b; i++) {
        for (let j = i + 1; j < b; j++)
 
            // If any edge is missing
            if (G[ store[i] ].indexOf( store[j] ) === -1)
            // if (graph[store[i]][store[j]] == 0)
                return false;
    }
    return true;
}

const store = empty(10000);

// Function to find all the cliques of size s
const findCliques = (G, K, i, l, s) => {
    // Check if any vertices from i+1 can be inserted
    for (let j = i + 1; j < K.length - (s - l); j++) {
 		// debug(K[j], j, K.length)
        // If the degree of the graph is sufficient
        if (G[ K[j] ].length > s - 1) {
 
            // Add the vertex to store
            store[l] = K[j];
 
            // If the graph is not a clique of size k
            // then it cannot be a clique
            // by adding another edge
            if (is_clique(l + 1))
 
                // If the length of the clique is
                // still less than the desired size
                if (l < s)
 
                    // Recursion to add vertices
                    findCliques(G, K, j, l + 1, s);
 
                // Size is met
                else
                    // print(l + 1);
                    debug(store.slice(0, 20))
        }
    }
}

// https://en.wikipedia.org/wiki/Karger%27s_algorithm

const karger = G => {
	// debug(G)
	while (keys(G).length > 2) {
		const KK = keys(G);
		const i = randint(KK.length);
		const ki = KK[i];
		const j = randint(G[ki].length);
		const kj = G[ki][j];
		// debug(ki, kj)
		iter(G[ki], node => {
			if (node === kj) return;
			// debug('ki',ki, node)
			const ii = G[node].indexOf(ki);
			G[node].splice(ii, 1);
			G[node].push(`${ki}-${kj}`)
		})
		iter(G[kj], node => {
			if (node === ki) return;
			// debug('kj',kj, node)
			const ii = G[node].indexOf(kj);
			G[node].splice(ii, 1);
			if (G[node].indexOf(`${ki}-${kj}`) === -1)
				G[node].push(`${ki}-${kj}`)
		});
		const nc = [...or(new set(G[ki]), new set(G[kj]))];
		let ii = nc.indexOf(ki);
		nc.splice(ii, 1)
		let jj = nc.indexOf(kj);
		nc.splice(jj, 1)
		delete G[ki];
		delete G[kj];
		// debug(nc)
		G[`${ki}-${kj}`] = nc;
		// debug(G)
	}
}

function part1(data) {

	let res = 0;
	data = lines(data);
	const G = {};
	iter(data, l => {
		let [f, r] = l.split(': ');
		let others = r.split(' ');
		if (!(f in G))
			G[f] = [];
		iter(others, o => {
			G[f].push(o);
			if (o in G)
				G[o].push(f);
			else
				G[o] = [f];
		})
	})
	// debug(kosaraju(G))
	// findCliques(G, keys(G), 0, 0, 5)
    // debug(karger(G));
    // debug(keys(G).map(k => k.split('-').length))

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("25_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
