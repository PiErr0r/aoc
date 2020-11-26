
import math, copy, re, hashlib
import itertools as it


regs = {}
for i in range(ord('a'), ord('h') + 1):
	regs[chr(i)] = 0
CNT = 0

def set(a, b):
	global regs
	try:
		b = int(b)
	except:
		b = regs[b]
	regs[a] = b
	return 1

def jnz(a, b):
	global regs
	try:
		a = int(a)
	except:
		a = regs[a]
	try:
		b = int(b)
	except:
		b = regs[b]
	return b if a != 0 else 1

def mul(a, b):
	global CNT
	global regs
	try:
		b = int(b)
	except:
		b = regs[b]

	regs[a] = regs[a] * b
	CNT += 1
	return 1

def sub(a, b):
	global regs
	try:
		b = int(b)
	except:
		b = regs[b]

	regs[a] -= b
	return 1

fncs = {
	"set": set,
	"jnz": jnz,
	"mul": mul,
	"sub": sub
}

def part_1(data):
	global CNT
	i = 0
	while i < len(data):
		[cmd, a, b] = data[i].split()
		i += fncs[cmd](a, b)
	print(CNT)
	print('END OF PART1')
	return

def part_2(data):
	"""
	this part needed some thought
	first we see that c is for 17000 bigger than b which is 108100
	then it iterates e from 2 to b nested in iterating d from 2 to b
	inbetween all of that it sets the f register but only sometimes
	and h (the answer) increases every time f is set while b decreases by 17
	upon closer inspection f is set if d * e == b for all iterations of d and e less than b
	that means that f is set every time b is not prime
	now only thing to do is count the primes (or maybe easier to count the non primes)
	between b and c inclusively
	all above considered h equals 1001 (number of iterations between initial b and c)
	- # of primes in the form of b + n * 17 <= c
	the answer is finally 909
	"""
	print(909)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('23_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	