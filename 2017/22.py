from lib import disp
import math, copy, re, hashlib
import itertools as it

BURSTS1 = 10000
BURSTS2 = 10000000
DIRS = "NESW"
MOVES = {
	"N": (0, -1),
	"E": (1, 0),
	"S": (0, 1),
	"W": (-1, 0)
}

"""
# - infected
. - clean
~ - weakened
! - flagged
"""

NEWD = {
	'#': (1, '!'),
	'.': (-1, '~'),
	'~': (0, '#'),
	'!': (2, '.')
}

def get_dir(d, curr):
	i = DIRS.index(d)
	i += 1 if curr == '#' else -1
	return DIRS[i%4]

def get_pos(p, d):
	dx, dy = MOVES[d]
	return [p[0] + dx, p[1] + dy]


def get_ext_dir(d, curr):
	di = NEWD[curr][0]
	i = DIRS.index(d) + di
	return DIRS[i%4]

def part_1(data):
	l = len(data)
	M = 200
	GRID = [['.' for i in range(M*l)] for j in range(M*l)]
	for i in range(l):
		for j in range(l):
			GRID[l*M//2 + i][l*M//2 + j] = data[i][j]
	pos = [l // 2 + l*M//2, l // 2 + l*M//2]
	d = 'N'
	i = 0
	inf = 0
	
	while i < BURSTS1:
		[x, y] = pos
		# print(x, y)
		prev = GRID[y][x]
		if GRID[y][x] == '.':
			GRID[y][x] = '#'
			inf += 1
		else:
			GRID[y][x] = '.'

		d = get_dir(d, prev)
		pos = get_pos(pos, d)
		i += 1

	print(inf)
	print('END OF PART1')
	return

def part_2(data):
	l = len(data)
	M = 200
	GRID = [['.' for i in range(M*l)] for j in range(M*l)]
	for i in range(l):
		for j in range(l):
			GRID[l*M//2 + i][l*M//2 + j] = data[i][j]
	pos = [l // 2 + l*M//2, l // 2 + l*M//2]
	d = 'N'
	i = 0
	inf = 0
	
	while i < BURSTS2:
		[x, y] = pos
		# print(x, y)
		prev = GRID[y][x]
		GRID[y][x] = NEWD[prev][1]
		if GRID[y][x] == '#':
			inf += 1

		d = get_ext_dir(d, prev)
		pos = get_pos(pos, d)
		i += 1
	print(inf)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('22_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	