from lib import rl, disp
from time import sleep
import math, copy, re, hashlib
import itertools as it

def new_pos(p, v):
	return dict(pos=p, vel=v)

def display(pos, x, y):
	GRID = [['.' for i in range(70)] for j in range(15)]
	for p in pos:
		if p['pos'][1] - y < 0 or p['pos'][1] - y > 14:
			return 1
		if p['pos'][0] - x < 0 or p['pos'][0] - x > 69:
			return 1
		GRID[ p['pos'][1] - y ][ p['pos'][0] - x ] = '#'

	disp(GRID)
	return 0

#position=< 52484, -20780> velocity=<-5,  2>
def part_1(data):
	positions = []
	for d in data:
		x = int(d[10: 10+6])
		y = int(d[18: 18+6])
		dx = int(d[36: 36+2])
		dy = int(d[40: 40+2])
		positions.append(new_pos([x, y], (dx, dy)))

	seconds = 0

	while True:
		min_y = 100000
		min_x = 100000
		max_y = 0
		max_x = 0
		for i in rl(positions):
			positions[i]['pos'][0] += positions[i]['vel'][0]
			if positions[i]['pos'][0] < min_x:
				min_x = positions[i]['pos'][0]
			if positions[i]['pos'][0] > max_x:
				max_x = positions[i]['pos'][0]
			positions[i]['pos'][1] += positions[i]['vel'][1]
			if positions[i]['pos'][1] < min_y:
				min_y = positions[i]['pos'][1]
			if positions[i]['pos'][1] > max_y:
				max_y = positions[i]['pos'][1]
		# print(max_x, max_y, min_x, min_y)
		seconds += 1
		if abs(min_x - max_x) < 100 and abs(min_y - max_y) < 100:
			r = display(positions, min_x, min_y)
			if r == 0:
				print(seconds)
				break

	print('END OF PART1')
	return

def part_2(data):
	# the seconds in part_1 are for the part_2
	# its there because it is the only difference so not to copy paste the solution its there
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('10_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	