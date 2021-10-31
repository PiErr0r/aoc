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
	
	Attributes:
	    data (list): data/instructions of the program
	    debug (bool): debug flag, if True display diagnostic messages
	    func (dict): hashmap which holds the functions used in the program
	    input_data (list): input buffer
	    out_param (list): output buffer
	    pause (bool): information if the program is paused
	    pos (int): position of the instruction pointer
	    regs (dict): registers for data which is out of bounds of the program
	    rel_pos (int): address of the relative instruction pointer
	
	"""
	def __init__(self, data, input_data = None, debug = False, disp_pause = False):
		"""initialize the program
		
		Args:
		    data (list): data/instruction of the program
		    input_data (None, optional): input buffer
		    debug (bool, optional): debugging flag
		    disp_pause (bool, optional): display "PAUSED" when program waits for input
		"""
		super(IntCode, self).__init__()

		self.data = data
		self.pos = 0
		self.rel_pos = 0

		self.input_data = input_data if input_data is not None else []
		self.out_param = []
		self.pause = False
		self.debug = debug

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
		"""Check if the program is halted
		
		Returns:
		    bool: if self.pos is -1 means that the program is halted
		"""
		return self.pos == -1

	def is_paused(self):
		"""Check if program is paused
		
		Returns:
		    bool: True if paused
		"""
		return self.pause 

	def unpause(self, input_data = []):
		"""If the process is paused you can start it again and add more input data as a list
		
		Args:
		    input_data (list, optional): You can add new input data while unpausing
		"""
		self.input_data += input_data
		self.pause = False

	def calculate(self):
		"""Start the execution of the program
		"""
		while self.pos != -1 and not self.pause:
			param = self.data[ self.pos ]
			opcode = f"{param%100:02d}"
			self.func[ opcode ](param)

	def get_mode(self, n, *, ret_n):
		"""
		get_mode <method> 
		returns mode (positional/immediate/relative) for parameters of the function
		
		Args:
		    n (int): the whole command from which the parameters mode is extracted
		    ret_n (int): number of parameters for the instruction called
		
		Returns:
		    list: modes for parameters from i + 1 to inclusively i + ret_n
		"""
		ns = f"{n:05d}"
		return map(lambda x: int(x), ns[:3][::-1][:ret_n])


	def get_address(self, mode, offset):
		"""
		Return the address depending on the offset of the parameter {1, 2, 3}
		and mode of the instruction {0, 1, 2}
		
		Args:
		    mode (int): 0/1/2 depending on the mode of the instruction
		    offset (int): which parameter of the function are we getting the address for
		
		Returns:
		    int: address of the value for the parameter
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
		"""Set the addr of data or registers to the value passed
		
		Args:
		    addr (int): address which will be set
		    value (int): value to set to the specified address
		"""
		if addr < 0:
			print("FAIL - negative address")
		if addr >= len(self.data):
			self.regs[ addr ] = value
		else:
			self.data[ addr ] = value

	def get_data(self, addr):
		"""Get value from data or registers based on address
		
		Args:
		    addr (int): address from which we get the value
		
		Returns:
		    int: value from the specified address
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
		"""Change the relative address for the IntCode program
		
		Args:
		    p_addr (int, optional): parameter address which hold the value to change the relative address
		"""
		rel_pos = self.get_address(p_addr, 1)
		rel_val = self.get_data(rel_pos)
		self.rel_pos += rel_val
		self.pos += 2

	def lt(self, f_addr = 0, s_addr = 0, res_addr = 0):
		"""Set r if less than: r if f < s
		
		Args:
		    f_addr (int, optional): mode for the address of the first parameter
		    s_addr (int, optional): mode for the address of the second parameter
		    res_addr (int, optional): mode for the address of the resulting parameter
		"""
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		cond = self.get_data(f_pos) < self.get_data(s_pos)
		self.set_data(res_pos, 1 if cond else 0)
		self.pos += 4


	def eq(self, f_addr = 0, s_addr = 0, res_addr = 0):
		"""Set r if equals: r if f == s
		
		Args:
		    f_addr (int, optional): mode for the address of the first parameter
		    s_addr (int, optional): mode for the address of the second parameter
		    res_addr (int, optional): mode for the address of the resulting parameter
		"""
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		cond = self.get_data(f_pos) == self.get_data(s_pos)
		self.set_data(res_pos, 1 if cond else 0)
		self.pos += 4


	def jnz(self, f_addr = 0, s_addr = 0):
		"""Jump if not zero
		
		Args:
		    f_addr (int, optional): if f is not zero
		    s_addr (int, optional): jump to s
		"""
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		cond = self.get_data(f_pos) != 0

		if cond:
			self.pos = self.get_data(s_pos)
		else:
			self.pos += 3


	def jz(self, f_addr = 0, s_addr = 0):
		"""Jump if zero
		
		Args:
		    f_addr (int, optional): if f is zero
		    s_addr (int, optional): jump to s
		"""
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		cond = self.get_data(f_pos) == 0

		if cond:
			self.pos = self.get_data(s_pos)
		else:
			self.pos += 3


	def input(self, p_addr = 0):
		"""Get input data and set it to some address
		
		Args:
		    p_addr (int, optional): address where to put the input data
		"""
		if len(self.input_data):
			in_pos = self.get_address(p_addr, 1)
			in_val = self.input_data.pop(0)
			self.set_data(in_pos, in_val)
			self.pos += 2
		else:
			if self.disp_pause:
				print("PAUSED")
			self.pause = True

	def output(self, p_addr = 0):
		"""Put the data in the output buffer, if in debug mode display the data
		
		Args:
		    p_addr (int, optional): address of the output data
		"""
		out_pos = self.get_address(p_addr, 1)
		self.out_param += [self.get_data(out_pos)]
		if self.debug:
			print("DIAGNOSTIC:", self.out_param[-1])
		self.pos += 2

	def get_output(self, last = 1):
		"""Get output buffer (last `last` positions), if `last` equals -1 flush the buffer
		
		Args:
		    last (int, optional): number of the data to retrieve
		
		Returns:
		    list: requested output buffer
		"""
		if last == -1:
			tmp = self.out_param[::]
			self.out_param = []
			return tmp
		return self.out_param[-last:]

	def mul(self, f_addr = 0, s_addr = 0, res_addr = 0):
		"""Multiplication: res = f * r
		
		Args:
		    f_addr (int, optional): address of the first parameter
		    s_addr (int, optional): address of the second parameter
		    res_addr (int, optional): address of the resulting parameter
		"""
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		f = self.get_data(f_pos)
		s = self.get_data(s_pos)
		res = f * s

		self.set_data(res_pos, res)
		self.pos += 4


	def add(self, f_addr = 0, s_addr = 0, res_addr = 0):
		"""Addition: res = f + s
		
		Args:
		    f_addr (int, optional): address of the first parameter
		    s_addr (int, optional): address of the second parameter
		    res_addr (int, optional): address of the resulting parameter
		"""
		f_pos = self.get_address(f_addr,1)
		s_pos = self.get_address(s_addr,2)
		res_pos = self.get_address(res_addr,3)

		f = self.get_data(f_pos)
		s = self.get_data(s_pos)
		res = f + s

		self.set_data(res_pos, res)
		self.pos += 4


	def halt(self):
		"""Halt the program
		"""
		print("HALT")
		self.pos = -1
		