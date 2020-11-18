class IntCode(object):
	"""
		IntCode <class> interpreter for IntCode

		operation codes:
			[int-code]: [fnc]
			01: self.add				addition
			02: self.mul				multiplication
			03: self.input			get input
			04: self.output			set output
			05: self.jnz				jump if not zero
			06: self.jz					jump if zero
			07: self.lt					less than => set
			08: self.eq					equals => set
			09: self.rel_base		set relative address
			99: self.halt				halt

		parameters:
			[a][b][c][opcode:2d]
			0 - positional
			1 - immediate 
			2 - relative
			
	"""
	def __init__(self, data, input_data):
		super(IntCode, self).__init__()

		self.data = data
		self.pos = 0
		self.rel_pos = 0

		self.input_data = input_data
		self.out_param = None
		self.pause = False

		# registers for data outside of the scope of the program length
		self.regs = dict()

		self.func = {
			"01": lambda x: self.add(*self.get_mode(x, ret_n = 3)),
			"02": lambda x: self.mul(*self.get_mode(x, ret_n = 3)),
			"03": lambda x: self.input(*self.get_mode(x, ret_n = 1)),
			"04": lambda x: self.output(*self.get_mode(x, ret_n = 1)),
			"05": lambda x: self.jnz(*self.get_mode(x, ret_n = 2)),
			"06": lambda x: self.jz(*self.get_mode(x, ret_n = 2)),
			"07": lambda x: self.lt(*self.get_mode(x, ret_n = 3)),
			"08": lambda x: self.eq(*self.get_mode(x, ret_n = 3)),
			"09": lambda x: self.rel_base(*self.get_mode(x, ret_n = 1)),
			"99": lambda x: self.halt()
		}

	def is_halted(self):
		"""
		Check if the program is halted
		"""
		return self.pos == -1

	def unpause(self, input_data = []):
		"""
		If the process is paused you can start it again and add more input data as a list
		"""
		self.input_data += input_data
		self.pause = False

	def calculate(self):
		"""
		Start the execution of the program
		"""
		while self.pos != -1 and not self.pause:
			param = self.data[ self.pos ]
			opcode = f"{param%100:02d}"
			self.func[ opcode ](param)

	def get_mode(self, n, *, ret_n):
		"""
		get_mode <method> 
		returns mode (positional/immediate/relative) for parameters of the function
		"""
		ns = f"{n:05d}"
		return map(lambda x: int(x), ns[:3][::-1][:ret_n])


	def get_address(self, mode, offset):
		"""
		Return the address depending on the offset of the parameter {1, 2, 3}
		and mode of the instruction {0, 1, 2}
		"""
		address = None
		if mode == 0:
			address = self.data[ self.pos + offset ]
		elif mode == 1:
			address = self.pos + offset
		elif mode == 2:
			address = self.rel_pos + self.data[ self.pos + offset ]
		else:
			print("FAIL - wrong mode parameter")
		return address

	def set_data(self, addr, value):
		"""
		Set the addr of data or registers to the value passed
		"""
		if addr < 0:
			print("FAIL - negative address")
		if addr >= len(self.data):
			self.regs[ addr ] = value
		else:
			self.data[ addr ] = value

	def get_data(self, addr):
		"""
		Get value from data or registers based on address
		"""
		ret_val = None
		if addr < 0:
			print("FAIL - negative address")
		if addr >= len(self.data):
			try:
				ret_val = self.regs[ addr ]
			except:
				ret_val = 0
		else:
			ret_val = self.data[ addr ]

		return ret_val

	def rel_base(self, p_addr = 0):
		rel_pos = self.get_address(p_addr, 1)
		rel_val = self.get_data(rel_pos)
		self.rel_pos += rel_val
		self.pos += 2

	def lt(self, f_addr = 0, s_addr = 0, res_addr = 0):
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		cond = self.get_data(f_pos) < self.get_data(s_pos)
		self.set_data(res_pos, 1 if cond else 0)
		self.pos += 4


	def eq(self, f_addr = 0, s_addr = 0, res_addr = 0):
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		cond = self.get_data(f_pos) == self.get_data(s_pos)
		self.set_data(res_pos, 1 if cond else 0)
		self.pos += 4


	def jnz(self, f_addr = 0, s_addr = 0):
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		cond = self.get_data(f_pos) != 0

		if cond:
			self.pos = self.get_data(s_pos)
		else:
			self.pos += 3


	def jz(self, f_addr = 0, s_addr = 0):
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		cond = self.get_data(f_pos) == 0

		if cond:
			self.pos = self.get_data(s_pos)
		else:
			self.pos += 3


	def input(self, p_addr = 0):
		if len(self.input_data):
			in_pos = self.get_address(p_addr, 1)
			in_val = self.input_data.pop(0)
			self.set_data(in_pos, in_val)
			self.pos += 2
		else:
			print("PAUSED")
			self.pause = True

	def output(self, p_addr = 0):
		out_pos = self.get_address(p_addr, 1)
		self.out_param = self.get_data(out_pos)
		print("DIAGNOSTIC:", self.out_param)
		self.pos += 2

	def get_output(self):
		return self.out_param

	def mul(self, f_addr = 0, s_addr = 0, res_addr = 0):
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		f = self.get_data(f_pos)
		s = self.get_data(s_pos)
		res = f * s

		self.set_data(res_pos, res)
		self.pos += 4


	def add(self, f_addr = 0, s_addr = 0, res_addr = 0):
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		f = self.get_data(f_pos)
		s = self.get_data(s_pos)
		res = f + s

		self.set_data(res_pos, res)
		self.pos += 4


	def halt(self):
		print("HALT")
		self.pos = -1
		