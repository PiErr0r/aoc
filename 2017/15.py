
import math, copy, re

FACTOR_A = 16807
FACTOR_B = 48271
DIV = 2147483647

def part_1(data):

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('15_input') as f:
		data = f.read()
		data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	