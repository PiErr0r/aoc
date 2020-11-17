class IntCode(object):
	"""
		IntCode <class> interpreter for IntCode

		operation codes:
			[int-code]: [fnc]
			01: self.add					addition
			02: self.mul					multiplication
			03: self.input					get input
			04: self.output					set output
			05: self.jnz					jump if not zero
			06: self.jz					jump if zero
			07: self.lt					less than => set
			08: self.eq					equals => set
			99: self.half					halt

		parameters:
			[a][b][c][opcode:2d]
			0 - positional
			1 - immediate 
			
	"""
	def __init__(self, data, input_data):
		super(IntCode, self).__init__()
		self.data = data
		self.pos = 0

		self.input_data = input_data
		self.out_param = None
		self.pause = False

		self.func = {
			"01": lambda x: self.add(*self.get_mode(x, ret_n = 3)),
			"02": lambda x: self.mul(*self.get_mode(x, ret_n = 3)),
			"03": lambda x: self.input(),
			"04": lambda x: self.output(*self.get_mode(x, ret_n = 1)),
			"05": lambda x: self.jnz(*self.get_mode(x, ret_n = 2)),
			"06": lambda x: self.jz(*self.get_mode(x, ret_n = 2)),
			"07": lambda x: self.lt(*self.get_mode(x, ret_n = 3)),
			"08": lambda x: self.eq(*self.get_mode(x, ret_n = 3)),
			"99": lambda x: self.halt()
		}

	def is_halted(self):
		return self.pos == -1

	def unpause(self, input_data):
		self.input_data += input_data
		self.pause = False

	def calculate(self):
		while self.pos != -1 and not self.pause:
			param = self.data[ self.pos ]
			opcode = f"{param%100:02d}"
			self.func[ opcode ](param)

	def get_mode(self, n, *, ret_n):
		"""
		get_mode <method> 
		returns mode (positional/immediate) for parameters of the function
		"""
		ns = f"{n:05d}"
		return map(lambda x: x == "0", ns[:3][::-1][:ret_n])


	def lt(self, f_addr = True, s_addr = True, res_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		res_pos = self.data[ self.pos + 3 ] if res_addr else self.pos + 3

		cond = self.data[f_pos] < self.data[s_pos]
		self.data[res_pos] = 1 if cond else 0
		self.pos += 4


	def eq(self, f_addr = True, s_addr = True, res_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		res_pos = self.data[ self.pos + 3 ] if res_addr else self.pos + 3

		cond = self.data[f_pos] == self.data[s_pos]
		self.data[res_pos] = 1 if cond else 0
		self.pos += 4


	def jnz(self, f_addr = True, s_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		cond = self.data[f_pos] != 0

		if cond:
			self.pos = self.data[s_pos]
		else:
			self.pos += 3


	def jz(self, f_addr = True, s_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		cond = self.data[f_pos] == 0

		if cond:
			self.pos = self.data[s_pos]
		else:
			self.pos += 3


	def input(self):
		if len(self.input_data):
			in_pos = self.data[ self.pos + 1 ]
			in_val = self.input_data.pop(0)
			self.data[ in_pos ] = in_val
			self.pos += 2
		else:
			print("PAUSED")
			self.pause = True

	def output(self, p_addr = True):
		out_pos = self.data[ self.pos + 1 ] if p_addr else self.pos + 1
		self.out_param = self.data[out_pos]
		print("DIAGNOSTIC:", self.out_param)
		self.pos += 2

	def get_output(self):
		return self.out_param

	def mul(self, f_addr = True, s_addr = True, res_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		res_pos = self.data[ self.pos + 3 ] if res_addr else self.pos + 3

		f = self.data[ f_pos ]
		s = self.data[ s_pos ]
		res = f * s

		self.data[res_pos] = res
		self.pos += 4


	def add(self, f_addr = True, s_addr = True, res_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		res_pos = self.data[ self.pos + 3 ] if res_addr else self.pos + 3

		f = self.data[ f_pos ]
		s = self.data[ s_pos ]
		res = f + s

		self.data[res_pos] = res
		self.pos += 4


	def halt(self):
		print("HALT")
		self.pos = -1
		