from lib import disp
from intcode import IntCode
import math, copy, re, hashlib
import itertools as it

"""
1 is a wall tile.  Walls are indestructible barriers.
2 is a block tile.  Blocks can be broken by the ball.
3 is a horizontal paddle tile.  The paddle is indestructible.
4 is a ball tile.  The ball moves 
"""
t= {
	0: ' . ',
	1: ' # ',
	2: ' * ',
	3: '___',
	4: ' o '
}

def part_1(data):
	game = IntCode(data, [])
	game.calculate()
	screen = game.get_output(-1)

	i = 0
	cnt = 0
	while i < len(screen):
		[x, y, tile] = screen[i:i + 3] 
		if tile == 2:
			cnt += 1
		i += 3
	print(cnt)
	# disp(GRID)
	print('END OF PART1')
	return

def part_2(data):
	data[0] = 2
	game = IntCode(data, [])
	game.calculate()
	

	i = 0
	cnt = 0
	GRID = [[' . ' for i in range(44)] for j in range(23)]
	while not game.is_halted() and cnt < 10:
		screen = game.get_output(-1)
		i = 0
		while i < len(screen):
			[x, y, tile] = screen[i:i + 3] 
			if x == -1 and y == 0:
				print(tile)
				i += 3
				continue
			GRID[y][x] = t[tile]
			i += 3
		disp(GRID)
		game.unpause([0, 0, 0])
		game.calculate()
		cnt += 1

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('13_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	