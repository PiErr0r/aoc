
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020

def rl(arr):
	return range(len(arr))

def parse(p):
	return list(map(int, p.split('/')))

def calc_str(ports, used):
	S = 0

	for i in used:
		S += ports[i][0] + ports[i][1]
	return S

def find_ports(first, ports, used):
	found = False
	mx = strm = 0
	for i in rl(ports):
		if i in used:
			continue
		p = ports[i]
		fst = p[0] == first
		snd = p[1] == first
		if fst or snd:
			found = True
			used |= {i}
			curr_s, curr_l = find_ports(p[1] if fst else p[0], ports, used)
			if curr_l > mx:
				mx = curr_l
				strm = curr_s
			elif curr_l == mx and curr_s > strm:
				strm = curr_s
			used -= {i}
	if not found:
		S = calc_str(ports, used)
		return S, len(used)
	return strm, mx


def part_1(data):

	ports = [parse(p) for p in data]
	first = list(filter(lambda x: x[0] == 0, range(ports)))
	ports = list(filter(lambda x: x[0] != 0, ports))
	mx = 0
	for fp in first:
		used = set()
		res, _ = find_ports(fp[1], ports, used)
		res += fp[1]
		if res > mx:
			mx = res

	print(mx)
	print('END OF PART1')
	return

def part_2(data):
	ports = [parse(p) for p in data]
	first = list(filter(lambda i: ports[i][0] == 0, range(len(ports))))
	mx = strm = 0
	for fp in first:
		used = set([fp])
		res, l = find_ports(ports[fp][1], ports, used)
		if l > mx:
			mx = l
			strm = res
		elif l == mx and res > strm:
			strm = res

	print(strm, mx)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('24_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	