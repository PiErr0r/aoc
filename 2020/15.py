
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def solve(data, part):
	i = 0
	spoken = {}
	prev, curr = None, None
	limit = 2020 if part == 1 else 30000000
	while i < limit:
		if i < len(data):
			curr = data[i]
			if prev is not None:
				spoken[prev[0]] = prev[1] + 1
			prev = (curr, i)
			i += 1
			continue

		curr = i - spoken.get(prev[0], i)
		spoken[prev[0]] = prev[1] + 1
		prev = (curr, i)
		i += 1

	print(curr)

	print(f'END OF PART{part}')
	return

if __name__ == '__main__':
	with open('15_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(",")))


	solve(copy.deepcopy(data), 1)
	# solve(copy.deepcopy(data), 2)
	