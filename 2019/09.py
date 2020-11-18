from intcode import IntCode
import math, copy, re, hashlib
import itertools as it


def part_1(data):

	boost = IntCode(data, [1])
	boost.calculate()

	print('END OF PART1')
	return

def part_2(data):

	boost = IntCode(data, [2])
	boost.calculate()

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('09_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	