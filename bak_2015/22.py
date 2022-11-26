
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

SPELLS = {
	'magic_missile': {
		'mana': 53,
		'dmg': 4
	},
	'drain': {
		'mana': 73,
		'dmg': 2,
		'heal': 2
	},
	'shield': {
		'mana': 113,
		'effect': 'shield'
	},
	'poison': {
		'mana': 173,
		'effect': 'poison'
	},
	'recharge': {
		'mana': 229,
		'effect': 'recharge'
	}
}
SPELL_LIST = list(SPELLS.keys())

EFFECTS = {
	'shield': {
		'd': 6,
		'armor': 7
	},
	'poison': {
		'd': 6,
		'dmg': 3
	},
	'recharge': {
		'd': 5,
		'mana': 101
	}
}

class Effect():
	def __init__(self, name, duration, armor, dmg, mana):
		self.name = name
		self.duration = duration
		self.armor = armor
		self.dmg = dmg
		self.mana = mana
		self.finished = False

	def apply(self):
		if self.finished:
			return None
		self.duration -= 1
		if not self.duration:
			self.finished = True
		armor = self.armor if self.armor is not None else 0
		dmg = self.dmg if self.dmg is not None else 0
		mana = self.mana if self.mana is not None else 0
		return [armor, dmg, mana, self.finished]

class Player():
	def __init__(self, hp, mana):
		self.hp = hp
		self.mana = mana
		self.armor = 0
		self.effects = {}
		self.dead = False
		self.dmg = 0

	def is_effect_active(self, name):
		return self.effects.get(name, None) is not None

	def use_spell(self, spell):
		if self.mana < spell['mana']:
			return False
		
		self.mana -= spell['mana']
		if spell.get('heal', None) is not None:
			self.hp += spell['heal']
		if spell.get('dmg', None) is not None:
			self.dmg = spell['dmg']
		if spell.get('effect', None) is not None:
			self.start_effect(spell['effect'])
			if spell['effect'] == 'shield':
				self.armor += self.effects['shield'].armor
		return spell['mana']

	def start_effect(self, name):
		self.effects[name] = Effect(
			name,
			EFFECTS[name]['d'],
			EFFECTS[name].get('armor', None),
			EFFECTS[name].get('dmg', None),
			EFFECTS[name].get('mana', None)
		)


	def apply_effects(self):
		armor, dmg, mana = 0, 0, 0
		to_delete = []
		for name, eff in self.effects.items():
			[A, D, M, f] = eff.apply()
			armor += A; dmg += D; mana += M
			if f: to_delete.append(name)
		for d in to_delete:
			if d == 'shield':
				self.armor -= armor
			del self.effects[d]
		# self.armor += armor
		self.dmg += dmg
		self.mana += mana



class Boss():
	def __init__(self, hp, dmg):
		self.hp = hp
		self.dmg = dmg


def rl(arr):
	return range(len(arr))

TACTICS = []

def play_game(indexes, hard = False):
	global TACTICS
	TACTICS = []
	me = Player(50, 500)
	boss = Boss(58, 9)
	turn = True
	cnt = 0
	ret = 0
	while cnt < len(indexes):
		if (hard):
			me.hp -= 1
			if me.hp <= 0:
				return None
		me.apply_effects()
		if me.dmg:
			boss.hp -= me.dmg
			me.dmg = 0
		if boss.hp <= 0:
			return ret

		if turn:
			sp = SPELL_LIST[indexes[cnt]]
			if me.hp <= 0 or me.mana < SPELLS[sp]['mana']:
				return None
			ret += me.use_spell(SPELLS[sp])
			TACTICS.append(sp)

			boss.hp -= me.dmg
			me.dmg = 0

			if boss.hp <= 0:
				return ret
		else:
			res = max(boss.dmg - me.armor, 1)
			me.hp -= res
			if me.hp <= 0:
				return None
		if (turn):
			cnt += 1
		turn = not turn

	if cnt == len(indexes):
		print("indexes array too short")
		exit(1)

OVERFLOW = False

def add_one(l):
	for i in range(len(l)):
		l[i] += 1
		if l[i] == 5:
			l[i] = 0
			if i == len(l) - 1:
				OVERFLOW = True
		else:
			break

def part_1(data):

	indexes = [0 for _ in range(100)]
	mn = 1000000000000000
	i = 0
	while not OVERFLOW:
		# print(TACTICS)
		if i and i % 100000 == 0:
			break
		res = play_game(indexes)
		if res is not None and res < mn:
			mn = res
		add_one(indexes)
		i += 1

	print(mn)
	print('END OF PART1')
	return

def part_2(data):
	indexes = [0 for _ in range(100)]
	mn = 1000000000000000
	i = 0
	while not OVERFLOW:
		if i and i % 100000 == 0:
			break
		res = play_game(indexes, True)
		if res is not None and res < mn:
			mn = res
		add_one(indexes)
		i += 1

	print(mn)
	print('END OF PART2')

	return 


if __name__ == '__main__':
	with open('22_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	