
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

M = {
	'e': (1, 0),
	'w': (-1, 0),
	'ne': (1, 1),
	'nw': (0, 1),
	'sw': (-1, -1),
	'se': (0, -1)
}

def rl(arr):
	return range(len(arr))

def parse(d):
	ret = []
	for i, tile in enumerate(d):
		j = 0
		tile_p = []
		while j < len(tile):
			if tile[j] in ['e', 'w']:
				tile_p.append(tile[j])
				j += 1
			else:
				tile_p.append(tile[j:j+2])
				j += 2
		ret.append(tile_p[::])
	return ret

def get_pos(tile):
	start = [0, 0]
	for t in tile:
		dx, dy = M[t]
		start[0] += dx
		start[1] += dy
	return tuple(start)

def part_1(data):

	data = parse(data)
	T = {}
	# white = True, black = False
	for tile in data:
		pos = get_pos(tile)
		try:
			T[pos] = not T[pos]
		except:
			T[pos] = False

	cnt = 0
	for p in T.keys():
		if not T[p]:
			cnt += 1
	print(cnt)
	print('END OF PART1')
	part_2(T)
	return

def get_curr(T, pos):
	cnt = 0
	for m in M.keys():
		dx, dy = M[m]
		cp = (pos[0] + dx, pos[1] + dy)
		cnt += T.get(cp, True)
	if (c := T.get(pos, True)):
		return not c if 6 - cnt == 2 else c
	else:
		return not c if cnt == 6 or 6 - cnt > 2 else c


def part_2(T):

	for _ in range(100):
		print(_)
		NT = {}
		for pos in T.keys():
			NT[pos] = False
			neighs = []
			for m in M.keys():
				dx, dy = get_pos([m])
				neighs.append((pos[0] + dx, pos[1] + dy))
			for n in neighs:
				NT[n] = False
		for pos in NT.keys():
			NT[pos] = get_curr(T, pos)
		T = NT

	cnt = 0
	for p in T.keys():
		if not T[p]:
			cnt += 1
	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('24_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	