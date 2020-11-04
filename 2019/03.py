
import math, copy, re, hashlib

# GRID = [["#" for j in range(10000)] for i in range(10000)]

def move(m):
	d = m[0]
	val = int(m[1:]) 

	if d == 'U':
		return (0, val)
	elif d == 'D':
		return (0, -1 * val)
	elif d == 'R':
		return (val, 0)
	elif d == 'L':
		return (-1 * val, 0)
	else:
		print("BAD STUFF HAPPENING")
		return (None, None)

def calc_dist(coord):
	return abs(coord[0]) + abs(coord[1])

def make_coords(data):
	curr_pos = (0, 0)
	coords = [curr_pos]
	for m in data:
		x, y = curr_pos
		dx, dy = move(m)
		curr_pos = (x + dx, y + dy)
		coords.append(curr_pos)

	return coords

def do_cross(line1, line2):
	x11, y11 = line1[0]
	x12, y12 = line1[1]
	x21, y21 = line2[0]
	x22, y22 = line2[1]

	if x11 == x12 and x21 == x22 or y11 == y12 and y21 == y22:
		return None
	else:
		if x11 == x12:
			if (y11 < y21 < y12 or y11 > y21 > y12) and (x21 > x12 and x22 < x12 or x22 > x12 and x21 < x12):
				return cross(line1, line2)
		else:
			if (x11 < x21 < x12 or x11 > x21 > x12) and (y21 > y12 and y22 < y12 or y22 > y12 and y21 < y12):
				return cross(line1, line2)
	return None

def cross(line1, line2):
	x11, y11 = line1[0]
	x12, y12 = line1[1]
	x21, y21 = line2[0]
	x22, y22 = line2[1]

	return (x11, y22) if x11 == x12 else (x22, y11)


def part_1(data):
	fst = data[0].split(',')
	snd = data[1].split(',')

	fst_coords = make_coords(fst)
	snd_coords = make_coords(snd)
	least = 2000 ** 2
	for i in range(len(fst_coords) - 1):
		fst_line = (fst_coords[i], fst_coords[i + 1])
		for j in range(len(snd_coords) - 1):
			snd_line = (snd_coords[j], snd_coords[j + 1])
			c = do_cross(fst_line, snd_line)
			if (c is not None):
				m_dist = calc_dist(c)
				if m_dist < least:
					least = m_dist


	print(least)
	print('END OF PART1')
	return

def part_2(data):

	fst = data[0].split(',')
	snd = data[1].split(',')

	fst_coords = make_coords(fst)
	snd_coords = make_coords(snd)
	least = 2000 ** 2
	steps = None
	fst_s = 0
	for i in range(len(fst_coords) - 1):
		fst_s += calc_dist((fst_coords[i+1][0] - fst_coords[i][0], fst_coords[i+1][1] - fst_coords[i][1]))
		fst_line = (fst_coords[i], fst_coords[i + 1])
		snd_s = 0
		for j in range(len(snd_coords) - 1):
			snd_s += calc_dist((snd_coords[j+1][0] - snd_coords[j][0], snd_coords[j+1][1] - snd_coords[j][1]))
			snd_line = (snd_coords[j], snd_coords[j + 1])
			c = do_cross(fst_line, snd_line)
			if (c is not None):
				cf = fst_s - calc_dist((fst_coords[i+1][0] - fst_coords[i][0], fst_coords[i+1][1] - fst_coords[i][1]))
				cf += calc_dist((c[0] - fst_coords[i][0], c[1] - fst_coords[i][1]))
				cs = snd_s - calc_dist((snd_coords[j+1][0] - snd_coords[j][0], snd_coords[j+1][1] - snd_coords[j][1]))
				cs += calc_dist((c[0] - snd_coords[j][0], c[1] - snd_coords[j][1]))

				steps = cf + cs
				if steps < least:
					least = steps
				# break		
		# if steps is not None:
		# 	break

	print(least)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('03_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	