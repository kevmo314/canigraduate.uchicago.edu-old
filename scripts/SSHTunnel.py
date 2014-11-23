from subprocess import Popen
import requesocks

class SSHTunnel(object):
	def __init__(self, port, location, key):
		self.ssh = Popen(['ssh', '-o UserKnownHostsFile=/dev/null', '-o StrictHostKeyChecking=no', '-t', '-t', '-D', str(port), '-i', key, location, '> /dev/null 2>&1'])
		self.session = requesocks.session()
		self.session.proxies = {'http': 'socks5://127.0.0.1:%d' % port, 'https': 'socks5://127.0.0.1:%d' % port}
		# hang until connection established
		while True:
			try:
				self.session.get('http://timeschedules.uchicago.edu/').text
			except:
				continue
			break
	def __enter__(self):
		return self

	def __exit__(self, exception_type, exception_val, trace):
		self.ssh.terminate()
		return exception_type is None
