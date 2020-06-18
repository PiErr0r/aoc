
import math, copy, re, hashlib
strs = []
def swap(s, rest):
	first, *other = rest
	x, y = other[0], other[-1]
	if first == "position":
		x = int(x)
		y = int(y)
		s[x], s[y] = s[y], s[x]
	elif first == "letter":
		x, y = s.index(x), s.index(y)
		s[x], s[y] = s[y], s[x]
	return s

def unswap(s, rest):
	return swap(s, rest)

def rot_l(s, n):
	return s[n :] + s[: n]

def rot_r(s, n):
	l = len(s)
	return s[l - n:] + s[:l - n]

ur_pos = {
	0: (lambda s: rot_l(s, 1)),
	1: (lambda s: rot_l(s, 1)),
	2: (lambda s: rot_r(s, 2)),
	3: (lambda s: rot_l(s, 2)),
	4: (lambda s: rot_r(s, 1)),
	5: (lambda s: rot_l(s, 3)),
	6: (lambda s: s),
	7: (lambda s: rot_l(s, 4))
}

def unrot_pos(s, i):
	return ur_pos[i](s)

def rotate(s, rest):
	first, *other = rest
	if first in ["left", "right"]:
		steps = int(other[0])
		if first == "left":
			s = rot_l(s, steps)
		elif first == "right":
			s = rot_r(s, steps) 
	elif first == "based":
		li = s.index(other[-1])
		s = rot_r(s, 1)
		s = rot_r(s, li)
		if (li >= 4):
			s = rot_r(s, 1)
	return s

def unrotate(s, rest):
	first, *other = rest
	if first in ["left", "right"]:
		steps = int(other[0])
		if first == "left":
			s = rot_r(s, steps)
		elif first == "right":
			s = rot_l(s, steps) 
	elif first == "based":
		li = s.index(other[-1])
		s = unrot_pos(s, li)
	return s

def reverse(s, rest):
	x, y = int(rest[1]), int(rest[-1])
	return s[ :x] + list(reversed(s[x : y + 1])) + s[y + 1: ]

def unreverse(s, rest):
	return reverse(s, rest)

def move(s, rest):
	x, y = int(rest[1]), int(rest[-1])
	lx = s.pop(x)
	return s[:y] + [lx] + s[y:]

def unmove(s, rest):
	x, y = int(rest[1]), int(rest[-1])
	ly = s.pop(y)
	return s[:x] + [ly] + s[x:]


func = dict(swap=swap, rotate=rotate, reverse=reverse, move=move)

def part_1(data):
	global strs
	string = list("abcdefgh")
	print(string)
	for cmd in data:
		print(cmd)
		cmd = cmd.split()
		do, *rest = cmd
		string = func[do](string, rest)
		print("".join(string))
		strs.append("".join(string))
	print("".join(string))
	print('END OF PART1')
	return

unfunc = dict(swap=unswap, rotate=unrotate, reverse=unreverse, move=unmove)

def part_2(data):
	string = list("fbgdceah")
	print(string)
	for cmd in data[::-1]:
		print(cmd)
		cmd = cmd.split()
		do, *rest = cmd
		string = unfunc[do](string, rest)
		print("".join(string))
	print("".join(string))

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('21_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	