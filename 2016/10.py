
import math, copy, re


OUTPUTS = dict()

def give_chips(bot, bots):
	# print(bots[bot])
	if len(bots[ bot ][ 'chips' ]) == 2:
		if sorted(bots[ bot ][ 'chips' ]) == [17, 61]:
			print(bot)
		lValue, hValue = min(bots[ bot ][ 'chips' ]), max(bots[ bot ][ 'chips' ])
		lBot, hBot = bots[ bot ][ 'lBot' ], bots[ bot ][ 'hBot' ]

		if lBot is not None and lBot in bots.keys():
			bots[ lBot ][ 'chips' ].append(lValue)
			give_chips(lBot, bots)
		else:
			bots[ lBot ] = dict(chips = [lValue], lBot = None, hBot = None)

		if hBot is not None and hBot in bots.keys():
			bots[ hBot ][ 'chips' ].append(hValue)
			give_chips(hBot, bots)
		else:
			bots[ hBot ] = dict(chips = [hValue], lBot = None, hBot = None)


def part_1(data):
	bots = dict()
	for cmd in data:
		cmd = cmd.split()
		if cmd[0] == 'value':
			[_, value, _, _, _, bot] = cmd
			if 'bot-' + bot in bots.keys():
				bots[ 'bot-' + bot ][ 'chips' ].append(int(value))
				give_chips('bot-' + bot, bots)
			else:
				bots[ 'bot-' + bot ] = dict(chips = [int(value)], lBot = None, hBot = None)
		elif cmd[0] == 'bot':
			[_, bot, _, _, _, lWhere, lValue, _, _, _, hWhere, hValue] = cmd
			if 'bot-' + bot in bots.keys():
				bots[ 'bot-' + bot ][ 'lBot' ] = lWhere + '-' + lValue
				bots[ 'bot-' + bot ][ 'hBot' ] = hWhere + '-' + hValue
			else:
				bots[ 'bot-' + bot ] = dict(chips = list(), lBot = lWhere + '-' + lValue, hBot = hWhere + '-' + hValue )
			give_chips('bot-' + bot, bots)



	return bots

def part_2(data):
	bots = part_1(data)
	mul = 1
	for bot in bots.keys():
		if bot is None:
			continue
		if 'output' in bot:
			[_, val] = bot.split('-')
			if val in ['0', '1', '2']:
				mul *= bots[bot]['chips'][0]
	print(mul)
	return 


if __name__ == '__main__':
	with open('10_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(data)
	part_2(data)
	