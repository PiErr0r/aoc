from lib import disp, rl
import math, copy, re, hashlib
import itertools as it


def man_dist(l1, l2):
	return abs(l1[0] - l2[0]) + abs(l1[1] - l2[1])

def get_bordered(g):
	border = set()
	l = len(g) - 1
	for i in rl(g):
		border |= {g[0][i], g[l][i], g[i][0], g[i][l]}
	return list(border)

def get_max_area(g, border):
	areas = dict()
	for i in rl(g):
		for j in rl(g[i]):
			l = g[i][j]
			if l == '.' or l in border: continue
			try:
				areas[l] += 1
			except:
				areas[l] = 1
	maxi = 0
	for k in areas.keys():
		if areas[k] > maxi:
			maxi = areas[k]
	return maxi

def part_1(data):
	GRID = [["." for i in range(400)] for j in range(400)]

	lets = [chr(i) for i in range(ord('a'), ord('z') + 1)] + [chr(i) for i in range(ord('A'), ord('Z') + 1)]
	li = 0
	# array of tuples (letter, x-coord, y-coord)
	locations = []
	for coords in data:
		x, y = map(int, coords.split(', '))
		locations.append((lets[li], x, y))
		GRID [y][x] = lets[li]
		li += 1
	lets = lets[:li]
	li = 0

	for i in rl(GRID):
		for j in rl(GRID[i]):
			mini = 400 ** 2
			s_mini = None
			closest = None
			for loc in locations:
				l, x, y = loc
				if (d:=man_dist((i, j), (y, x))) <= mini:
					s_mini = mini
					mini = d
					closest = l
			if s_mini != mini:
				GRID[i][j] = closest

	border = get_bordered(GRID)
	maxi = get_max_area(GRID, border)

	print(maxi)
	print('END OF PART1')
	return

def is_under_n(coord, n, locs):
	suma = 0
	for l in locs:
		suma += man_dist(coord, l)

	return suma < n


def part_2(data):
	GRID = [["." for i in range(800)] for j in range(800)]
	locations = []
	for coords in data:
		x, y = map(lambda x: int(x) + 200, coords.split(', '))
		locations.append((x, y))

	cnt = 0
	n = 10000
	for i in rl(GRID):
		for j in rl(GRID[i]):
			if is_under_n((i, j), n, locations):
				cnt += 1

	print(cnt)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('06_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	