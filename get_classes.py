import requests
import re

quarters = [457,456,455,454,453,452,451,450,449,448,447,446,445,443,442]
classes = set()
for department in re.findall(r'\(([A-Z]{4})\)', requests.get('http://timeschedules.uchicago.edu/').text):
	for quarter in quarters:
		page = requests.get('http://timeschedules.uchicago.edu/view.php?dept=%s&term=%d' % (department, quarter)).text
		results = re.findall(r'&nbsp;/&nbsp;(\d{5}).+?plain">(.+?)<', page, re.DOTALL)
		for result in results:
			class_string = "%s %s :: %s" % (department, result[0], result[1].strip())
			if class_string not in classes and not result[1].strip() == 'CANCELLED':
				classes.add(class_string)
				print(class_string)
