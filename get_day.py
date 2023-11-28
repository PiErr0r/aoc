#!/usr/bin/env python3

import os
import re, sys, requests
from bs4 import BeautifulSoup
from datetime import datetime

NOW = datetime.now()

USE_ARG = """get_day expects three arguments: <year> <day> <ext>
<year> = [2015, <current_year>]
<day>  = [1, 25]
<ext>  = py | js
eg. ./get_day 2017 6 js
"""
USE_TYPE = """Both year and day must be numbers (integers)
"""
USE_YEAR_LOW = "Cannot fetch year before 2015"
USE_YEAR_HIGH = f"Cannot fetch year after {NOW.year}"
USE_DAY = "Day must be in interval [1,25]!"
USE_EXT = "Extension must be 'js' or 'py'"
USE_NOT_STARTED = "current year Advent of Code didn't start yet!"

program_text_py = """
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

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
"""

program_text_js = """
const fs = require('fs');
const {{ exec }} = require("child_process");
const {{ D4, D6, D8, MOD }} = require("../lib");
const {{ joseph, findCycle }} = require("../lib");
const {{ cache }} = require("../lib");
const {{ bin, float, hex, int, num, oct }} = require("../lib");
const {{ range, drange, trange, iter, diter, titer }} = require("../lib");
const {{ copy,	entries, in_, inBB, keys, sort, values }} = require("../lib");
const {{ Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack }} = require("../lib");
const {{ ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose }} = require("../lib");
const {{ digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf }} = require ('../lib');
const {{ min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI }} = Math;
const {{ isSuperset, or, and, xor, sub }} = set;
const {{ getExecStr }} = require("../lib/post");
const {{ combinations, combinations_with_replacement, next_permutation, product }} = require("../lib");

function part1(data) {{

	let res = 0;

	debug(res);
	exec(`echo ${{res}} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}}

function part2(data) {{

	let res = 0;

	debug(res);
	// exec(`echo ${{res}} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}}

function main() {{
	let data = fs.readFileSync("{0}_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}}

main();
"""

def main(*args):
	[year, day, ext] = args

	with open('session', 'r') as f:
		session = f.read().strip()
	
	if len(session) == 0:
		return

	url = f'https://adventofcode.com/{year}/day/{day}'
	url_input = url + '/input'
	cookies = dict(session=session)
	if len(str(day)) == 1:
		day = '0' + day

	program_text = program_text_py.format(day) if ext == 'py' else program_text_js.format(day, year)
	r = requests.get(url, cookies=cookies)
	r_input = requests.get(url_input, cookies=cookies)

	r_content = BeautifulSoup(r.text, 'html.parser')

	r_main = re.sub(r'window.*', '', str(r_content.find('main')))
	r_main = re.sub(r'<style>.*</style>', '', r_main).strip()
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
		r_main = r_main.replace('&gt;', '>').replace('&lt;', '<').replace('&amp;', '&')
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
					
	with open(f'./{year}/{day}.{ext}', 'w') as f:
		f.write(program_text)

	with open("fetch_day_time", 'w') as f:
		exact = datetime.now()
		f.write(f"{exact.hour:02d}:{exact.minute:02d}:{exact.second:02d}")

	return 

if __name__ == '__main__':
	
	if len(sys.argv[1:]) != 3:
		print(USE_ARG)
	else:
		try:
			[year, day] = list(map(int, sys.argv[1:3]))
			ext = sys.argv[3]
			if year < 2015:
				print(USE_YEAR_LOW)
				exit(1)
			elif year > NOW.year:
				print(USE_YEAR_HIGH)
				exit(1)
			else:
				if year == NOW.year and NOW.month != 12:
					print(USE_NOT_STARTED)
					exit(1)
				else:
					if day < 1 or day > 25:
						print(USE_DAY)
						exit(1)
					else:
						if ext not in ['js', 'py']:
							print(USE_EXT)
							exit(1)
						else:
							main(*sys.argv[1:])
			
		except Exception as ex:
			print(USE_ARG)
			print(USE_TYPE)
			print(ex)
			exit(1)

