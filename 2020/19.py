
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def get_rules(data, change_rules = False):
	# 8: 42 | 42 8
	# 11: 42 31 | 42 11 31

	ret = {}
	for r in data:
		if change_rules and r.startswith("8:"):
			r = "8: 42 | 42 8"
		elif change_rules and r.startswith("11:"):
			r = "11: 42 31 | 42 11 31"
		key, val = r.split(':')
		key = int(key)
		if '"' in val:
			ret[key] = val.replace('"','').strip()
		else:
			val = val.split('|')
			ret[key] = []
			for v in val:
				v = tuple(map(int, v.split()))
				ret[key].append(v)
	return ret

def get_l(n):
	cnt = 0
	while n > 0:
		n //= 10
		cnt += 1
	return cnt

def get_r_for(rules, n):
	ret = set()
	if type(rules[n]) is str:
		return {rules[n]}
	for r in rules[n]:
		r1s = get_r_for(rules, r[0])
		if len(r) == 1:
			ret |= set(r1s)
			continue
		r2s = get_r_for(rules, r[1])
		if len(r) == 2:
			for r1 in r1s:
				if len(r1) == 0: continue
				for r2 in r2s:
					if len(r2) == 0: continue
					ret |= {r1+r2}
			continue
		r3s = get_r_for(rules, r[2])
		for r1 in r1s:
			if len(r1) == 0: continue
			for r2 in r2s:
				if len(r2) == 0: continue
				for r3 in r3s:
					if len(r3) == 0: continue
					ret |= {r1+r2+r3}

	return ret

def get_cnt(msgs, n31, n42, cond1, cond2):
	cnt1, cnt2 = 0, 0
	for nm in msgs:
		i, k = 0, 0
		while len(nm) and i < len(n42):
			if nm.startswith(n42[i]):
				x = len(n42[i])
				nm = nm[x:]
				k += 1
				i = -1
			i += 1

		j, l = 0, 0
		while len(nm) and j < len(n31):
			if nm.startswith(n31[j]):
				x = len(n31[j])
				nm = nm[x:]
				l += 1
				j = -1
			j += 1

		if len(nm) == 0:
			cnt1 += int(cond1(k, l))
			cnt2 += int(cond2(k, l))
	return cnt1, cnt2

def solve(data):

	rules = get_rules(data[0].split('\n'))
	msgs = data[1].split('\n')

	n31 = get_r_for(rules, 31)
	n42 = get_r_for(rules, 42)
	n31 = [i for i in n31]
	n42 = [i for i in n42]
	cond1 = lambda k, l: k == 2 and l == 1
	cond2 = lambda k, l: k >= 2 and l >= 1 and k > l

	p1, p2 = get_cnt(msgs, n31, n42, cond1, cond2)

	print(p1)
	print('END OF PART1')
	print(p2)
	print('END OF PART2')
	return

if __name__ == '__main__':
	with open('19_input') as f:
		data = f.read()
		data = data.split('\n\n')
		# data = list(map(int, data.split()))

	solve(data)
	# part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	