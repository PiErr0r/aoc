from disp import disp
import math, copy, re, hashlib
import itertools as it


def part_1(data):
	GRID = [["#" for i in range(400)] for j in range(400)]

	lets = [chr(i) for i in range(ord('a'), ord('z') + 1)] + [chr(i) for i in range(ord('A'), ord('Z') + 1)]
	li = 0
	for coords in data:
		x, y = map(int, coords.split(', '))
		GRID [y][x] = lets[li]
		li += 1
	lets = lets[:li]
	li = 0

	disp(GRID)

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('06_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	