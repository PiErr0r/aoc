
import math, copy, re, hashlib
#################################
# hint:
# bfs for point 0 to each point 
# and record path length
# then for each point make bfs 
# to every other point and 
# record the shortest path
# 
# maybe make a dict for each 
# and permute through the 
# possibilities ?
#################################

def part_1(data):

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('24_input') as f:
		data = f.read()
		data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	