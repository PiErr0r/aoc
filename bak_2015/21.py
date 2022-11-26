
import math, copy
from itertools import product, combinations

def fight(me, boss):
	dmg_me = me['dmg'] - boss['ac']
	dmg_boss = boss['dmg'] - me['ac']

	while True:
		boss['hp'] -= dmg_me if dmg_me > 0 else 1
		if boss['hp'] <= 0:
			return True
		me['hp'] -= dmg_boss if dmg_boss > 0 else 1
		if me['hp'] <= 0:
			return False

def buy_stuff(shop):
	combs = [i for i in shop['weapons']] + list(product(shop['weapons'], shop['armor'])) + list(product(shop['weapons'], shop['rings'])) + list(product(shop['weapons'], combinations(shop['rings'], 2))) + list(product(shop['weapons'], shop['armor'], shop['rings'])) + list(product(shop['weapons'], shop['armor'], combinations(shop['rings'], 2)))
	# print(len(combs))
	for comb in combs:
		me = dict(dmg=0, ac=0, cost=0, hp=100)
		for item in comb:
			if type(item) is tuple:
				for it in item:
					me['ac'] += 0 if 'ac' not in it.keys() else it['ac']
					me['dmg'] += 0 if 'dmg' not in it.keys() else it['dmg']
					me['cost'] += 0 if 'cost' not in it.keys() else it['cost']
			elif type(item) is str:
				me[item] += comb[item]
			else: 		
				me['ac'] += 0 if 'ac' not in item.keys() else item['ac']
				me['dmg'] += 0 if 'dmg' not in item.keys() else item['dmg']
				me['cost'] += 0 if 'cost' not in item.keys() else item['cost']
		yield copy.deepcopy(me)
	yield False


def part_1(boss, shop):
	costs = []
	a = buy_stuff(shop)
	me = next(a, False)
	while me:
		if fight(copy.deepcopy(me), copy.deepcopy(boss)):
			# print(me)
			costs.append(me['cost'])
		me = next(a, False)
	print(min(costs))
	return

def part_2(boss, shop):
	costs = []
	a = buy_stuff(shop)
	me = next(a, False)
	while me:
		if not fight(copy.deepcopy(me), copy.deepcopy(boss)):
			# print(me)
			costs.append(me['cost'])
		me = next(a, False)
	print(max(costs))
	return

if __name__ == '__main__':
	# with open('21_input') as f:
	# 	data = f.read()
	# 	data = data.split()
	# 	data = list(map(int, data.split()))
	boss = {
		'hp': 103,
		'dmg': 9,
		'ac': 2
	}

	shop = {
		'weapons': [
			{'cost':  8, 'dmg': 4},
			{'cost': 10, 'dmg': 5},
			{'cost': 25, 'dmg': 6},
			{'cost': 40, 'dmg': 7},
			{'cost': 74, 'dmg': 8}
		],
		'armor': [
			{'cost': 13, 'ac': 1},
			{'cost': 31, 'ac': 2},
			{'cost': 53, 'ac': 3},
			{'cost': 75, 'ac': 4},
			{'cost': 102, 'ac': 5}
		],
		'rings': [
			{'cost': 25, 'dmg': 1, 'ac': 0},
			{'cost': 50, 'dmg': 2, 'ac': 0},
			{'cost': 100, 'dmg': 3, 'ac': 0},
			{'cost': 20, 'dmg': 0, 'ac': 1},
			{'cost': 40, 'dmg': 0, 'ac': 2},
			{'cost': 80, 'dmg': 0, 'ac': 3}
		]
	}

	part_1(boss, shop)
	part_2(boss, shop)
	