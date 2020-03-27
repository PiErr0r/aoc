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
import math, copy

with open('{0}_input') as f:
	data = f.read()

data = data.split()
data = list(map(int, data.split()))

	""".format(day)


	r = requests.get(url, cookies=cookies)
	r_input = requests.get(url_input, cookies=cookies)

	r_content = BeautifulSoup(r.text, 'html.parser')

	r_main = re.sub(r'window.*', '', str(r_content.find('main')))
	r_main = re.sub(r'<\s*[A-Za-z\/]+[^<>]*>|window.*$', '', r_main).strip()

	with open(f'./{year}/{day}_input', 'w') as f:
		f.write(r_input.text)
	with open(f'./{year}/{day}_day', 'w') as f:
		f.write(r_main)
	with open(f'./{year}/{day}.py', 'w') as f:
		f.write(program_text)

	return 

if __name__ == '__main__':
	
	main(*sys.argv[1:])