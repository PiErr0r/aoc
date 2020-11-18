
import math, copy, re

infty = 1000000000

def parse(part, lista = False):
	[p, v, a] = map(lambda x: x.strip().replace('<', '').replace('>', ''), part.split(', '))
	p = p.split('=')[1]
	p = list(map(int, p.split(',')))
	v = v.split('=')[1]
	v = list(map(int, v.split(',')))
	a = a.split('=')[1]
	a = list(map(int, a.split(',')))
	return [p,v,a] if lista else (p, v, a)

def final_pos(p, v, a):
	return tuple(map(lambda i: p[i] + v[i] * infty + a[i] * infty ** 2 / 2 , [0, 1, 2]))

def man_dist(p):
	return sum(list(map(lambda x: abs(x), list(p))))

def part_1(data):

	mini = infty ** 2
	m_ind = 0
	ind = 0
	for particle in data:
		p, v, a = parse(particle)

		f = final_pos(p,v,a)
		md = man_dist(f)
		if md < mini:
			mind = ind
			mini = md

		ind += 1
	print(mind, mini)
	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('20_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	