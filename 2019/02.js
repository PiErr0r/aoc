var fs = require('fs');
var { debug, range, drange } = require("../helpers");
var { IntCode } = require("./intcode");

const GOAL = 19690720;

function part1(data) {
	const game = new IntCode(data);
	game.calculate();
	debug(game.data[0]);

	console.log("END OF PART1");
	return;
}

function part2(data) {
	let ans, cnt = 0;
	drange(0, 100)((i, j) => {
		data[1] = i;
		data[2] = j;
		const gameData = Array.from(data);
		const game = new IntCode(gameData);
		game.calculate();
		if (game.data[0] === GOAL) {
			ans = [i, j]
			return true;
		}
	})

	debug(100 * ans[0] + ans[1]);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("02_input").toString("utf-8");
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
