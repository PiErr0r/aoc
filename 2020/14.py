
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def get_bin(v):
	v = bin(v)[2:]
	return list((36 - len(v)) * "0" + v)

def part_1(data):
	M = {}
	for i in data:
		m, value = i.split("=")
		m = m.strip()
		value = value.strip()
		if m == "mask":
			mask = value
			continue
		else:
			value = int(value)
			mem = int(m.replace("mem[", "").replace("]", ""))

		curr = M.get(mem, 0)
		curr = get_bin(curr)
		value = get_bin(value)
		for i, bit in enumerate(mask):
			curr[i] = bit if mask[i] != 'X' else value[i]
		M[mem] = int("".join(curr), 2)
	ans = 0
	for k in M.keys():
		ans += M[k]
	print(ans)
	print('END OF PART1')
	return

def get_pad(n, pad):
	n = bin(n)[2:]
	n = ((pad - len(n)) * "0") + n
	return n

def get_addr(m, mem):
	ret = []
	x = m.count("X")
	m = list(m)
	mem = get_bin(mem)
	xs = []
	for i, bit in enumerate(m):
		if bit == "0":
			continue
		elif bit == "1":
			mem[i] = bit
		elif bit == "X":
			xs.append(i)
			mem[i] = bit

	for i in range(2 ** x):
		n_mem = mem[::]
		i = get_pad(i, x)
		for j, bit in enumerate(i):
			n_mem[xs[j]] = bit
		ret.append(int("".join(n_mem), 2))
	return ret

def part_2(data):
	M = {}
	for i in data:
		m, value = i.split("=")
		m = m.strip()
		value = value.strip()
		if m == "mask":
			mask = value
			continue
		else:
			value = int(value)
			mem = int(m.replace("mem[", "").replace("]", ""))
		addrs = get_addr(mask, mem)
		# print(addrs)
		for a in addrs:
			M[a] = value
	ans = 0
	for k in M.keys():
		ans += M[k]
	print(ans)
	# print(M)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('14_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	