
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

def solve_quad(q1, q2):
	[c1, b1, a1] = q1
	[c2, b2, a2] = q2

	a = (a1 - a2) / 2
	b = (a1 - a2) / 2 + b1 - b2
	c = c1 - c2
	
	if a == 0:
		if b == 0:
			return None
		res = -c / b
		return res if res == int(res) and res >= 0 else None
	D = b*b - 4*a*c
	if D < 0:
		return None
	Dsq = int(math.sqrt(D))
	if Dsq * Dsq != D:
		return None
	nom1, nom2 = -b + Dsq, -b - Dsq
	den = 2*a
	t1, t2 = nom1/den, nom2/den
	t = max(t1, t2)
	
	if t < 0 or t != int(t):
		return None

	# if t1 >= 0 and t2 >= 0:
	# 	return min(t1, t2)

	return t

def evaluate(coeffs, t):
	[c, b, a] = coeffs
	'''
	p0, v0, a
	v1 = v0 + a
	p1 = p0 + v1 = p0 + v0 + a
	v2 = v1 + a = v0 + a + a
	p2 = p1 + v2 = p1 + v1 + a = p0 + v0 + a + v0 + a + a = p0 + 2v0 + 3a
	v3 = v2 + a = v0 + 3a
	p3 = p2 + v3 = p0 + 2v0 + 3a + v0 + 3a = p0 + 3v0 + 6a
	pn = p0 + n*v0 + n*(n+1)*a/2
	'''
	# a*t*t/2 + a*t/2 + b*t + c
	return a*t*(t+1)/2 + b*t + c

CNT = 0
MX = 0
def collision(parts, i, j):
	global CNT, MX
	p1, v1, a1 = parts[i]
	p2, v2, a2 = parts[j]
	t = solve_quad([p[0] for p in parts[i]], [p[0] for p in parts[j]])
	if t is None:
		return None
	if t > MX:
		MX = t
	# if i > 950:
	# 	print("!", i, j, t)
	CNT += 1
	y1, y2 = (p[1] for p in parts[i]), (p[1] for p in parts[j])
	vy1, vy2 = evaluate(y1, t), evaluate(y2, t)
	# if i > 950:
	# 	print("#", i, j, vy1, vy2)
	if vy1 != vy2:
		return None
	
	z1, z2 = (p[2] for p in parts[i]), (p[2] for p in parts[j])
	vz1, vz2 = evaluate(z1, t), evaluate(z2, t)
	# if i > 950:
	# 	print("$", i, j, vz1, vz2)
	if vz1 != vz2:
		return None

	return t

def part_2(data):
	parts = [parse(pt) for pt in data]
	asd = set()
	for t in range(100):
		print(t, len(parts))
		pos = {}
		to_delete = set()
		for i in range(len(parts)):
			for j in range(3):
				parts[i][1][j] += parts[i][2][j]
				parts[i][0][j] += parts[i][1][j]
			curr = tuple(parts[i][0])
			for k, v in pos.items():
				if curr == v:
					to_delete |= set([k, i])
			pos[i] = curr
		asd |= to_delete
		to_delete = sorted(to_delete)
		for i in range(len(to_delete) - 1, -1, -1):
			parts.pop(to_delete[i])
	print(len(parts))

def part_2xx(data):
	parts = [parse(pt) for pt in data]
	i = 0
	all_colls = {}
	cnt = 0
	while i < len(parts):
		mn = 1000000000000000
		j = 0
		colls = []
		while j < len(parts):
			if i == j:
				j += 1
				continue

			t = collision(parts, i, j)
			if t is not None:
				if t < mn:
					mn = t
					colls = [(j, t)]
				elif t == mn:
					colls.append((j, t))
			j += 1

		if len(colls):
			all_colls[i] = [ x for x in colls ]
		else: 
			cnt += 1
		i += 1
	print(MX, all_colls)
	to_delete = set()
	i = 0
	while i < len(parts):
		if i in to_delete:
			i += 1
			continue
		colls = all_colls.get(i, None)
		if colls is None:
			i += 1
			continue
		good = set()
		# to_delete |= {i}
		mni = colls[0][1]
		for c in colls:
			j, t = c
			mnj = all_colls[j][0][1]
			if mni <= mnj:
				good |= {j}
		if (len(good)):
			to_delete |= {i} | good
		i += 1
	# print(to_delete)
	print(len(parts)-len(to_delete))

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('20_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	