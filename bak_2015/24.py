
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

"""
Suppose that the candidates are x1,…,xn and the target is T. I'm assuming all candidates are positive. If T<0 then there are no solutions. If T=0

then the only solution is the empty solution. Otherwise, there are two kinds of solutions:

1. x1 together with a solution for T−x1 using all candidates. ## in this case with x2,...,xn candidates
2. A solution for T using the candidates x2,…,xn

    .

Using this, you can easily write a recursive procedure that generates all solutions.
"""

def first(n, nums):
	i = 0
	while i < len(nums):
		if nums[i] <= n:
			return i
		i += 1
	else:
		return None

def get_sum(s, nums):
	if len(nums) == 0 or s <= 0:
		return []
	suma = sum(nums)
	if s > suma:
		return None
	elif s == suma:
		return nums[::]
	else:
		c_ind = first(s, nums)
		nnums = nums[::]
		l, curr = [], []
		if c_ind is not None:
			curr = nums[c_ind]
			next_sum = s - curr
			if next_sum == 0:
				l.append([curr])
			else:
				nnums.pop(c_ind)
				ns1 = get_sum(s - curr, nnums)
				if ns1 is not None:
					for i in ns1:
						if type(i) is list:
							if sum(i) + curr == s:
								l.append([curr, *i])
						elif curr0 + i == s:
							l.append([curr, i])

		ns2 = get_sum(s, nums[1:])
		if ns2 is not None:
			for i in ns2:
				if type(i) is list:
					if sum(i) == s:
						l.append([*i])
				elif i == s:
					l.append([i])
		# print("##",l)
		return l

def prod(arr):
	ans = 1
	for i in arr:
		ans *= i
	return ans

def part_1(data):
	group_w = sum(data) // 3
	data.sort(reverse=True)

	mini_pn = math.inf
	mini_qe = math.inf
	sums = get_sum(group_w, data)
	for i in sums:
		if len(i) < mini_pn:
			mini_pn = len(i)
			mini_qe = prod(i)
		elif len(i) == mini_pn and prod(i) < mini_qe:
			mini_qe = prod(i)
	

	print(mini_qe)

	print('END OF PART1')
	return

def part_2(data):
	group_w = sum(data) // 4
	data.sort(reverse=True)

	mini_pn = math.inf
	mini_qe = math.inf
	sums = get_sum(group_w, data)
	for i in sums:
		if len(i) < mini_pn:
			mini_pn = len(i)
			mini_qe = prod(i)
		elif len(i) == mini_pn and prod(i) < mini_qe:
			mini_qe = prod(i)
	

	print(mini_qe)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('24_input') as f:
		data = f.read()
		data = data.split('\n')
		data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	