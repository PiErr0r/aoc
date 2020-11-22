from lib import rl
import math, copy, re, hashlib
import itertools as it

STEPS = 1000

def combine_phased_rotations(a_period, a_phase, b_period, b_phase):
	"""Combine two phased rotations into a single phased rotation

	Returns: combined_period, combined_phase

	The combined rotation is at its reference point if and only if both a and b
	are at their reference points.
	"""
	gcd, s, t = extended_gcd(a_period, b_period)
	phase_difference = a_phase - b_phase
	pd_mult, pd_remainder = divmod(phase_difference, gcd)
	if pd_remainder:
		raise ValueError("Rotation reference points never synchronize.")

	combined_period = a_period // gcd * b_period
	combined_phase = (a_phase - s * pd_mult * a_period) % combined_period
	return combined_period, combined_phase


def arrow_alignment(red_len, green_len, advantage):
	"""Where the arrows first align, where green starts shifted by advantage"""
	period, phase = combine_phased_rotations(
		red_len, 0, green_len, -advantage % green_len
	)
	return -phase % period


def extended_gcd(a, b):
	"""Extended Greatest Common Divisor Algorithm

	Returns:
	    gcd: The greatest common divisor of a and b.
	    s, t: Coefficients such that s*a + t*b = gcd

	Reference:
	    https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm#Pseudocode
	"""
	old_r, r = a, b
	old_s, s = 1, 0
	old_t, t = 0, 1
	while r:
		quotient, remainder = divmod(old_r, r)
		old_r, r = r, remainder
		old_s, s = s, old_s - quotient * s
		old_t, t = t, old_t - quotient * t

	return old_r, old_s, old_t

def gcd(a, b):
	while b:
		a, b = b, a % b
	return a

def lcm(a, b):
	return (a * b) // gcd(a, b)

def parse(data):
	res = []
	vel = [0, 0, 0]
	for row in data:
		row = row.split(', ')
		moon = dict(pos=[], vel=vel[::])
		for pos in row:
			pos = int(pos.split('=')[1].replace('>', ''))
			moon['pos'].append(pos)
		res.append(moon)
	return res

def get_vel(data):
	for i in rl(data):
		vel = [0,0,0]
		for j in rl(data):
			if i == j: continue
			for axis in rl(data[i]['pos']):
				if data[j]['pos'][axis] > data[i]['pos'][axis]:
					vel[axis] += 1
				elif data[j]['pos'][axis] < data[i]['pos'][axis]:
					vel[axis] -= 1
		for v in rl(vel):
			data[i]['vel'][v] += vel[v]

	return data

def get_pos(data):
	for i in rl(data):
		for v in rl(data[i]['vel']):
			data[i]['pos'][v] += data[i]['vel'][v]
	return data

def get_energy(data):
	total = 0
	for i in rl(data):
		kin = 0
		pot = 0
		for p, v in zip(data[i]['pos'], data[i]['vel']):
			pot += abs(p)
			kin += abs(v)
		# print(f"pot: {pot:10}; kin: {kin:10}; total: {kin+pot:10}")
		total += kin * pot
	return total

def part_1(data):

	data = parse(data)
	for i in range(STEPS):
		data = get_vel(data)
		data = get_pos(data)

	E = get_energy(data)
	print(E)
	print('END OF PART1')
	return

def part_2(data):

	data = parse(data)
	init_pos = [[], [], [], []]
	steps = [None] * 4
	cnt = 0
	# while None in steps:
	while True:
		for i in rl(data):
			# if steps[i] is not None: continue
			init_pos[i].append(data[i]['pos'][::])
		data = get_vel(data)
		data = get_pos(data)
		# print(cnt, data)
		cnt += 1
		for i in rl(data):
			if steps[i] is not None and steps[i][2] > 50: continue
			try:
				ind = init_pos[i].index(data[i]['pos'])
				steps[i] = [ind, cnt, 1] if steps[i] is None else [ind, cnt, steps[i][2] + 1]
			except:
				pass
		print(cnt, steps)
	s = [p[0] for p in steps]
	ds = [p[1] for p in steps]


	print(steps)
	# l = steps[0]
	# for s in steps[1:]:
	# 	l = lcm(l, s[1])
	# print(l)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('12_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	