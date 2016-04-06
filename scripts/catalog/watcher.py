import difflib
import re
import requests
from email.mime.text import MIMEText
from subprocess import Popen, PIPE

def email(subject, message):
	msg = MIMEText(message)
	msg["From"] = "Magister.Mugit@uchicago.edu"
	msg["To"] = "kevmo314@gmail.com"
	msg["Subject"] = "Page update: %s" % subject
	p = Popen(["/usr/sbin/sendmail", "-t"], stdin=PIPE)
	p.communicate(msg.as_string())

def read(f):
	try:
		with open(f) as handle:
			return handle.read()
	except:
		return ""

def parse(cls):
	page = requests.get('http://collegecatalog.uchicago.edu%s' % cls).text.encode('ascii', errors='backslashreplace')
	start = page.index('\n', page.find('id="content"'))
	end = page.rindex('\n', 0, page.find('"courseinventory"'))
	text = re.sub(r'<.*?>', '', page[start:end])
	previous_page = read('/var/www/canigraduate/scripts/catalog/data/%s' % cls.split('/')[2]).splitlines()
	diff = list(difflib.unified_diff(previous_page, text.splitlines()))
	if len(diff) > 0:
		with open('/var/www/canigraduate/scripts/catalog/data/%s' % cls.split('/')[2], 'w+') as previous:
			previous.write(text)
		email(cls.split('/')[2],
		    "Page updated. Diff: \n\n%s" % '\n'.join(map(lambda x: " " + x, diff)))
		print(cls.split('/')[2])
		print('\n'.join(diff))

def main():
	root = requests.get('http://collegecatalog.uchicago.edu/thecollege/programsofstudy/').text.encode('ascii', errors='backslashreplace')
	# Use regex to prevent against rogue XML hijacking
	start = root.index('/thecollege/programsofstudy/') + 1
	end = root.index('</ul>', start)
	classes = re.findall(r'/thecollege/[A-Za-z]+/', root[start:end])
	previous_data = read('/var/www/canigraduate/scripts/catalog/data/previous')
	if previous_data != ','.join(classes):
		previous_split = previous_data.split(',')
		diff = list(difflib.unified_diff(previous_split, classes))
		email("root", "Classes changed. Diff:\n\n%s" % '\n'.join(map(lambda x: " " + x, diff)))
		with open('/var/www/canigraduate/scripts/catalog/data/previous', 'w') as previous:
			previous.write(','.join(classes))
	for cls in classes:
		parse(cls)

if __name__ == '__main__':
	try:
		main()
	except Exception as e:
		email("ERROR", "Exception while running watcher:\n\n%s" % str(e))
		raise
