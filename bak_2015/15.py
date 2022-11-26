
import math, copy

with open('15_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))

ingredients = dict()
ing_names = ['Sugar', 'Sprinkles', 'Candy', 'Chocolate']
# ing_names = ['Butterscotch', 'Cinnamon']
ing_props = ['cap', 'dur', 'fla', 'tex', 'cal']

# Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
def setup():
	for ing in data:
		ing = ing.split()
		name = ing[0][:-1]
		ing_names.append(name)
		cap = int(ing[2][:-1])		
		dur = int(ing[4][:-1])		
		fla = int(ing[6][:-1])		
		tex = int(ing[8][:-1])		
		cal = int(ing[10])


		ingredients[name] = dict(cap = cap, dur = dur, fla = fla, tex = tex, cal = cal)

def part_1():
	setup()
	maxi = 0
	for i in range(1, 100):
		for j in range(1, 101):
			if i + j > 100:
				break
			for k in range(1, 101):
				if i + j + k > 100:
					break
				for l in range(1, 101):
					if i + j + k + l != 100:
						continue
					s = dict()
					suma = 1
					for prop in ing_props:
						s[prop] = i * ingredients['Sugar'][prop] + j * ingredients['Sprinkles'][prop] + k * ingredients['Candy'][prop] + l * ingredients['Chocolate'][prop]
						if prop != 'cal' and s[prop] <= 0:
							suma = 0
						suma *= s[prop] if prop != 'cal' else 1
					if suma > maxi and s['cal'] == 500:
						maxi = suma
	print(maxi)
						



	return

def part_2():
	#same but with the cal part
	return 


if __name__ == '__main__':
	part_1()
	#part_2()
	