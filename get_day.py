#!/usr/bin/env python3

import re, sys, requests
from bs4 import BeautifulSoup

def main(*args):
	[year, day] = args
	session = '53616c7465645f5fdcafb5ae2a8b435a4d926486c4046c5e6cd2b3c46abc3bf59a12a78003cb8271a465f8cc9fb54d33'
	url = f'https://adventofcode.com/{year}/day/{day}'
	url_input = url + '/input'
	cookies = dict(session=session)

	program_text = """
import math, copy, re


def part_1(data):
	return

def part_2(data):
	return 


if __name__ == '__main__':
	with open('{0}_input') as f:
		data = f.read()
		data = data.split('\\n')
		data = list(map(int, data.split()))


	part_1(data)
	#part_2(data)
	""".format(day)


	r = requests.get(url, cookies=cookies)
	r_input = requests.get(url_input, cookies=cookies)

	r_content = BeautifulSoup(r.text, 'html.parser')

	r_main = re.sub(r'window.*', '', str(r_content.find('main')))
	r_main = re.sub(r'<\s*[A-Za-z\/]+[^<>]*>|window.*$', '', r_main).strip()

	with open(f'./{year}/{day}_input', 'w') as f:
		if ord(r_input.text[-1]) == 10:
			f.write(r_input.text[:-1])
		else:
			f.write(r_input.text)

	with open(f'./{year}/{day}_day', 'w') as f:
		r_main = r_main.split(' ')
		k = 0
		for (i, txt) in enumerate(r_main):
			if i >= 10 and '\n' not in r_main[i - 10 : i] and (i % 10 == 0 and (i - k) == 10 or sum([len(j) for j in r_main[k : i]]) > 60) :
				f.write('\n')
				k = i
			if '---' in txt and txt != '---':
				f.write(txt[:3])
				f.write('\n')
				f.write('\n')
				k = i
				f.write(txt[3:])
			else:
				f.write(txt + ' ')
				if txt == '\n':
					k = i
					
	with open(f'./{year}/{day}.py', 'w') as f:
		f.write(program_text)

	return 

if __name__ == '__main__':
	
	main(*sys.argv[1:])
