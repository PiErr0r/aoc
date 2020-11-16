
import math, copy, re, hashlib

DEPTH = 0

def new_planet(children=[], orbits=0):
	return dict(children=children, orbits=orbits)

def r_set_orbits(planets, curr, p_orbit):
	planets[curr]['orbits'] = p_orbit + 1
	for c in planets[curr]['children']:
		planets = r_set_orbits(planets, c, p_orbit + 1)

	return planets

def setup(data):
	planets = dict()

	for o in data:
		[parent, child] = o.split(')')
		# print(planets['COM'])
		try:
			planets[parent]['children'].append(child)
		except:
			planets[parent] = new_planet([child], 0)

		for c in planets[parent]['children']:
			try:
				planets[c]
			except:
				planets[c] = new_planet([], planets[parent]['orbits'] + 1)
	return planets

SHORTEST = None

def find_c(planets, dad, s):
	if dad == s:
		return planets[dad]['orbits']
	
	o = None
	for c in planets[dad]['children']:
		o = find_c(planets, c, s)
		if o is not None:
			break
	return o

def find_shortest(planets, dad, first, second):
	global SHORTEST
	l_fst = find_c(planets,dad,first) 
	l_snd = find_c(planets,dad,second) 
	
	if l_fst is not None and l_snd is not None:
		l_fst -= planets[dad]['orbits']
		l_snd -= planets[dad]['orbits']
		if l_fst + l_snd < SHORTEST:
			print(dad, l_fst, l_snd)
			SHORTEST = l_fst + l_snd
		for c in planets[dad]['children']:
			find_shortest(planets, c, first, second)
	else: 
		return


def part_1(data):
	planets = setup(data)
	planets = r_set_orbits(planets, 'COM', -1)
	res = 0

	for p in planets.keys():
		# print(p, planets[p])
		res += planets[p]['orbits']

	global SHORTEST 
	SHORTEST = res
	print(res)
	print('END OF PART1')
	return

def part_2(data):
	planets = setup(data)
	planets = r_set_orbits(planets, 'COM', -1)

	shortest = find_shortest(planets, 'COM', 'YOU', 'SAN')
	print(SHORTEST - 2)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('06_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	