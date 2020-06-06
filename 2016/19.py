
import math, copy, re, hashlib, collections

def logb(a, base):
	return math.log(a) / math.log(base)

def part_1(data):
	data = int(data)

	# Numberphile Joseph
	tmp = bin(data)[3:]
	print(int('0b' + tmp, 2) << 1 | 1)
	#################################

	ans = data
	cnt = 1
	while data > 1:
		if  not data % 2:
			ans -= cnt
		data //= 2
		cnt *= 2

	print(ans)
	print('END OF PART1')
	return

#!/bin/python3
# def solve_parttwo():
#     left = collections.deque()
#     right = collections.deque()
#     for i in range(1, ELF_COUNT+1):
#         if i < (ELF_COUNT // 2) + 1:
#             left.append(i)
#         else:
#             right.appendleft(i)

#     while left and right:
#         if len(left) > len(right):
#             left.pop()
#         else:
#             right.pop()

#         # rotate
#         right.appendleft(left.popleft())
#         left.append(right.pop())
#     return left[0] or right[0]


def part_2(data):
		ELF_COUNT = int(data)
		left = collections.deque()
		right = collections.deque()
		for i in range(1, ELF_COUNT+1):
				if i < (ELF_COUNT // 2) + 1:
						left.append(i)
				else:
						right.appendleft(i)

		while left and right:
				if len(left) > len(right):
						left.pop()
				else:
						right.pop()

        # rotate
				right.appendleft(left.popleft())
				left.append(right.pop())
		print(left[0] or right[0])

		print('END OF PART2')
	

if __name__ == '__main__':
	with open('19_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	