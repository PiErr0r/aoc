
import math, copy, re, hashlib
from intcode import IntCode

def part_1(data):

	a = IntCode(data, [1])

	print('END OF PART1')
	return

def part_2(data):

	a = IntCode(data, [5])

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('05_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	