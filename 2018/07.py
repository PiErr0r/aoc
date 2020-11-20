from lib import rl
import math, copy, re, hashlib
import itertools as it


def parse(data):
	n_data = dict()
	first = "Step "
	second = " must be finished before step "
	for row in data:
		x = row[len(first)]
		y = row[len(first) + 1 + len(second)]
		try:
			n_data[x].append(y)
		except:
			n_data[x] = [y]

		try:
			n_data[y]
		except:
			n_data[y] = []

	return n_data

def has_requirements(key, data):
	for k in data.keys():
		if k == key: continue
		if key in data[k]:
			return True
	return False

def remove_old(cset, data):
	for k in list(cset):
		data.pop(k)
	return data

def all_empty(d):
	for i in d.keys():
		if len(d[i]) != 0:
			return False
	return True

def part_1(data):

	data = parse(data)
	res = ""
	while len(data):
		keys = list(data.keys())
		curr = set()
		i = 0
		while i < len(keys):
			k = keys[i]
			if not has_requirements(k, data):
				curr |= {k}
			i += 1
		
		smallest = min(curr)
		res += smallest
		data.pop(smallest)

	print(res)
	print('END OF PART1')
	return

def finished(act):
	[l, t] = act
	return t >= (60 + ord(l) - ord('A'))

def not_in(l, active):
	for a in active:
		if a[0] == l:
			return False
	return True

def debug(t, r, act):
	print(f"{t:5} {r:26}{act}")

def part_2(data):

	data = parse(data)

	res = ""
	t = 0
	w_max = 5
	active = []
	while len(data):
		keys = list(data.keys())
		curr = set()
		i = 0
		while i < len(keys):
			k = keys[i]
			if not has_requirements(k, data):
				curr |= {k}
			i += 1

		s = sorted(list(curr))
		for i in s:
			if len(active) < w_max and not_in(i, active):
				active.append([i, 0])

		act = 0
		while act < len(active):
			if finished(active[act]):
				res += active[act][0]
				data.pop(active[act][0])
				active.pop(act)
				continue
			else:
				active[act][1] += 1
				act += 1

		t += 1

	print(t)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('07_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	