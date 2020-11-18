
import math, copy, re, hashlib
import itertools as it


MAXI = 43

def is_prime(n):
	for i in range(2, math.floor(math.sqrt(n)) + 1):
		if n % i == 0:
			return False
	return True

primes = [0, 1, -1]
for i in range(2, MAXI):
	if is_prime(i):
		primes += [i, -i]

def gcd(a, b):
	while b:
		a, b = b, a % b
	return a

def rel_prime(m, n):
	return gcd(m, n) in [1, -1]

def get_visible(data, coords):
	x, y = coords
	v = 0
	for i in range(-(MAXI - 1), MAXI):
		for j in range(-(MAXI - 1), MAXI):
			if i == 0 and j == 0: continue
			if not rel_prime(abs(i), abs(j)): continue
			dx = x + i
			dy = y + j
			while 0 <= dx < MAXI and 0 <= dy < MAXI:
				if data[dy][dx] == '#':
					v += 1
					break
				dx += i
				dy += j

	return v


def part_1(data):

	maxi = 0
	coords = (0, 0)

	for y in range(len(data)):
		row = data[y]
		for x in range(len(row)):
			if row[x] == '.':
				continue
			v = get_visible(data, (x, y))
			# print(v, (x, y))
			if v > maxi:
				maxi = v
				coords = (x, y)
	print(maxi, coords)
	print('END OF PART1')
	part_2(data, coords)
	return

def vap(data, dirs, coords):
	# Should return the coords of the vaporized meteor too but f it
	x, y = coords
	dx, dy = dirs
	cx = x + dx
	cy = y + dy
	is_vap = False
	while 0 <= cx < MAXI and 0 <= cy < MAXI:
		if data[dy][dx] == '#':
			data[dy][dx] = '.'
			is_vap = True
			break
		cx += dx
		cy += dy
	return is_vap

def disp(data):
	for r in data:
		for c in r:
			print(str(c).ljust(4), end="")
		print()
	print()

def vaporize(data, coords):
	x, y = coords
	# xs = [[i for i in range(1, MAXI)], [i for i in range(MAXI - 1, 0, -1)], [i for i in range(-1, -MAXI, -1)], [i for i in range(-MAXI + 1, 0)]]
	# ys = [[i for i in range(-MAXI + 1, 0)], [i for i in range(1, MAXI)], [i for i in range(MAXI - 1, 0, -1)], [i for i in range(-1, -MAXI, -1)]]

	xs = [list(range((MAXI * 2))), list(range(1, (MAXI * 2))), list(range(-(MAXI * 2) + 1, 1)), list(range(-(MAXI * 2) + 1, 0))]
	ys = [list(range(-(MAXI * 2) + 1, 0)), list(range((MAXI * 2))), list(range(1, (MAXI * 2))), list(range(-(MAXI * 2) + 1, 1))]

	nils = [(0, 1), (1, 0), (0, -1), (-1, 0)]
	cnt = 0
	vap_cnt = 0
	res_coords = (0,0)
	for px, py in zip(xs, ys):
		ret = vap(data, nils[cnt % 4], coords)
		combs = [(i, j) for i in px for j in py]
		dirs = sorted(list(combs), key=lambda p: math.atan2(p[1], p[0]))
		print(len(dirs))
		for d in dirs:
			i, j = d
			if not rel_prime(i, j): continue
			dx = x + i
			dy = y + j
			while 0 <= dx < MAXI and 0 <= dy < MAXI:
				if data[dy][dx] == '#':
					vap_cnt += 1
					data[dy][dx] = vap_cnt
					res_coords = (dx, dy)
					if vap_cnt in [1, 2, 3, 10, 20, 50, 100] or vap_cnt > 190:
						print(cnt, vap_cnt, res_coords)
					break
				dx += i
				dy += j
			if vap_cnt == 200: break
		cnt += 1
	return res_coords

def part_2(data, coords):
	data = [list(r) for r in data]
	c = vaporize(data, coords)
	print (c[0] * 100 + c[1])
	# disp(data)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('10_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))

	MAXI = len(data)
	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	