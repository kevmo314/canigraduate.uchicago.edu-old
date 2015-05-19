import random
import requesocks
from TimeSchedulesConnector import TimeSchedules
from TimeSchedulesDataset import TimeSchedulesDataset
from ClassResolver import ClassResolver
import sys, getopt
import json
import random
import os

reload(sys)
sys.setdefaultencoding('utf-8')

def main(stochastic=False, resolve_classes=False):
	session = requesocks.session()
	resolver = ClassResolver(session, resolve_classes)
	timeschedules = TimeSchedules(session)
	print('loaded')
	for index, term in enumerate(timeschedules):
		print(term)
		has_entries = False
		# ignore with probability 1 - (1 / index)
		if random.random() * index >= 1 and stochastic:
			continue
		dataset = TimeSchedulesDataset()
		for dept in term:
			print(dept)
			dataset.add(dept.get_entries())
			has_entries = True
		if has_entries:
			base = os.path.dirname(os.path.realpath(__file__))
			dataset.notify_changes('/var/www/canigraduate/data/timeschedules/%s.json' % str(term))
			dataset.write_timeschedules('/var/www/canigraduate/data/timeschedules/%s.json' % str(term))
			dataset.write_timeschedules_compressed('/var/www/canigraduate/data/timeschedules-compressed/%s.json' % str(term))
			dataset.write_timeschedules_data_compressed('/var/www/canigraduate/data/timeschedules-compressed/%s.data.json' % str(term))
		if resolve_classes:
			for id in dataset.data.keys():
				resolver.add(id, term, dataset.names[id])
	print('resolving classes')
	if resolve_classes:
		resolver.write(resolve_classes)

if __name__ == '__main__':
	try:
		opts, args = getopt.getopt(sys.argv[1:], 'sc:')
	except getopt.GetoptError:
		print('./get_schedules.py [-s]')
		print('\t-s Stochastic')
		print('\t-c [filename] Resolve classes')
	stochastic = False
	resolve_classes = False
	for opt, arg in opts:
		if opt == '-s':
			stochastic = True
		if opt == '-c':
			resolve_classes = arg

	main(stochastic, resolve_classes)
