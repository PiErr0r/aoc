
import math, copy, re, hashlib
import itertools as it
import numpy as np

def rl(arr):
	return range(len(arr))

def get_bin(s):
	sv = 0
	l = len(s)
	for i in range(l-1, -1, -1):
		sv |= (1 << (i)) if s[i] == '#' else 0
	return sv

def get_mat(n, sz):
	s = ''
	while n:
		if n & 1: 
			s += '#'
		else:
			s += '.'
		n >>= 1
	s += (sz*sz - len(s)) * '.'
	ret = []
	for i in range(0, len(s), sz):
		ret.append(s[i:i+sz])
	return np.matrix([list(i) for i in ret])



def parse(rule):
	[l, r] = list(map(lambda x: x.strip(), rule.split('=>')))
	lv = rv = 0
	l = l.replace('/', '')
	r = r.replace('/', '')
	return get_bin(l), get_bin(r)

TWOS = 6

def bin_search(rules, s):
	lo = 0
	hi = len(rules)
	while lo < hi:
		md = lo + (hi - lo) // 2
		if rules[md][0] == s:
			return md
		elif rules[md][0] < s:
			lo = md + 1
		else:
			hi = md
	return None

def find_rule(sub, rules):
	l = len(sub)
	rule_list = rules[:TWOS] if l == 2 else rules[TWOS:]
	rule = None

	for _ in range(4):
		s = ''.join([''.join(row) for row in np.array(sub)])
		s = get_bin(s)
		rule = bin_search(rule_list, s)
		if rule is None:
			s = ''.join([''.join(row[0]) for row in np.array([sub[i] for i in range(len(sub)-1, -1, -1)])])
			s = get_bin(s)
			rule = bin_search(rule_list, s)
		if rule is not None:
			break
		sub = np.rot90(sub)
	return rule_list[rule]


def enhance(pattern, rules):
	l = len(pattern)
	step = 2 if l % 2 == 0 else 3
	sz = (l//step) * (step + 1)
	ret = np.array(range(sz*sz), dtype=str).reshape(sz, sz)
	for i in range(0, l//step):
		for j in range(0, l//step):
			sub = pattern[i*step:i*step+step,j*step:j*step+step]
			r = find_rule(np.matrix(sub), rules)
			mat = get_mat(r[1], step + 1)
			ret[i*(step+1):i*(step+1)+step+1,j*(step+1):j*(step+1)+step+1] = mat
	return ret

def part_1(data):

	rules = [parse(r) for r in data]
	
	pattern = ['.#.','..#','###']
	pattern = np.matrix([list(i) for i in pattern])

	for _ in range(18):
		print(_)
		pattern = enhance(pattern, rules)
		# print(pattern)
	cnt = 0
	for r in pattern:
		for c in r:
			if c == '#':
				cnt += 1
	print(cnt)

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('21_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	