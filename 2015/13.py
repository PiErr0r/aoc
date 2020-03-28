
import math, copy
from itertools import permutations

with open('13_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))

def part_1(part_2 = False):
	if part_2:
		guests = ['ZZ']
		g_happ = dict(ZZ = dict())
		gen_happy = []
	else:
		g_happ = dict(ZZ = dict())
		# g_happ = dict()
		guests = []
		gen_happy = []

	# print(g_happ, guests, gen_happy)
	for guest in data:
		[g1, _, sign, points, __, ___, ____, _____, ______, _______, g2] = guest.split()
		l_g1 = g1[0]
		l_g2 = g2[0]

		if l_g1 not in guests:
			guests.append(l_g1)
		if l_g2 not in guests:
			guests.append(l_g2)

		if l_g1 in g_happ.keys():
			g_happ[l_g1][l_g2] = dict(sign = sign, points = points)
		else:
			g_happ[l_g1] = dict()
			g_happ[l_g1][l_g2] = dict(sign = sign, points = points)
			g_happ['ZZ'][l_g1] = dict(sign = 'gain', points = 0)
			g_happ[l_g1]['ZZ'] = dict(sign = 'gain', points = 0)

	perms = permutations(guests)
	tmp = list(next(perms, False))
	L = len(guests)

	while tmp:
		happy = 0

		for i, g in enumerate(tmp):

			left = tmp[i - 1]
			happy += (-1 if g_happ[g][left]['sign'] == 'lose' else 1) * int(g_happ[g][left]['points'])

			right = tmp[(i + 1) % L]
			happy += (-1 if g_happ[g][right]['sign'] == 'lose' else 1) * int(g_happ[g][right]['points'])

		gen_happy.append(happy)
		tmp = next(perms, False)

	maxi = gen_happy[0]
	ind = 0
	for i, h in enumerate(gen_happy):
		if h > maxi:
			maxi = h
			ind = i

	print(maxi)
	return

def part_2():
	part_1(True)
	return 


if __name__ == '__main__':
	part_1()
	part_2()
	