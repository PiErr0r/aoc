
import math, copy, re, hashlib
from intcode import IntCode

GOAL = 19690720

def part_1(data):
	a = IntCode(data)
	print(a.data[0])

	print('END OF PART1')
	return

def part_2(data):
	ans = None
	# print(data[1:3])
	for j in range(100):
		if ans is not None:
			break

		for k in range(100):
			data[1] = j
			data[2] = k
			
			i = 0
			d = copy.deepcopy(data)
			d = IntCode(d)
			if d.data[0] == GOAL:
				ans = [j,k]
				break

	print(ans if ans is None else 100 * ans[0] + ans[1])

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('02_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	