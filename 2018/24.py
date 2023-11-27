#!/usr/bin/env python3

# from utils.all import *

# advent.setup(2018, 24)
# fin = advent.get_input()
# eprint(*fin, sep='')
with open('24_input') as f:
	fin = f.read()
# timer_start()

##################################################

class Group:
	def __init__(self, units, hp, weak, immune, atk, atk_type, initiative, identifier):
		self.units      = units
		self.hp         = hp
		self.weak       = set(weak)
		self.immune     = set(immune)
		self.atk        = atk
		self.atk_type   = atk_type
		self.initiative = initiative
		self.id         = identifier
		self.army       = None
		self.target     = None
		self.lost_units = False

	def __repr__(self):
		gid = 'I' if self.army.name == 'Immune System' else 'X' if self.army.name == 'Infection' else 'G'

		return '{}{:d}({}u {}hp {}ep {}{} {}i {}/{})'.format(
			gid,
			self.id,
			self.units,
			self.hp,
			self.effective_power(),
			self.atk,
			self.atk_type,
			self.initiative,
			'-' if not self.immune else ''.join(self.immune),
			'-' if not self.weak else ''.join(self.weak)
		)

	def effective_power(self):
		return self.atk * self.units

	def calculate_damage(self, attacker):
		if attacker.atk_type in self.immune:
			return 0

		dmg = attacker.effective_power()

		if attacker.atk_type in self.weak:
			dmg *= 2

		return dmg

	# @log_calls(log_return=False)
	def choose_target(self, enemy_groups):
		self.target = None

		if not enemy_groups:
			return

		chosen = max(enemy_groups, key=lambda g: (
				g.calculate_damage(self),
				g.effective_power(),
				g.initiative
			)
		)

		if chosen.calculate_damage(self) == 0:
			self.target = None
		else:
			self.target = chosen
			enemy_groups.remove(self.target)

		# eprint('->', self.target)

	# @log_calls(log_return=False)
	def receive_attack(self, enemy):
		dmg             = self.calculate_damage(enemy)
		dead_units      = dmg // self.hp
		self.units      = max(self.units - dead_units, 0)
		self.lost_units = dead_units > 0

		if self.units == 0:
			self.army.groups.remove(self)

	def alive(self):
		return self.units > 0

class Army:
	def __init__(self, name, groups):
		self.name             = name
		self.groups           = groups

		for g in self.groups:
			g.army = self

	def __getitem__(self, k):
		return self.groups[k]

	def __repr__(self):
		s = '{}:'.format(self.name)

		if not self.groups:
			return s + ' DEAD.'

		for i, g in enumerate(self.groups):
			s += '\n {:2d}: {}'.format(i, repr(g))

		return s

	def prepare_for_fight(self):
		for group in self.groups:
			group.lost_units = False

	def choose_targets(self, enemy):
		enemy_groups = enemy.groups[:]

		for group in sorted(
				self.groups,
				key=lambda g: (g.effective_power(), g.initiative),
				reverse=True
			):
			group.choose_target(enemy_groups)

	def alive(self):
		return len(self.groups) > 0

def get_armies(atk_boost):
	a = Army('Immune System', [
		Group(228	, 8064	, (COLD)			, ()						, 331 + atk_boost, COLD, 8, 1),
		Group(284	, 5218	, (RADIATION)		, (SLASHING, FIRE)			, 160 + atk_boost, RADIATION, 10, 2),
		Group(351	, 4273	, ()				, (RADIATION)				, 93 + atk_boost, BLUDGEONING, 2, 3),
		Group(2693	, 9419	, (BLUDGEONING)		, (RADIATION)				, 30 + atk_boost, COLD, 17, 4),
		Group(3079	, 4357	, (RADIATION, COLD)	, ()						, 13 + atk_boost, RADIATION, 1, 5),
		Group(906	, 12842	, ()				, (FIRE)					, 100 + atk_boost, FIRE, 6, 6),
		Group(3356	, 9173	, (BLUDGEONING)		, (FIRE)					, 24 + atk_boost, RADIATION, 9, 7),
		Group(61	, 9474	, ()				, ()						, 1488 + atk_boost, BLUDGEONING, 11, 8),
		Group(1598	, 10393	, (FIRE)			, ()						, 61 + atk_boost, COLD, 20, 9),
		Group(5022	, 6659	, ()				, (BLUDGEONING, FIRE, COLD)	, 12 + atk_boost, RADIATION, 15, 10),
	])

	b = Army('Infection', [
		Group( 120, 14560, (RADIATION, BLUDGEONING), (COLD), 241, RADIATION, 18, 1),
		Group( 8023, 19573, (COLD, SLASHING), (BLUDGEONING, RADIATION), 4, BLUDGEONING, 4, 2),
		Group( 3259, 24366, (COLD), (SLASHING, RADIATION, BLUDGEONING), 13, SLASHING, 16, 3),
		Group( 4158, 13287, (), (), 6, FIRE, 12, 4),
		Group( 255, 26550, (), (), 167, BLUDGEONING, 5, 5),
		Group( 5559, 21287, (), (), 5, SLASHING, 13, 6),
		Group( 2868, 69207, (BLUDGEONING), (FIRE), 33, COLD, 14, 7),
		Group( 232, 41823, (), (BLUDGEONING), 359, BLUDGEONING, 3, 8),
		Group( 729, 41762, (BLUDGEONING, FIRE), (), 109, FIRE, 7, 9),
		Group( 3690, 36699, (), (), 17, SLASHING, 19, 10),
	])

	# a = Army('Immune System', [
	# 	Group(17, 5390, (RADIATION, BLUDGEONING), (), 4507 + atk_boost, FIRE, 2, 1),
	# 	Group(989, 1274, (SLASHING, BLUDGEONING), (FIRE), 25 + atk_boost, SLASHING, 3, 2),
	# ])

	# b = Army('Infection', [
	# 	Group(801, 4706, (RADIATION), (), 116, BLUDGEONING, 1, 1),
	# 	Group(4485, 2961, (FIRE, COLD), (RADIATION), 12, SLASHING, 4, 2),
	# ])

	return a, b

def battle(atk_boost=0):
	immune_system, infection = armies = get_armies(atk_boost)
	groups_by_initiative = sorted(immune_system.groups + infection.groups, key=lambda g: g.initiative, reverse=True)

	# eprint(immune_system)
	# eprint(infection)

	while immune_system.alive() and infection.alive():
		# eprint('-'*30)

		infection.choose_targets(immune_system)
		immune_system.choose_targets(infection)

		for a in armies:
			a.prepare_for_fight()

		dead_groups = set()

		for g in groups_by_initiative:
			if g.alive() and g.target is not None and g.target.alive():
				dead = g.target.receive_attack(g)

				if dead:
					dead_groups.add(g.target)

		if not any(g.lost_units for g in groups_by_initiative):
			break

		groups_by_initiative = list(filter(Group.alive, groups_by_initiative))

		# eprint(immune_system)
		# eprint(infection)

	if sum(a.alive() for a in armies) == 1:
		winner      = next(filter(Army.alive, armies))
		winner_name = winner.name
		alive_units = sum(g.units for g in winner.groups)
	else:
		winner_name = 'None'
		alive_units = -1

	return winner_name, alive_units


FIRE, COLD, RADIATION, SLASHING, BLUDGEONING = 'FCRSB' #= range(5)

_, alive_units = battle()

# advent.submit_answer(1, alive_units)

# for test in range(100):
# 	print(test, '->', battle(test))
# sys.exit(0)

l, r = 0, 10000

while l != r:
	atk_boost = (l + r) // 2
	# eprint(l, r, atk_boost)

	winner, _ = battle(atk_boost)

	# eprint(winner)

	if winner != 'Immune System':
		l = atk_boost + 1
	else:
		r = atk_boost

_, alive_units = battle(l)

# 20816 too high
# 2193 not right
# advent.submit_answer(2, alive_units)
print(alive_units, atk_boost)