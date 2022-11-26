
import math, copy, re, hashlib
import itertools as it

def clean(r):
	return r[0]

def inc(regs, r):
	r = clean(r)
	regs[r] += 1
	return regs, 1

def tpl(regs, r):
	r = clean(r)
	regs[r] *= 3
	return regs, 1

def hlf(regs, r):
	r = clean(r)
	regs[r] //= 2
	return regs, 1

def jmp(regs, i):
	return regs, int(i)

def jio(regs, r, i):
	r = clean(r)
	return regs, int(i) if regs[r] == 1 else 1

def jie(regs, r, i):
	r = clean(r)
	return regs, int(i) if regs[r] % 2 == 0 else 1


fncs = {
	"jio": jio,
	"inc": inc,
	"tpl": tpl,
	"jmp": jmp,
	"jie": jie,
	"hlf": hlf
}

def part_1(data):
	regs = dict(a = 0, b = 0)
	i = 0
	while i < len(data):
		params = data[i].split()
		regs, inc = fncs[params[0]](regs, *params[1:])
		i += inc

	print(regs['b'])

	print('END OF PART1')
	return

def part_2(data):
	regs = dict(a = 1, b = 0)
	i = 0
	while i < len(data):
		params = data[i].split()
		regs, inc = fncs[params[0]](regs, *params[1:])
		i += inc

	print(regs['b'])

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('23_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	