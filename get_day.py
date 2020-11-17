#!/usr/bin/env python3

import os
import re, sys, requests
from bs4 import BeautifulSoup
from datetime import datetime

NOW = datetime.now()

USE_ARG = """get_day expects two arguments: a year and a day 
eg. ./get_day 2017 6
"""
USE_TYPE = """Both year and day must be numbers (integers)
"""
USE_YEAR_LOW = "Cannot fetch year before 2015"
USE_YEAR_HIGH = f"Cannot fetch year after {NOW.year}"
USE_MONTH = "Day must be in interval [1,25]!"
USE_NOT_STARTED = "current year Advent of Code hasn't started yet!"


def main(*args):
	[year, day] = args

	with open('session', 'r') as f:
		session = f.read()
	
	if len(session) == 0:
		return
	url = f'https://adventofcode.com/{year}/day/{day}'
	url_input = url + '/input'
	cookies = dict(session=session)
	if len(str(day)) == 1:
		day = '0' + day

	program_text = """
import math, copy, re, hashlib
import itertools as it


def part_1(data):

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('{0}_input') as f:
		data = f.read()
		data = data.split('\\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	""".format(day)


	r = requests.get(url, cookies=cookies)
	r_input = requests.get(url_input, cookies=cookies)

	r_content = BeautifulSoup(r.text, 'html.parser')

	r_main = re.sub(r'window.*', '', str(r_content.find('main')))
	r_main = re.sub(r'<\s*[A-Za-z\/]+[^<>]*>|window.*$', '', r_main).strip()

	curr_dir = os.getcwd()
	try:
		os.chdir(str(year))
		os.chdir('../')
	except:
		os.mkdir(f"{curr_dir}/{year}")

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

	with open("fetch_day_time", 'w') as f:
		exact = datetime.now()
		f.write(f"{exact.hour:02d}:{exact.minute:02d}:{exact.second:02d}")

	return 

if __name__ == '__main__':
	
	if len(sys.argv[1:]) != 2:
		print(USE_ARG)
	else:
		try:
			[year, day] = list(map(int, sys.argv[1:]))
			if year < 2015:
				print(USE_YEAR_LOW)
			elif year > NOW.year:
				print(USE_YEAR_HIGH)
			else:
				if year == NOW.year and NOW.month != 12:
					print(USE_NOT_STARTED)
				else:
					if day < 1 or day > 25:
						print(USE_DAY)
					else:
						main(*sys.argv[1:])

			
		except Exception as ex:
			print(USE_ARG)
			print(USE_TYPE)
			print(ex)

