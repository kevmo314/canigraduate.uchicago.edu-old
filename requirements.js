var SEQUENCES = {
	MATH2Q130:{require:2, classes:[
		{require:1, classes:['MATH 13100', 'MATH 15100', 'MATH 16100']},
		{require:1, classes:['MATH 13200', 'MATH 15200', 'MATH 16200']}
	]},
	MATH3Q130:{require:3, classes:[
		{require:1, classes:['MATH 13100', 'MATH 15100', 'MATH 16100']},
		{require:1, classes:['MATH 13200', 'MATH 15200', 'MATH 16200']},
		{require:1, classes:['MATH 13300', 'MATH 15300', 'MATH 16300']}
	]},
	MATH2Q150:{require:2, classes:[
		{require:1, classes:['MATH 15100', 'MATH 16100']},
		{require:1, classes:['MATH 15200', 'MATH 16200']}
	]},
	CHEM2Q100:{require:2, classes:[
		{require:1, classes:['CHEM 10100', 'CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 10200', 'CHEM 11200', 'CHEM 12200']}
	]},
	CHEM2Q110:{require:2, classes:[
		{require:1, classes:['CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 11200', 'CHEM 12200']}
	]},
	CHEM3Q100:{require:3, classes:[
		{require:1, classes:['CHEM 10100', 'CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 10200', 'CHEM 11200', 'CHEM 12200']},
		{require:1, classes:['CHEM 10300', 'CHEM 11300', 'CHEM 12300']}
	]},
	CHEM3Q110:{require:3, classes:[
		{require:1, classes:['CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 11200', 'CHEM 12200']},
		{require:1, classes:['CHEM 11300', 'CHEM 12300']}
	]},
	CMSC2Q150:{require:2, classes:[
		{require:1, classes:['CMSC 15100', 'CMSC 16100']},
		{require:1, classes:['CMSC 15200', 'CMSC 16200']}
	]},
	PHYS3Q120:{require:3, classes:[
		{require:1, classes:['PHYS 12100', 'PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 12200', 'PHYS 13200', 'PHYS 14200']},
		{require:1, classes:['PHYS 12300', 'PHYS 13300', 'PHYS 14300']}
	]},
	PHYS3Q130:{require:3, classes:[
		{require:1, classes:['PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 13200', 'PHYS 14200']},
		{require:1, classes:['PHYS 13300', 'PHYS 14300']}
	]},
	PHYS2Q120:{require:2, classes:[
		{require:1, classes:['PHYS 12100', 'PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 12200', 'PHYS 13200', 'PHYS 14200']}
	]},
};
var GROUPS = {
	GEOS:{
		LISTE:['ENST 24102','ENST 29000','PBPL 21800','PBPL 23100','PBPL 24701','ECON 19800','ECON 19900','ECON 26500','ECON 26510','PPHA 38900','PPHA 39901'],
		LISTF:['GEOS 25400','MATH 19620','MATH 20000','MATH 20100','MATH 20300','MATH 20400','MATH 20500','MATH 21100','MATH 22000','MATH 27000','MATH 27300','MATH 27500','MATH 38300','PHYS 22100','STAT 2','CMSC 28510','CMSC 34200']
	},
	MATH:{
		LOAC:['MATH 17500','MATH 17600','MATH 21100','MATH 21200','MATH 24100','MATH 24200','MATH 24300','MATH 26200','MATH 26300','MATH 26700','MATH 26800','MATH 27000','MATH 27200','MATH 27300','MATH 27400','MATH 27500','MATH 27700','MATH 27800','MATH 28000','MATH 28100','MATH 28410','MATH 29200','MATH 29700','MATH 30200','MATH 30300','MATH 30900','MATH 31000','MATH 31200','MATH 31300','MATH 31400','MATH 31700','MATH 31800','MATH 31900','MATH 32500','MATH 32600','MATH 32700']
	}
};
var requirements = {
	'Anthropology':{
		classes:[
			{require:3, classes:['ANTH 211', 'ANTH 212', 'ANTH 213', 'ANTH 214', 'ANTH 216']},
			{require:10, classes:[
				'ANTH ', 'ANTH ', 'ANTH ', 'ANTH ', 'ANTH ',
				'ANTH ', 'ANTH ', 'ANTH ', 'ANTH ', 'ANTH '
			], notes:'Up to two outside department with permission.'}
		]
	},
	'Biological Chemistry':{
		classes:[
			// General education
			'CHEM 11100',
			'CHEM 11200',
			angular.copy(SEQUENCES.MATH2Q130),
			'BIOS 20186',
			'BIOS 20187',
			// Major
			'CHEM 11300',
			{require:1, classes:['MATH 15300', 'MATH 16300', 'MATH 19620', 'MATH 13300']},
			'MATH 20000',
			'MATH 20100',
			'CHEM 20100',
			angular.copy(SEQUENCES.PHYS3Q120),
			{require:3, classes:[
				{require:1, classes:['CHEM 22000', 'CHEM 23000']},
				{require:1, classes:['CHEM 22100', 'CHEM 23100']},
				{require:1, classes:['CHEM 22200', 'CHEM 23200']}
			]},
			'CHEM 26100',
			'CHEM 26200',
			'CHEM 26700',
			{require:1, classes:['CHEM 20200', 'CHEM 23300', 'CHEM 26300']},
			'BIOS 20200',
			'BIOS 21317',
			'BIOS 2',
			{require:1, classes:['CHEM 3', 'BCMB 3'], notes:'Must be approved'}
		],
		notes:'I feel sorry for you.'},
	'Chemistry BA': {
		classes:[
			'CHEM 11100',
			'CHEM 11200',
			angular.copy(SEQUENCES.MATH2Q130),
			'CHEM 11300',
			{require:1, classes:['MATH 15300', 'MATH 16300', 'MATH 19620', 'MATH 13300']},
			'MATH 20000',
			'MATH 20100',
			angular.copy(SEQUENCES.PHYS3Q130),
			'CHEM 20100',
			{require:3, classes:[
				{require:1, classes:['CHEM 22000', 'CHEM 23000']},
				{require:1, classes:['CHEM 22100', 'CHEM 23100']},
				{require:1, classes:['CHEM 22200', 'CHEM 23200']}
			]},
			'CHEM 26100',
			'CHEM 26200',
			'CHEM 26700'
		]},
	'Chemistry BS': {
		classes:[
			'CHEM 11100',
			'CHEM 11200',
			angular.copy(SEQUENCES.MATH2Q130),
			'CHEM 11300',
			{require:1, classes:['MATH 15300', 'MATH 16300', 'MATH 19620', 'MATH 13300']},
			'MATH 20000','MATH 20100',
			angular.copy(SEQUENCES.PHYS3Q130),
			'CHEM 20100','CHEM 20200',
			{require:3, classes:[
				{require:1, classes:['CHEM 22000', 'CHEM 23000']},
				{require:1, classes:['CHEM 22100', 'CHEM 23100']},
				{require:1, classes:['CHEM 22200', 'CHEM 23200']}
			]},
			'CHEM 23300',
			'CHEM 26100','CHEM 26200','CHEM 26300',
			'CHEM 26700',
			{require:1, classes:['CHEM 22700', 'CHEM 26800']}
		]},
	'Cinema and Media Studies': {
		classes:[
			'CMST 10100',
			'CMST 28500','CMST 28600',
			'CMST 29800',
			{require:5, classes:['CMST ','CMST ','CMST ','CMST ','CMST ']},
			{require:3, classes:['CMST ','CMST ','CMST '],
				notes:'Or elsewhere that are relevant to the study of cinema.'
			},
			'CMST 29900'
		]},
	'Classical Studies': {
		classes:[
			{require:1, classes:[
				{require:3, classes:['LATN 20100', 'LATN 20200', 'LATN 20300']},
				{require:3, classes:['GREK 20100', 'GREK 20200', 'GREK 20300']}
			]},
			{require:3, classes:['LATN ','LATN ','LATN ','GREK ','GREK ','GREK ']},
			{require:6, classes:['CLCV 3','CLCV 3','CLCV 3','CLCV 3','CLCV 3','CLCV 3',
				'CLAS 3','CLAS 3','CLAS 3','CLAS 3','CLAS 3','CLAS 3']},
			'CLCV 29800'
		],
		notes:'This major has the most ridiculous dependency structure...'
	},
	'Computer Science BA':{
		classes:[
			{require:1, classes:[
				angular.copy(SEQUENCES.PHYS2Q120),
				angular.copy(SEQUENCES.CHEM2Q100)
			]},
			'MATH 13100', 'MATH 13200',
			angular.copy(SEQUENCES.CMSC2Q150),
			'CMSC 15300', 'CMSC 15400',
			{require:2, classes:[
				'CMSC 22100','CMSC 22200','CMSC 22610','CMSC 23000','CMSC 23300',
				'CMSC 23400','CMSC 23500','CMSC 23700','CMSC 23710']},
			'CMSC 27100','CMSC 27200',
			{require:1, classes:['CMSC 28000','CMSC 28100']},
			{require:3, classes:['CMSC 2','CMSC 2','CMSC 2']}
		],
		notes:'Also requires two courses from an approved sequence. The BS requires three more courses in an approved program in a related field.'
	},
	'Economics':{
		classes:[
			// General Education
			angular.copy(SEQUENCES.MATH3Q130),
			// Major
			{require:4, classes:['ECON 20000', 'ECON 20100', 'ECON 20200', 'ECON 20300']},
			{require:1, classes:['STAT 23400', 'STAT 24400']},
			{require:1, classes:['ECON 20900', 'ECON 21000']},
			{require:1, classes:[
				{require:2, classes:['MATH 19520', 'MATH 19620']},
				{require:2, classes:['MATH 20300', 'MATH 20400']},
				{require:2, classes:['MATH 20700', 'MATH 20800']}
			]},
			{require:4, classes:['ECON 2', 'ECON 2', 'ECON 2', 'ECON 2']}
		]
	},
	'Environmental Science':{
		classes:[
			angular.copy(SEQUENCES.CHEM3Q110),
			angular.copy(SEQUENCES.MATH3Q130),
			'BIOS 20197', 'BIOS 20198',
			angular.copy(SEQUENCES.PHYS3Q120),
			'GEOS 13300', 'GEOS 13400', 'GEOS 23900', 'BIOS 20196',
			{require:4, classes:[
				{require:1, classes:['GEOS 21000','GEOS 23200','GEOS 23205','GEOS 23400','GEOS 23800','GEOS 23805','GEOS 23900','GEOS 24500','GEOS 24600','GEOS 24705','GEOS 28000','GEOS 29700','GEOS 29005']},
				{require:1, classes:['BIOS 20196','BIOS 22244','BIOS 23232','BIOS 23266','BIOS 23280','BIOS 23289','BIOS 23406','BIOS 25206']},
				{require:2, notes:'Chosen from List B, D, or F'}
			]},
			{require:3, classes:angular.copy(GROUPS.GEOS.LISTE)},
			'STAT 2',
			{require:1, classes:angular.copy(GROUPS.GEOS.LISTF)}
		]
	},
	'Gender and Sexuality Studies':{
		classes:[
			'GNSE 15002','GNSE 15003',
			'GNSE 10100','GNSE 10200',
			{require:9, notes:'Fulfilling either Path A or Path B'},
			'GNSE 29800','GNSE 29900'
		]
	},
	'Geographical Studies':{
		classes:[
			'GEOG 20000','GEOG 28200',
			'GEOG 29800',
			{require:8, classes:['GEOG ','GEOG ','GEOG ','GEOG ','GEOG ','GEOG ','GEOG ','GEOG '],
			notes:'Up to three may be in approved related fields.'}
		]
	},
	'History':{
		classes:[
			'HIST 29801','HIST 29802',
			{require:10, classes:['HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ']}
		],
		notes:'This is by far the major with the most sane dependencies.'
	},
	'Linguistics':{
		classes:[
			'LING 20001','LING 20101','LING 20201','LING 20301',
			{require:9, classes:['LING ','LING ','LING ','LING ','LING ','LING ','LING ','LING ','LING '], notes:'Up to three can be in a non-Indo-European language class.'}
		]
	},
	'Mathematics BA':{
		classes:[
			{require:1, classes:[angular.copy(SEQUENCES.CHEM3Q100),angular.copy(SEQUENCES.PHYS3Q120)]},
			angular.copy(SEQUENCES.MATH2Q130),
			{require:1, classes:['MATH 16300','MATH 19900']},
			{require:3, classes:[
				{require:1, classes:['MATH 20300','MATH 20700']},
				{require:1, classes:['MATH 20400','MATH 20800']},
				{require:1, classes:['MATH 20500','MATH 20900']}
			]},
			{require:3, classes:GROUPS.MATH.LOAC},
			{require:4, notes:'Four courses within the PSCD or from CPNS but outside of mathematics, at least two of which should be taken in a single department'},
			{require:3, classes:[
				{require:1, classes:['MATH 25400','MATH 25700']},
				{require:1, clasess:['MATH 25500','MATH 25800']},
				{require:1, clasess:['MATH 25600','MATH 25900']}
			]}
		]
	},
	'Mathematics BS':{
		classes:[
			{require:1, classes:[angular.copy(SEQUENCES.CHEM3Q100),angular.copy(SEQUENCES.PHYS3Q120)]},
			angular.copy(SEQUENCES.MATH2Q130),
			{require:1, classes:['MATH 16300','MATH 19900']},
			{require:3, classes:[
				{require:1, classes:['MATH 20300','MATH 20700']},
				{require:1, classes:['MATH 20400','MATH 20800']},
				{require:1, classes:['MATH 20500','MATH 20900']}
			]},
			{require:2, classes:GROUPS.MATH.LOAC},
			{require:7, notes:'Seven courses within the PSCD or from CPNS but outside of mathematics, at least five of which should be taken in a single department'},
			{require:3, classes:[
				{require:1, classes:['MATH 25400','MATH 25700']},
				{require:1, clasess:['MATH 25500','MATH 25800']},
				{require:1, clasess:['MATH 25600','MATH 25900']}
			]}
		]
	},
	'Applied Mathematics BS':{
		classes:[
			{require:1, classes:[angular.copy(SEQUENCES.CHEM3Q100),angular.copy(SEQUENCES.PHYS3Q120)]},
			angular.copy(SEQUENCES.MATH2Q130),
			{require:1, classes:['MATH 16300','MATH 19900']},
			{require:3, classes:[
				{require:1, classes:['MATH 20300','MATH 20700']},
				{require:1, classes:['MATH 20400','MATH 20800']},
				{require:1, classes:['MATH 20500','MATH 20900']}
			]},
			{require:1, classes:['MATH 21100', 'MATH 21200']},
			{require:6, notes:'Six courses that are not MATH courses but are either within the PSCD or are CPNS courses, at least three of which should be taken in a single department'},
			{require:2, classes:[
				{require:1, classes:['MATH 25400','MATH 25700']},
				{require:1, clasess:['MATH 25500','MATH 25800']}
			]},
			'MATH 27000','MATH 27300','MATH 27500'
		]
	},
	'Mathematics with Specialization in Economics':{
		classes:[
			{require:1, classes:[angular.copy(SEQUENCES.CHEM3Q100),angular.copy(SEQUENCES.PHYS3Q120)]},
			angular.copy(SEQUENCES.MATH2Q130),
			{require:1, classes:['MATH 16300','MATH 19900']},
			{require:3, classes:[
				{require:1, classes:['MATH 20300','MATH 20700']},
				{require:1, classes:['MATH 20400','MATH 20800']},
				{require:1, classes:['MATH 20500','MATH 20900']}
			]},
			{require:2, classes:[
				{require:1, classes:['MATH 25400','MATH 25700']},
				{require:1, clasess:['MATH 25500','MATH 25800']}
			]},
			'MATH 27000',
			{require:1, classes:['MATH 27200','MATH 27300']},
			'STAT 25100',
			{require:1, classes:['STAT 23400','STAT 24400']},
			'ECON 20000','ECON 20100','ECON 20200','ECON 20300',
			{require:1, classes:['ECON 20900','ECON 21000']},
			'ECON 2','ECON 2'
		]
	},
	'Music':{
		classes:[
		'MUSI 15100', 'MUSI 15200', 'MUSI 15300',
		'MUSI 27100', 'MUSI 27200', 'MUSI 27300',
		'MUSI 23300', 'MUSI 28500',
		'MUSI 2', 'MUSI 2', 'MUSI 2', 'MUSI 2'
		],
		notes:'Participation for at leas tthree quarters in one of the Music Department\'s major ensembles.'
	},
	'Philosophy':{
		classes:[
			{require:2, classes:['PHIL 25000','PHIL 26000','PHIL 27000']},
			'PHIL 20100',
			'PHIL ','PHIL ','PHIL ','PHIL ',
			{require:1, classes:[
				{require:2, notes:'One from field A and two from field B'},
				{require:2, notes:'Two from field A and one from field B'}
			]}
		]
	},
	'Physics':{
		classes:[
			angular.copy(SEQUENCES.PHYS3Q130),
			angular.copy(SEQUENCES.MATH2Q150),
			{require:1, classes:[
				'MATH 15300','MATH 16300','MATH 22000'
			]},
			{require:1, classes:[
				'MATH 20500','PHYS 22100','MATH 20900'
			]},
			'PHYS 15400', 'PHYS 18500','PHYS 23400','PHYS 23500',
			'PHYS 21101','PHYS 21102','PHYS 21103','PHYS 22500','PHYS 22700','PHYS 19700',
			{require:3, classes:[
				'PHYS 2','PHYS 2','PHYS 2',
				'MATH 20400', 'MATH 20800', 'MATH 20500','MATH 20900',
				'MATH 2700','MATH 27200','MATH 27300','MATH 27400','MATH 27500',
				'STAT 23400','STAT 24400','STAT 24500','ASTR 24100','ASTR 24200','CHEM 26300','CHEM 26800',
				'CMSC 28510','GEOS 21200','GEOS 23200','BIOS 29326'
			], notes:'Up to two may be outside the Physics department.'}
		]
	},
	'Physics with Specialization in Astrophysics':{
		classes:[
			angular.copy(SEQUENCES.PHYS3Q130),
			angular.copy(SEQUENCES.MATH2Q150),
			{require:1, classes:[
				'MATH 15300','MATH 16300','MATH 22000'
			]},
			{require:1, classes:[
				'MATH 20500','PHYS 22100','MATH 20900'
			]},
			'PHYS 15400', 'PHYS 18500','PHYS 23400','PHYS 23500',
			'PHYS 21101','PHYS 21102','PHYS 21103','PHYS 22500','PHYS 22700','PHYS 19700',
			{require:3, classes:[
				'PHYS 2','PHYS 2','PHYS 2',
				'MATH 20400', 'MATH 20800', 'MATH 20500','MATH 20900',
				'MATH 2700','MATH 27200','MATH 27300','MATH 27400','MATH 27500',
				'STAT 23400','STAT 24400','STAT 24500','ASTR 24100','ASTR 24200','CHEM 26300','CHEM 26800',
				'CMSC 28510','GEOS 21200','GEOS 23200','BIOS 29326'
			], notes:'Up to two may be outside the Physics department.'},
			'ASTR 24100', 'ASTR 24200',
			{require:1, classes:[
				{require:1, classes:['ASTR 28200','ASTR 30500']},
				{require:3, classes:['PHYS 29100','PHYS 29200','PHYS 29300']}
			]}
		]
	},
	'Political Science':{require:1, classes:['PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC '], notes:'Students must take at least one course in three of the four subfields.'},
	
	'Psychology':{
		classes:[
			{require:1, classes:[
				{require:2, classes:['PSYC 20100','PSYC 20200']},
				{require:2, classes:['STAT 22000','PSYC 20200']}
			]},
			{require:4, classes:['PSYC 20300','PSYC 20400','PSYC 20500','PSYC 20600','PSYC 20700']},
			'PSYC ', 'PSYC ','PSYC ','PSYC ','PSYC ','PSYC '
		],
		notes:'Courses without a psychology number must be approved by the Curriculum Committee; petitions must be submitted to the undergraduate program chair.'
	},
	'Public Policy':{
		classes:[
			angular.copy(SEQUENCES.MATH3Q130),
			'PBPL 22100','PBPL 22200','PBPL 22300',
			{require:1, classes:['ECON 20000','PBPL 20000']},
			{require:1, classes:['STAT 22000','STAT 23400']},
			'PBPL 26200','PBPL 26300','PBPL 29800'
		]
	},
	'Statistics BA':{
		classes:[
			angular.copy(SEQUENCES.MATH3Q130),
			{require:1,classes:[
				{require:2,classes:['MATH 20000','MATH 20100']},
				{require:2,classes:['MATH 20400','MATH 20500']},
				{require:2,classes:['MATH 20800','MATH 20900']}
			]},
			{require:1, classes:['STAT 24300','MATH 25500','MATH 25800']},
			'STAT 24400','STAT 24500','STAT 25100',
			{require:1, classes:['STAT 22400','STAT 34300']},
			{require:1, classes:['CMSC 10500','CMSC 10600','CMSC 12100','CMSC 15100','CMSC 16100']},
			'STAT ','STAT '
		]
	},
	'Statistics BS':{
		classes:[
			angular.copy(SEQUENCES.MATH3Q130),
			{require:1,classes:['MATH 20000','MATH 20500','MATH 20900']},
			{require:1,classes:['MATH 20100','MATH 27300']},
			{require:1,classes:['STAT 24300','MATH 25500','MATH 25800']},
			'STAT 24400', 'STAT 24500','STAT 25100',
			{require:1,classes:['STAT 22400','STAT 34300']},
			{require:1,classes:[
				{require:2,classes:['CMSC 12100','CMSC 12200']},
				{require:2,classes:['CMSC 15100','CMSC 15200']},
				{require:2,classes:['CMSC 16100','CMSC 16200']}
			]},
			'STAT ','STAT ','STAT '
		],
		notes:'Also requires a coherent two-quarter sequence at the 20000 level in a field to which statistics can be applied.'
	},
	'Visual Arts':{
		classes:[
			{require:1, classes:['ARTV 10100','ARTV 10200','ARTV 10300']},
			'ARTV 15000','ARTV 29600','ARTV 298500',
			'ARTV 2','ARTV 2','ARTV 2','ARTV 2','ARTV 2','ARTV'
		],
		notes:'Also requires three electives relevant to the major.'
	}
};
for(var major in requirements) {
	(function preprocess(node, root) {
		if(node.classes) {
			for(var i = 0; i < node.classes.length; i++) {
				if(typeof node.classes[i] == 'string') {
					node.classes[i] = {require:1, classes:node.classes[i]};
				} else {
					preprocess(node.classes[i], false);
				}
			}
			if(!root && typeof node.classes != 'string') {
				node.classes.sort(function(left, right) {
					return left.require - right.require;
				});
			}
		}
	})(requirements[major], true);
}
