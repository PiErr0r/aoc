"""
    space = dict()

    for y, f in enumerate(enumerate(l.rstrip()) for l in open(0)):
        for x, c in f:
            space[(x, y, 0, 0)] = c == '#'

    def neighbours(p):
        for dx in range(-1, 2):
            for dy in range(-1, 2):
                for dz in range(-1, 2):
                    for dw in range(-1, 2):
                        if dx == 0 and dy == 0 and dz == 0 and dw == 0:
                            continue
                        yield (p[0] + dx, p[1] + dy, p[2] + dz, p[3] + dw)

    def occ(p):
        o = 0
        for p in neighbours(p):
            if space.get(p, False):
                o += 1
        return o

    for cycle in range(6):
        occupied = dict()
        for p in {p for cell in space.keys() for p in neighbours(cell)}:
            occupied[p] = occ(p)
        for p, o in occupied.items():
            if space.get(p, False) and not (o == 2 or o == 3):
                space[p] = False
            elif not space.get(p, False) and o == 3:
                space[p] = True
        print(cycle)
    print(sum(space.values()))
"""


import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import disp, check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def get_pos(g, coord):
	z, y, x = coord
	curr = g[z][y][x]
	cnt = 0
	for i in range(-1, 2):
		for j in range(-1, 2):
			for k in range(-1, 2):
				if i == 0 and j == 0 and k == 0:
					continue
				if g[z+i][y+j][x+k] == '#':
					cnt += 1

	if curr == '#':
		if cnt in [2, 3]:
			return curr
		else: 
			return '.'
	else:
		if cnt == 3:
			return '#'
		else:
			return curr

def get_pos4(g, coord):
	w, z, y, x = coord
	curr = g[w][z][y][x]
	cnt = 0
	for i in range(-1, 2):
		for j in range(-1, 2):
			for k in range(-1, 2):
				for l in range(-1, 2):
					if i == 0 and j == 0 and k == 0 and l == 0:
						continue
					if g[w+i][z+j][y+k][x+l] == '#':
						cnt += 1

	if curr == '#':
		if cnt in [2, 3]:
			return curr
		else: 
			return '.'
	else:
		if cnt == 3:
			return '#'
		else:
			return curr

def do_cycle(g):
	ng = copy.deepcopy(g)
	for i in rl(g):
		if i == 0 or i == len(g) - 1:
			continue
		for j in rl(g[0]):
			if j == 0 or j == len(g[0]) - 1:
				continue
			for k in rl(g[0][0]):
				if k == 0 or k == len(g[0][0]) - 1:
					continue
				ng[i][j][k] = get_pos(g, (i, j, k))
				# print(ng[i][j][k], g[i][j][k])
	return ng

def part_1(data):
	data = [list(i) for i in data]
	grid = []
	for i in range(20):
		plane = []
		for j in range(50):
			if i == 10 and 25 <= j < 25 + len(data):
				row = ['.' for _ in range(25)] + data[j - 25][::] + ['.' for i in range(50 - 25 - len(data))]
			else:
				row = ['.' for _ in range(50)]
			plane.append(row[::])
		grid.append(plane[::])

	for cycle in range(6):
		grid = do_cycle(grid)

	cnt = 0
	for plane in grid:
		for row in plane:
			for item in row:
				if item == '#':
					cnt += 1
	print(cnt)
	print('END OF PART1')
	return

def do_cycles4(cells):
	nc = {}
	for k in cells.keys():
		nc(k)

def part_2(data):
	data = [list(i) for i in data]
	cells = {}
	for i in rl(data):
		for j in rl(data[0]):
			cells[(j, i, 0, 0)] = data[i][j] == '#'

	for _ in range(6):
		cells = do_cycle4(cells)

	
	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('17_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	