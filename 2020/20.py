
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

UP = 0
RIGHT = 1
DOWN = 2
LEFT = 3

def get_tiles(d):
	ret = []
	for tile in d:
		if len(tile.strip()) == 0: continue
		tile = tile.split('\n')
		id = int(tile[0][5:-1])
		t = {
			'id': id,
			'tile': tile[1::],
			'pos': None,
			'neigh': [set() for _ in range(4)]
		}
		# neigh: [UP, RIGHT, DOWN, LEFT]
		ret.append(t)
		
	return ret

def are_lr(t1, t2):
	return "".join([r[-1] for r in t1['tile']]) == "".join([r[0] for r in t2['tile']])

def are_ud(t1, t2):
	return t1['tile'][-1] == t2['tile'][0]

def part_1(data):

	tiles = get_tiles(data)
	for i, tf in enumerate(tiles):
		for j, ts in enumerate(tiles):
			if i == j: continue
			if are_lr(tf, ts):
				tiles[i]['neigh'][RIGHT] |= {ts['id']}
				tiles[j]['neigh'][LEFT] |= {tf['id']}

			if are_lr(ts, tf):
				tiles[i]['neigh'][LEFT] |= {ts['id']}
				tiles[j]['neigh'][RIGHT] |= {tf['id']}

			if are_ud(tf, ts):
				tiles[i]['neigh'][DOWN] |= {ts['id']}
				tiles[j]['neigh'][UP] |= {tf['id']}
				
			if are_ud(ts, tf):
				tiles[i]['neigh'][UP] |= {ts['id']}
				tiles[j]['neigh'][DOWN] |= {tf['id']}
	[print(t) for t in tiles]

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('20_input') as f:
		data = f.read()
		data = data.split('\n\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	