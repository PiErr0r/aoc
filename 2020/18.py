
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def get_res(r, v, s):
	if s is None:
		return int(v)
	elif s == "*":
		return r * int(v)
	elif s == "+":
		return r + int(v)
	else:
		print("Bad")
		return None

def calc(exp):
	i, res = 0, 0
	sign = None
	curr_num = ''
	while i < len(exp):
		if exp[i] == '(':
			val, j = calc(exp[i+1:])
			i += j + 1
			res = get_res(res, val, sign)
		elif exp[i] == ')':
			if len(curr_num.strip()) > 0:
				res = get_res(res, curr_num, sign) 
			return res, i
		elif exp[i] in ['*', '+']:
			sign = exp[i]
			i += 1
		else:
			if exp[i] == " " and len(curr_num.strip()):
				res = get_res(res, curr_num, sign)
				curr_num = ""
			else:
				curr_num += exp[i]
				if i == len(exp) - 1:
					res = get_res(res, curr_num, sign)
		i += 1
	return res, i


def part_1(data):
	ans = 0

	for exp in data:
		val, ind = calc(list(exp.strip()))
		ans += val
	print(ans)
	print('END OF PART1')
	return

def parse(exp):
	ret = []
	i = 0
	curr_num = ""
	while i < len(exp):
		if exp[i] == '(':
			l, j = parse(exp[i+1:])
			ret.append(l[::])
			i += j
		elif exp[i] == ')':
			if len(curr_num):
				ret.append(int(curr_num))
			return ret[::], i + 1
		elif exp[i] in ['+', '*']:
			if len(curr_num):
				ret.append(int(curr_num))
				curr_num = ""
			ret.append(exp[i])
		else:
			curr_num += exp[i]
			if i == len(exp) - 1:
				ret.append(int(curr_num))
		i += 1
	return ret[::], i

def solve_op(e, op):
	i = 0
	while i < len(e):
		if e[i] == op:
			op1, op2 = e[i-1] if type(e[i-1]) is int else solve(e[i-1]) , e[i+1] if type(e[i+1]) is int else solve(e[i+1])
			res = op1 + op2 if op == '+' else op1 * op2
			e = e[:i-1] + [res] + e[i+2:]
			i -= 2
		i += 1
	return e

def solve(e):
	e = solve_op(e, '+')
	e = solve_op(e, '*')
	return e[0]

def calc2(exp):
	e, _ = parse(exp)
	return solve(e)

def part_2(data):
	ans = 0
	cnt = 0
	for exp in data:
		val = calc2(exp.replace(" ", ""))
		ans += val
	print(ans)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('18_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	

['2 + 8 * (5 + 4 * (8 * 3 * 6 * 7 * 8 * 8) + 8 * (7 + 9 + 8 * 9 * 4) * (3 + 9 * 5 + 2 + 5 * 4)) * 4']