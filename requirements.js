var SEQUENCES = {
	MATH2Q130:{require:2, classes:[
		{require:1, classes:['MATH 13100', 'MATH 15100', 'MATH 16100']},
		{require:1, classes:['MATH 13200', 'MATH 15200', 'MATH 16200']}
	],
	notes:'Two quarters of MATH 130 or higher',hidden:true},
	MATH3Q130:{require:3, classes:[
		{require:1, classes:['MATH 13100', 'MATH 15100', 'MATH 16100']},
		{require:1, classes:['MATH 13200', 'MATH 15200', 'MATH 16200']},
		{require:1, classes:['MATH 13300', 'MATH 15300', 'MATH 16300']}
	],
	notes:'Three quarters of MATH 130 or higher',hidden:true},
	MATH2Q150:{require:2, classes:[
		{require:1, classes:['MATH 15100', 'MATH 16100']},
		{require:1, classes:['MATH 15200', 'MATH 16200']}
	],
	notes:'Two quarters of MATH 150 or higher',hidden:true},
	CHEM2Q100:{require:2, classes:[
		{require:1, classes:['CHEM 10100', 'CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 10200', 'CHEM 11200', 'CHEM 12200']}
	],
	notes:'Two quarters of CHEM 100 or higher',hidden:true},
	CHEM2Q110:{require:2, classes:[
		{require:1, classes:['CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 11200', 'CHEM 12200']}
	],
	notes:'Two quarters of CHEM 110 or higher',hidden:true},
	CHEM2Q120:{require:2, classes:['CHEM 12100', 'CHEM 12200'],
	notes:'Two quarters of CHEM 120 or higher',hidden:true},
	CHEM3Q100:{require:3, classes:[
		{require:1, classes:['CHEM 10100', 'CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 10200', 'CHEM 11200', 'CHEM 12200']},
		{require:1, classes:['CHEM 10300', 'CHEM 11300', 'CHEM 12300']}
	],
	notes:'Three quarters of CHEM 100 or higher',hidden:true},
	CHEM3Q110:{require:3, classes:[
		{require:1, classes:['CHEM 11100', 'CHEM 12100']},
		{require:1, classes:['CHEM 11200', 'CHEM 12200']},
		{require:1, classes:['CHEM 11300', 'CHEM 12300']}
	],
	notes:'Three quarters of CHEM 110 or higher',hidden:true},
	CMSC2Q120:{require:2, classes:[
		{require:1, classes:['CMSC 12100', 'CMSC 15100', 'CMSC 16100']},
		{require:1, classes:['CMSC 12200', 'CMSC 15200', 'CMSC 16200']}
	],
	notes:'Two quarters of CMSC 120 or higher',hidden:true},
	CMSC2Q150:{require:2, classes:[
		{require:1, classes:['CMSC 15100', 'CMSC 16100']},
		{require:1, classes:['CMSC 15200', 'CMSC 16200']}
	],
	notes:'Two quarters of CMSC 150 or higher',hidden:true},
	PHYS3Q120:{require:3, classes:[
		{require:1, classes:['PHYS 12100', 'PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 12200', 'PHYS 13200', 'PHYS 14200']},
		{require:1, classes:['PHYS 12300', 'PHYS 13300', 'PHYS 14300']}
	],
	notes:'Three quarters of PHYS 120 or higher',hidden:true},
	PHYS2Q130:{require:2, classes:[
		{require:1, classes:['PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 13200', 'PHYS 14200']},
	],
	notes:'Two quarters of PHYS 130 or higher',hidden:true},
	PHYS3Q130:{require:3, classes:[
		{require:1, classes:['PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 13200', 'PHYS 14200']},
		{require:1, classes:['PHYS 13300', 'PHYS 14300']}
	],
	notes:'Three quarters of PHYS 130 or higher',hidden:true},
	PHYS2Q120:{require:2, classes:[
		{require:1, classes:['PHYS 12100', 'PHYS 13100', 'PHYS 14100']},
		{require:1, classes:['PHYS 12200', 'PHYS 13200', 'PHYS 14200']}
	],
	notes:'Two quarters of PHYS 120 or higher',hidden:true},
	ORGO2Q220:{require:2, classes:[
		{require:1, classes:['CHEM 22000', 'CHEM 23000']},
		{require:1, classes:['CHEM 22100', 'CHEM 23100']}
	], notes:'Two quarters of organic chem',hidden:true}
};
var GROUPS = {
	CORE_HUM:[
		'HUMA 11000','HUMA 11100','HUMA 11200',
		'HUMA 11500','HUMA 11600','HUMA 11700',
		'HUMA 12000','HUMA 12100','HUMA 12200',
		'HUMA 12300','HUMA 12400','HUMA 12500',
		'HUMA 13500','HUMA 13600','HUMA 13700',
		'HUMA 14000','HUMA 14100','HUMA 14200',
		'HUMA 16000','HUMA 16100','HUMA 16200',
		'HUMA 17000','HUMA 17100','HUMA 17200'
	],
	CORE_CIV:[
		"CRES 24001","CRES 24002","CRES 24003",
		"EALC 10800","EALC 10900","EALC 11000","EALC 15400",
		"GNSE 15002","GNSE 15003",
		"HIPS 17300","HIPS 17400","HIPS 17402","HIPS 17501","HIPS 17502","HIPS 17503",
		"HIST 10101","HIST 10102",
		"HIST 13001","HIST 13002","HIST 13003",
		"HIST 13100","HIST 13200","HIST 13300",
		"HIST 13500","HIST 13600","HIST 13700",
		"HIST 13900","HIST 14000",
		"HIST 16700","HIST 16800","HIST 16900",
		"JWSC 20001","JWSC 20002","JWSC 20003",
		"JWSC 20004","JWSC 20005","JWSC 20006",
		"LACS 16100","LACS 16200",'LACS 16300',
		"MUSI 12100",'MUSI 12200',
		'NEHC 20001','NEHC 20002','NEHC 20003',
		'NEHC 20004','NEHC 20005','NEHC 20006',
		'NEHC 20011','NEHC 20012','NEHC 20013',
		'NEHC 20416','NEHC 20417','NEHC 20418',
		'NEHC 20501','NEHC 20502','NEHC 20503',
		'NEHC 20601','NEHC 20602','NEHC 20603',
		'SALC 20100','SALC 20200',
		// classes abroad, paris
		'SOSC 27501', 'SOSC 27601', 'SOSC 27701',
		'SOSC 22551', 'SOSC 22552', 'SOSC 22553',
		// classes abroad, oaxaca
		'SOSC 19019', 'SOSC 19020', 'SOSC 19021',
		// classes abroad, vienna
		'SOSC 24600', 'SOSC 24700', 'SOSC 24800',
		// classes abroad, athens
		'SOSC 19007', 'SOSC 19008', 'SOSC 19009',
		// classes abroad, jerusalem
		'SOSC 19028', 'SOSC 19029', 'SOSC 19030'
	],
	CORE_ART:[
		'ARTH 1','CRWR 121','TAPS 10','TAPS 28400',
		'ARTH 1','CRWR 121','TAPS 10','TAPS 28401',
		'ARTV 10100','ARTV 10200','ARTV 10300',
		'MUSI 10100','MUSI 10200','MUSI 10300','MUSI 10400'
	],
	CHDV:{
		METHODS:['STAT 20000','PSYC 20100','CHDV 20101','CHDV 20405','CHDV 26228','CHDV 29301','CHDV 30102','CHDV 32411','CHDV 37802','CHDV 42214'],
		DISTRIBUTION:{
			A:['PSYC 20300','CHDV 21500','CHDV 21800','CHDV 22201','CHDV 23249','CHDV 26227','CHDV 26232','CHDV 26660','CHDV 27950','CHDV 30901','CHDV 34800','CHDV 37850','CHDV 40900'],
			B:['CHDV 20150','CHDV 20207','CHDV 20209','CHDV 21000','CHDV 21901','CHDV 23900','CHDV 25900','CHDV 26226','CHDV 26233','CHDV 26235','CHDV 30405','CHDV 41160','CHDV 41601','CHDV 45501','CHDV 45601'],
			C:['CHDV 20150','CHDV 20207','CHDV 20405','CHDV 21000','CHDV 21401','CHDV 21901','CHDV 23204','CHDV 23301','CHDV 26000','CHDV 26228','CHDV 26233','CHDV 27501','CHDV 27821','CHDV 30302','CHDV 30320','CHDV 30405','CHDV 32101','CHDV 41160','CHDV 42212','CHDV 42213','CHDV 45600','CHDV 45601','CHDV 48415'],
			D:['CHDV 20209','CHDV 23204','CHDV 23301','CHDV 23620','CHDV 23800','CHDV 26233','CHDV 26310','CHDV 27700','CHDV 30320','CHDV 30405','CHDV 40110','CHDV 41160','CHDV 44200']
		}
	},
	GEOS:{
		LISTA:['GEOS 21000','GEOS 21005','GEOS 21100','GEOS 21200','GEOS 21205','GEOS 21400','GEOS 22000','GEOS 22040','GEOS 22050','GEOS 22060','GEOS 22200','GEOS 23200','GEOS 23205','GEOS 23400','GEOS 23800','GEOS 23805','GEOS 23900','GEOS 24200','GEOS 24500','GEOS 24600','GEOS 24705','GEOS 25400','GEOS 26300','GEOS 26600','GEOS 27000','GEOS 28000','GEOS 28100','GEOS 28300','GEOS 29700','GEOS 29001','GEOS 29002','GEOS 29003'],
		LISTB:['GEOS 21000','GEOS 23200','GEOS 23205','GEOS 23400','GEOS 23800','GEOS 23805','GEOS 23900','GEOS 24200','GEOS 24500','GEOS 24600','GEOS 24705','GEOS 26600','GEOS 28000','GEOS 29700','BIOS 20196','BIOS 22244','BIOS 23232','BIOS 23266','BIOS 23289','BIOS 23406','BIOS 25206','BIOS 23280','GEOS 29005'],
		LISTC:['BIOS 20191','BIOS 20194','BIOS 20196','BIOS 20200','BIOS 21208','BIOS 22243','BIOS 22244','BIOS 23289','BIOS 23404','BIOS 23406','BIOS 25206','CHEM 20100','CHEM 20200','CHEM 22000','CHEM 22100','CHEM 22200','CHEM 23000','CHEM 23100','CHEM 23200','CHEM 26100','CHEM 26200','CHEM 26300','PHYS 18500','PHYS 19700','PHYS 22500','PHYS 22700','PHYS 22600'],
		LISTD:['CHEM 20100','CHEM 20200','CHEM 22000','CHEM 22100','CHEM 22200','CHEM 23000','CHEM 23100','CHEM 23200','CHEM 26100','CHEM 26200','CHEM 26300','BIOS 2018','BIOS 2019','BIOS 20200','BIOS 20242','BIOS 21208','BIOS 25206','BIOS 23252','BIOS 23254','BIOS 23258','BIOS 23289'],
		LISTE:['ENST 24102','ENST 29000','PBPL 21800','PBPL 23100','PBPL 24701','ECON 19800','ECON 19900','ECON 26500','ECON 26510','PPHA 38900','PPHA 39901'],
		LISTF:['GEOS 25400','MATH 19620','MATH 20000','MATH 20100','MATH 20300','MATH 20400','MATH 20500','MATH 21100','MATH 22000','MATH 27000','MATH 27300','MATH 27500','MATH 38300','PHYS 22100','STAT 2','CMSC 28510','CMSC 34200']
	},
	MATH:{
		LOAC:['MATH 17500','MATH 17600','MATH 21100','MATH 21200','MATH 24100','MATH 24200','MATH 24300','MATH 26200','MATH 26300','MATH 26700','MATH 26800','MATH 27000','MATH 27200','MATH 27300','MATH 27400','MATH 27500','MATH 27700','MATH 27800','MATH 28000','MATH 28100','MATH 28410','MATH 29200','MATH 295','MATH 295','MATH 295','MATH 29700','MATH 30200','MATH 30300','MATH 30900','MATH 31000','MATH 31200','MATH 31300','MATH 31400','MATH 31700','MATH 31800','MATH 31900','MATH 32500','MATH 32600','MATH 32700']
	},
	ENST:{
		ENV_ECON:['ANTH 22000','ANTH 24500','ECON 26500','ECON 26510','BPRO 29000','GEOG 22700','GEOG 23500','GEOG 26100','GEOG 26300','GEOG 26600','GEOG 42400','ENST 23100','ENST 23500','ENST 23600','ENST 23700','ENST 24101','ENST 24301','ENST 24400','ENST 24701','ENST 24800','ENST 24901','ENST 25501','ENST 28001','PLSC 20407','PLSC 21308','PLSC 22200','PBPL 20000','PBPL 21800','PBPL 22100','PBPL 22200','PBPL 22300','PBPL 23000','PBPL 24600','PBPL 24800','SOCI 20104','SOCI 20122','SOCI 20129','SOCI 20146','SOCI 20152'],
		SOCI_NATURAL:['ANTH 21204','ANTH 22000','ANTH 22400','ANTH 28000','ANTH 28210','ANTH 28410','ANTH 28500','ANTH 29100','ANTH 39205','ARTH 15700','ARTH 26305','EALC 26300','ENGL 18903','ENGL 25104','ENGL 25403','ENST 22501','ENST 23500','ENST 23600','ENST 23700','ENST 24400','ENST 24800','ENST 25501','ENST 28001','ENST 28402','ENST 28600','ENST 28700','GEOG 20100','GEOG 21900','GEOG 22100','GEOG 22700','GEOG 23500','GEOG 25300','GEOG 25500','GEOG 26100','GEOG 26600','GEOG 29400','GEOG 42400','HIPS 17502','HIPS 29507','HIST 22705','CHDV 21500','INST 23101','INST 23102','PHIL 20300','PHIL 22201','PHIL 24901','PHIL 25100','PLSC 20407','PLSC 21308','PLSC 22200','SOCI 20104','SOCI 20122','SOCI 20129','SOCI 20146','SOCI 20152'],
		GENERAL:['ANTH 28100','ANTH 28300','ANTH 28400','ANTH 28600','BIOS 02810','BIOS 10110','BIOS 20184','BIOS 20185','BIOS 11104','BIOS 11109','BIOS 13106','BIOS 13107','BIOS 13109','BIOS 13113','BIOS 23232','BIOS 23233','BIOS 23241','BIOS 23246','BIOS 23248','BIOS 23252','BIOS 23254','BIOS 23266','BIOS 23280','BIOS 23289','BIOS 23299','BIOS 23351','BIOS 23401','BIOS 23406','BIOS 29286','BIOS 29291','BIOS 29299','ENST 11101','ENST 11201','ENST 11301','ENST 12100','ENST 12402','ENST 14200','ENST 14300','ENST 27400','GEOS 13100','GEOS 13300','GEOS 13400','GEOS 21200','GEOS 23200','GEOS 23300','GEOS 23400','GEOS 23800','GEOS 23900','GEOS 24500','GEOS 25300','NTSC 10300','PHSC 10900','PHSC 11000']
	},
	LLSO:{
		LETTERS:['LLSO 20601','LLSO 20702','LLSO 21710','LLSO 21810','LLSO 21811','LLSO 22104','LLSO 22612','LLSO 23501','LLSO 23900','LLSO 24300','LLSO 24711','LLSO 25411','LLSO 25417','LLSO 25612','LLSO 25903','LLSO 26815','LLSO 28233','LLSO 28500','LLSO 28611'],
		SOCIETY:['LLSO 20602','LLSO 20603','LLSO 20606','LLSO 20911','LLSO 21103','LLSO 21210','LLSO 22106','LLSO 22209','LLSO 22210','LLSO 22612','LLSO 22707','LLSO 22710','LLSO 23100','LLSO 23114','LLSO 23402','LLSO 23415','LLSO 24000','LLSO 24011','LLSO 24901','LLSO 25100','LLSO 25203','LLSO 25204','LLSO 25215','LLSO 25610','LLSO 25903','LLSO 25904','LLSO 26000','LLSO 26109','LLSO 26201','LLSO 26202','LLSO 26500','LLSO 26601','LLSO 26702','LLSO 26802','LLSO 26803','LLSO 26804','LLSO 27100','LLSO 27101','LLSO 27200','LLSO 27306','LLSO 27307','LLSO 27601','LLSO 27704','LLSO 27801','LLSO 28000','LLSO 28010','LLSO 28100','LLSO 28212','LLSO 28311','LLSO 28313','LLSO 28314','LLSO 28604','LLSO 28613','LLSO 28710','LLSO 28711','LLSO 29000','LLSO 29201']
	},
	PBPL:{
		METHODS:['PBPL 26200', 'PBPL 26500', 'PBPL 26605', 'PBPL 27040', 'GEOG 28200', 'SOCI 20001', 'SOCI 20111', 'PPHA 34600', 'PPHA 34810', 'SSAD 30200'],
		WINDOWS:['PBPL 26300', 'PBPL 24751', 'PBPL 26801', 'SOCI 20140']
	}
};
var CORE_EXCLUSION_LIST = GROUPS.CORE_CIV.concat(GROUPS.CORE_ART).concat(['HUMA 1', 'SOSC 1']).concat([
	'CHEM 10100', 'CHEM 10200', 'CHEM 11100', 'CHEM 11200', 'CHEM 12100', 'CHEM 12200', 'GEOS 13100', 'GEOS 13200',
	'PHYS 12100', 'PHYS 12200', 'PHYS 13100', 'PHYS 13200', 'PHYS 14100', 'PHYS 14200', 'PHSC 10900', 'PHSC 11000',
	'PHSC 13400', 'PHSC 11100', 'PHSC 11200', 'PHSC 11300', 'PHSC 11400', 'PHSC 11500', 'PHSC 11900', 'PHSC 12000',
	'PHSC 11902', 'PHSC 13500', 'PHSC 13600'
]).concat([
	'BIOS 10130', 'BIOS 20', 'NTSC 10100', 'NTSC 10200', 'NTSC 10300', 'NTSC 10400'
]).concat([
	'CMSC 10200', 'CMSC 10500', 'CMSC 10600', 'CMSC 11000', 'CMSC 11100', 'CMSC 12100', 'CMSC 12200', 'CMSC 15100',
	'CMSC 15200', 'CMSC 16100', 'CMSC 16200', 'MATH 11200', 'MATH 11300', 'MATH 13100', 'MATH 13200', 'MATH 15100',
	'MATH 15200', 'MATH 16100', 'MATH 16200', 'STAT 20000'
]).reduce(function(p, c) {
	if(p.indexOf(c) < 0) { p.push(c) }
	return p;
}, []);
var LANGUAGES = {'AANL':'Hittite','ASLG':'American Sign Language','GREK':'Greek','LATN':'Latin','MOGK':'Modern Greek','CHIN':'Chinese','JAPN':'Japanese','KORE':'Korean','GRMN':'German','NORW':'Norwegian','YDDH':'Yiddish','BASQ':'Basque','SWAH':'Swahili','AKKD':'Akkadian','ARAB':'Arabic','ARAM':'Aramaic','ARME':'Armenian','EGPT':'Egyptian','HEBR':'Hebrew','KAZK':'Kazak','PERS':'Persian','TURK':'Turkish','UGAR':'Ugaritic','UZBK':'Uzbek','CATA':'Catalan','FREN':'French','ITAL':'Italian','PORT':'Portuguese','SPAN':'Spanish','BCSN':'Bosnian/Croatian/Serbian','CZEC':'Czech','GEOR':'Georgian','POLI':'Polish','RUSS':'Russian','BANG':'Bangla','HIND':'Hindi','MALA':'Malayalam','MARA':'Marathi','PALI':'Pali','SANS':'Sanskrit','TAML':'Tamil','TLGU':'Telugu','TBTN':'Tibetian','URDU':'Urdu'};
var EVALUATORS = {
	REQUIRE:function(base, require, or) {
		if(isString(require)) {
			return EVALUATORS.REQUIRE(base, [require], or);
		} else {
			return {require:1, classes:base, evaluate:function(taken) {
					if(or) {
						return (require.some(function(r) { return taken.binarySearch(r) >= 0 }) ? true : 'Only accepted if ' + require.join(' or ') + ' also taken')
					} else {
						return (require.every(function(r) { return taken.binarySearch(r) >= 0 }) ? true : 'Only accepted if ' + require.join(', ') + ' also taken')
					}
				}
			}
		}
	},
	CHDV:function(title, set, exclude) {
		// only approve the course set if and only if at least the max number is satisfied, ie all or nothing behavior
		return {require:3, notes:title, max:3, classes:angular.copy(set), hidden:true, evaluate:function(taken) {
				var resp = (set.filter(function(s) {
					return taken.binarySearch(s) > -1
				}).length >= 3 ? true : 'Sequence accepted when all three classes are completed.');
				for(var i = 0; i < exclude.length; i++) {
					if(exclude[i].filter(function(s) {
						return taken.binarySearch(s) > -1
					}).length >= 3) {
						return 'Distribution requirement already fulfilled.';
					}
				}
				return resp;
			}
		};
	}
};
var REQUIREMENTS = {
	'College Core':{
		link:{
			catalog:'thecurriculum/'
		},
		classes:[
			// Humanities requirement
			{require:2, classes:angular.copy(GROUPS.CORE_HUM), notes:'Two quarters of hum', hidden:true, max:2},
			{require:2, hidden:true, max:2, classes:angular.copy(GROUPS.CORE_CIV), notes:'Two quarters of civ'},
			{require:1, hidden:true, max:1, classes:angular.copy(GROUPS.CORE_ART), notes:'One quarter of art'},
			{require:1, hidden:true, classes:[
				EVALUATORS.REQUIRE('HUMA 11200', ['HUMA 11000', 'HUMA 11100']),
				EVALUATORS.REQUIRE('HUMA 11700', ['HUMA 11500', 'HUMA 11600']),
				EVALUATORS.REQUIRE('HUMA 12200', ['HUMA 12000', 'HUMA 12100']),
				EVALUATORS.REQUIRE('HUMA 12500', ['HUMA 12300', 'HUMA 12400']),
				EVALUATORS.REQUIRE('HUMA 13700', ['HUMA 13500', 'HUMA 13600']),
				EVALUATORS.REQUIRE('HUMA 14200', ['HUMA 14000', 'HUMA 14100']),
				EVALUATORS.REQUIRE('HUMA 16200', ['HUMA 16000', 'HUMA 16100']),
				EVALUATORS.REQUIRE('HUMA 17200', ['HUMA 17000', 'HUMA 17100']),
				EVALUATORS.REQUIRE('CRES 24003', ['CRES 24001', 'CRES 24002']),
				EVALUATORS.REQUIRE('EALC 11000', ['EALC 10800', 'EALC 10900']),
				'EALC 15400',
				'HIPS 17300', 'HIPS 17400', 'HIPS 17402', 'HIPS 17501', 'HIPS 17502', 'HIPS 17503',
				EVALUATORS.REQUIRE('HIST 13003', ['HIST 13001', 'HIST 13002']),
				EVALUATORS.REQUIRE('HIST 13300', ['HIST 13100', 'HIST 13200']),
				EVALUATORS.REQUIRE('HIST 13700', ['HIST 13500', 'HIST 13600']),
				EVALUATORS.REQUIRE('HIST 16900', ['HIST 16700', 'HIST 16800']),
				EVALUATORS.REQUIRE('JWSC 20003', ['JWSC 20001', 'JWSC 20002']),
				EVALUATORS.REQUIRE('JWSC 20006', ['JWSC 20004', 'JWSC 20005']),
				EVALUATORS.REQUIRE('LACS 16300', ['LACS 16100', 'LACS 16200']),
				EVALUATORS.REQUIRE('NEHC 20003', ['NEHC 20001', 'NEHC 20002']),
				EVALUATORS.REQUIRE('NEHC 20006', ['NEHC 20004', 'NEHC 20005']),
				EVALUATORS.REQUIRE('NEHC 20013', ['NEHC 20011', 'NEHC 20012']),
				EVALUATORS.REQUIRE('NEHC 20418', ['NEHC 20416', 'NEHC 20417']),
				EVALUATORS.REQUIRE('NEHC 20503', ['NEHC 20501', 'NEHC 20502']),
				EVALUATORS.REQUIRE('NEHC 20603', ['NEHC 20601', 'NEHC 20602']),
				EVALUATORS.REQUIRE('SOSC 27701', ['SOSC 27501', 'SOSC 27601']),
				EVALUATORS.REQUIRE('SOSC 19021', ['SOSC 19019', 'SOSC 19020']),
				EVALUATORS.REQUIRE('SOSC 24800', ['SOSC 24600', 'SOSC 24700']),
				EVALUATORS.REQUIRE('SOSC 19009', ['SOSC 19007', 'SOSC 19008'])
			].concat(GROUPS.CORE_ART), notes:'One quarter of hum, civ, or art'},
			// Social Sciences requirement
			{require:3, classes:['SOSC 1','SOSC 1','SOSC 1'], notes:'Three quarters of sosc'},
			// Physical Sciences requirement
			{require:1, classes:[
				angular.copy(SEQUENCES.CHEM2Q100),
				angular.copy(SEQUENCES.PHYS2Q120),
				{require:2, classes:['PHSC 1','PHSC 1']}
			],
			max:2, hidden:true,
			notes:'Two quarters of phy sci'},
			// Biological Sciences requirement
			{require:1, classes:[
				{require:2, classes:['BIOS 1', 'BIOS 1']},
				{require:2, classes:['BIOS 20', 'BIOS 20'], notes:'For nonmajors preparing for the health professions'},
				{require:2, classes:['BIOS 20150', {require:1, classes:['BIOS 20151', 'BIOS 20152']}], notes:'For students majoring in the Biological Sciences'},
				{require:2, classes:['NTSC 10', 'NTSC 10']}
			],
			max:2, hidden:true,
			notes:'Two quarters of bio'},
			// Mathematical Sciences requirement
			{require:1, classes:['CMSC 10200', 'CMSC 10500', 'CMSC 11000', 'CMSC 12100', 'CMSC 15100', 'CMSC 16100', 'MATH 11200',
				EVALUATORS.REQUIRE('MATH 13100', ['MATH 13200', 'MATH 15200', 'MATH 16200'], true),
				EVALUATORS.REQUIRE('MATH 15100', ['MATH 13200', 'MATH 15200', 'MATH 16200'], true),
				EVALUATORS.REQUIRE('MATH 16100', ['MATH 13200', 'MATH 15200', 'MATH 16200'], true),
				'STAT 20000', 'STAT 22000'], notes:'One quarter of math', hidden:true},
			// 6th Phy Sci/Bio/Math requirement
			{require:1, classes:['CMSC 10600', 'CMSC 11100', 'CMSC 12200', 'CMSC 15200', 'CMSC 16200', 
				EVALUATORS.REQUIRE('MATH 13200', ['MATH 13100', 'MATH 15100', 'MATH 16100'], true),
				EVALUATORS.REQUIRE('MATH 15200', ['MATH 13100', 'MATH 15100', 'MATH 16100'], true),
				EVALUATORS.REQUIRE('MATH 16200', ['MATH 13100', 'MATH 15100', 'MATH 16100'], true),
				'BIOS ','CHEM ','NTSC ','PHSC ','PHYS '
				], notes:'One quarter of phy sci, bio, or math.', hidden:true},
			// Language competency requirement
			{require:1, classes:(function() {
				var out = [];
				for(var dept in LANGUAGES) {
					out.push({
						require:1, classes:[
							dept + ' 2', dept + ' 10300'
						], notes:LANGUAGES[dept], hidden:true});
				}
				return out;
			})(),
			hidden:true,
			notes:'One year of a language'}
		]
	},
	'Anthropology':{
		classes:[
			{require:3, classes:['ANTH 211', 'ANTH 212', 'ANTH 213', 'ANTH 214', 'ANTH 216']},
			{require:10, classes:[
				'ANTH ', 'ANTH ', 'ANTH ', 'ANTH ', 'ANTH ',
				'ANTH ', 'ANTH ', 'ANTH ', 'ANTH ', 'ANTH '
			], notes:'Up to two outside department with permission.'}
		],
		link:{
			catalog:'anthropology/#summaryofrequirements'
		}
	},
	'Art History':{
		classes:[
			'ARTH 29600', 'ARTH 29800',
			'ARTH 14', 'ARTH 15', 'ARTH 16',
			{require:1, classes:['ARTH 14', 'ARTH 15', 'ARTH 16']},
			'ARTH 2', 'ARTH 2', 'ARTH 2', 'ARTH 2', 'ARTH 2', 'ARTH 2'
		],
		link:{
			catalog:'arthistory/#summaryofrequirements'
		},
		notes:'ARTH electives dependent on selected track.'
	},
	'Art History Minor':{
		classes:[
			'ARTH 14', 'ARTH 15', 'ARTH 16', 'ARTH 2', 'ARTH 2', 'ARTH 2', 'ARTH 2'
		],
		notes:'Students also write one research paper of about ten to fifteen pages on a topic chosen with and guided by the instructor, by individual arrangement at the start of one of the 20000-level courses.',
		link:{
			catalog:'arthistory/#minorprograminarthistory'
		}
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
		notes:'I feel sorry for you.',
		link:{
			catalog:'biologicalchemistry/#summaryofrequirements'
		}
	},
	// this is some shit man.
	'Biological Sciences':{
		classes:[
			angular.copy(SEQUENCES.CHEM3Q100),
			angular.copy(SEQUENCES.MATH2Q130),
			'BIOS 20150',
			{require:1, classes:[
				{require:7, classes:[
					angular.copy(SEQUENCES.PHYS2Q120),
					angular.copy(SEQUENCES.ORGO2Q220),
					'BIOS 20234', 'BIOS 20235', 'BIOS 20236', 'BIOS 20200', 'BIOS 20242'
				], notes:'AP Track', hidden:true, duplicates:true},
				{require:8, classes:[
					{require:1, classes:['BIOS 20151', 'BIOS 20152']},
					angular.copy(SEQUENCES.PHYS2Q120),
					angular.copy(SEQUENCES.ORGO2Q220),
					'BIOS 20186', 'BIOS 20187', 'BIOS 20188', 'BIOS 20190', 'BIOS 20200'
				], notes:'Track A', hidden:true, duplicates:true},
				{require:8, classes:[
					{require:1, classes:['BIOS 20151', 'BIOS 20152']},
					angular.copy(SEQUENCES.PHYS2Q120),
					angular.copy(SEQUENCES.ORGO2Q220),
					'BIOS 20186', 'BIOS 20187', 'BIOS 20189', 'BIOS 20200', 'BIOS 20242'
				], notes:'Track B', hidden:true, duplicates:true},
				{require:4, classes:[
					{require:1, classes:['BIOS 20151', 'BIOS 20152'], duplicates:true},
					{require:1, classes:[
						angular.copy(SEQUENCES.PHYS2Q120),
						angular.copy(SEQUENCES.ORGO2Q220)
					], duplicates:true},
					{require:3, classes:['BIOS 20196', 'BIOS 20197', 'BIOS 20198'], duplicates:true},
					{require:4, notes:'Three quantitative courses and one genetics course'}
				], notes:'Track C', hidden:true}
			]},
			{require:1, classes:['BIOS 26210', 'PHYS 12300', 'PHYS 13300', 'PHYS 14300', 'STAT 2']},
			'BIOS 2', 'BIOS 2', 'BIOS 2', 'BIOS 2', 'BIOS 2'
		],
		notes:'It\'s like someone decided to write these requirements to weed people out based on whether or not they were willing to figure them out...',
		link:{
			catalog:'biologicalsciences/#requirementsforthebachelorofartsdegreeinthebiologicalsciences'
		}
	},
	'Biological Sciences:Cancer Specialization':{
		classes:[
			{require:2, classes:['BIOS 25108', 'BIOS 25308'],
			notes:'Must achieve an A or B grade in both courses'},
			{require:1, classes:['BIOS 25309', 'BIOS 25310']}
		]
	},
	'Biological Sciences:Cellular and Molecular Specialization':{
		classes:[
			{require:1, classes:[
				'CHEM 22200', 'CHEM 23200'
			]},
			{require:3, classes:[
				'BIOS 21207', 'BIOS 21236',
				{require:1, classes:['BIOS 21237', 'BIOS 23299']},
				'BIOS 21208'
			]}
		]
	},
	'Biological Sciences:Endocrinology Specialization':{
		classes:['BIOS 25226', 'BIOS 25227', 'BIOS 25228']
	},
	'Biological Sciences:Genetics Specialization':{
		classes:[
			{require:1, classes:['BIOS 20182', 'BIOS 20187', 'BIOS 20235']},
			{require:1, classes:['BIOS 20185', 'BIOS 20197']},
			'STAT 22000',
			'BIOS 21206',
			{require:1, classes:['BIOS 21236', 'BIOS 23258']},
			{require:2, classes:[
				'BIOS 21208', 'BIOS 21216', 'BIOS 21237', 'BIOS 21229', 'BIOS 21306', 'BIOS 23286', 'BIOS 23299', 'BIOS 25216', 'BIOS 25287', 'BIOS 28407', 'BIOS 29319'
			]}
		]
	},
	'Biological Sciences:Immunology Specialization':{
		classes:['BIOS 25256', 'BIOS 25258', 'BIOS 25266', 'BIOS 25260']
	},
	'Biological Sciences:Microbiology Specialization':{
		classes:['BIOS 25206', 'BIOS 25216', 'BIOS 25287']
	},
	'Biological Sciences:Neuroscience Specialization':{
		classes:['BIOS 24203', 'BIOS 24204', 'BIOS 24205']
	},
	'Biological Sciences Minor':{
		classes:['BIOS ', 'BIOS ', 'BIOS ', 'BIOS ', 'BIOS ', 'BIOS ', 'BIOS '],
		noCore:true,
		link:{
			catalog:'biologicalsciences/#minorprograminthebiologicalsciences'
		}
	},
	'Chemistry': {
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
		],
		link:{
			catalog:'chemistry/#summaryofrequirementsbainchemistry'
		}
	},
	'Chemistry:Bachelor of Science': {
		classes:[
			'CHEM 20200','CHEM 23300','CHEM 26300',
			{require:1, classes:['CHEM 22700', 'CHEM 26800']}
		],
		link:{
			catalog:'chemistry/#summaryofrequirementsbsinchemistry'
		}
	},
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
		],
		link:{
			catalog:'cinemamediastudies/#summaryofrequirements'
		}
	},
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
		link:{
			catalog:'classicalstudies/#programrequirements'
		}
	},
	'Comparative Human Development':{
		notes:'This section runs off an experimental algorithm. It may not work correctly. If it doesn\'t, please email me your class list at kdwang@uchicago.edu, and I\'ll get it fixed. Thanks!',
		classes:[
			'CHDV 20000', 'CHDV 20100',
			{require:1, classes:[
				EVALUATORS.CHDV('Comparative Behavioral Biology', GROUPS.CHDV.DISTRIBUTION.A, []),
				EVALUATORS.CHDV('Life Course Development', GROUPS.CHDV.DISTRIBUTION.B, [GROUPS.CHDV.DISTRIBUTION.A]),
				EVALUATORS.CHDV('Culture and Community', GROUPS.CHDV.DISTRIBUTION.C, [GROUPS.CHDV.DISTRIBUTION.A, GROUPS.CHDV.DISTRIBUTION.B]),
				EVALUATORS.CHDV('Mental Health and Personality', GROUPS.CHDV.DISTRIBUTION.D, [GROUPS.CHDV.DISTRIBUTION.A, GROUPS.CHDV.DISTRIBUTION.B, GROUPS.CHDV.DISTRIBUTION.C])
			]},
			{require:1, classes:GROUPS.CHDV.METHODS, max:1, hide:true},
			{require:3, classes:GROUPS.CHDV.DISTRIBUTION.A.concat(GROUPS.CHDV.DISTRIBUTION.B).concat(GROUPS.CHDV.DISTRIBUTION.C).concat(GROUPS.CHDV.DISTRIBUTION.D), max:3, hide:true},
			{require:3, classes:['CHDV ', 'CHDV ', 'CHDV ']}
		],
		link:{
			catalog:'comparativehumandevelopment/#summaryofrequirements'
		}
	},
	'Computational Neuroscience Minor':{
		classes:['BIOS 24231', 'BIOS 24232', 'BIOS 26210', 'BIOS 26211', 'BIOS 29408'],
		link:{
			catalog:'biologicalsciences/#minorprogramincomputationalneuroscience'
		}
	},
	'Computational and Applied Mathematics':{
		classes:[
			{require:1, classes:[
				angular.copy(SEQUENCES.PHYS2Q130),
				angular.copy(SEQUENCES.CHEM2Q120)
			]},
			{require:1,	classes:[
				'MATH 16300','MATH 19900'
			]},
			{require:1,	classes:[
				{require:3, classes:['MATH 20300', 'MATH 20400', 'MATH 20500']},
				{require:2, classes:['MATH 20700', 'MATH 20800', 'MATH 20900']}
			]},
			'STAT 24300',
			angular.copy(SEQUENCES.CMSC2Q120),
			'CMSC 27100','CMSC 27200',
			'MATH 27300',
			{require:1, classes:[
				'MATH 21100', 'MATH 21200'
			]},
			'STAT 24400', 'STAT 24500',
			{require:1, classes:[
				'STAT 25100','STAT 25300','MATH 23500'
			]},
			'STAT 28000',
			{require:3, notes:'Three approved electives'}
		],
		link:{
			catalog:'caam/#summaryofrequirements'
		}
	},
	'Computer Science':{
		classes:[
			{require:1, classes:[
				angular.copy(SEQUENCES.PHYS2Q120),
				angular.copy(SEQUENCES.CHEM2Q100)
			]},
			angular.copy(SEQUENCES.MATH2Q130),
			angular.copy(SEQUENCES.CMSC2Q150),
			'CMSC 15400',
			{require:2, max:2, classes:[
				'CMSC 22100','CMSC 22200','CMSC 22610','CMSC 23000','CMSC 23200','CMSC 23300',
				'CMSC 23400','CMSC 23500','CMSC 23700','CMSC 23710'],
			notes:'Programming Languages and Systems', hidden:true},
			{require:3, classes:['CMSC 27100','CMSC 27200',
				{require:1, classes:['CMSC 28000','CMSC 28100']}
			], notes:'Algorithms and Theory', hidden:true},
			{require:1, classes:[
				{require:2, classes:['CMSC 25010', 'CMSC 25020', 'CMSC 25025', 'CMSC 25050', 'CMSC 25400', 'CMSC 27600'], hidden:true, notes:'Artificial Intelligence', max:2},
				{require:2, classes:['CMSC 22010', 'CMSC 22100', 'CMSC 22200', 'CMSC 22300', 'CMSC 22610', 'CMSC 22620', 'CMSC 23000', 'CMSC 23010', 'CMSC 23300', 'CMSC 23310', 'CMSC 23400', 'CMSC 23500', 'CMSC 23700', 'CMSC 23710', 'CMSC 23800'], hidden:true, notes:'Advanced Systems', max:2},
				{require:2, classes:['CMSC 23710', 'CMSC 27610', 'CMSC 28510'], hidden:true, notes:'Scientific Computing', max:2}
			]},
			{require:4, classes:['CMSC 2','CMSC 2','CMSC 2','CMSC 2']}
		],
		link:{
			catalog:'computerscience/#programrequirements'
		}
	},
	'Computer Science:Bachelor of Science':{
		classes:[{require:3, notes:'Three courses in an approved program in a related field'}]
	},
	'Computer Science Minor':{
		classes:[
			{require:1, classes:['CMSC 12100', 'CMSC 15100', 'CMSC 16100']},
			{require:1, classes:['CMSC 12200', 'CMSC 15200', 'CMSC 16200']},
			'CMSC 15400', 'CMSC 2', 'CMSC 2', 'CMSC 2', 'CMSC 2'
		],
		link:{
			catalog:'computerscience/#minorprogramincomputerscience'
		}
	},
	'Economics':{
		classes:[
			// General Education
			angular.copy(SEQUENCES.MATH3Q130),
			// Major
			{require:4, classes:[
				{require:1, classes:['ECON 20000', 'ECON 20010']},
				{require:1, classes:['ECON 20100', 'ECON 20110']},
				{require:1, classes:['ECON 20200', 'ECON 20210']},
				{require:1, classes:['ECON 20300', 'ECON 20310']}
			], notes:'Econ 200 sequence'},
			{require:1, classes:['STAT 23400', 'STAT 24400']},
			{require:1, classes:['ECON 20900', 'ECON 21000']},
			{require:1, classes:[
				{require:2, classes:['MATH 19520', 'MATH 19620']},
				{require:2, classes:['MATH 20300', 'MATH 20400']},
				{require:2, classes:['MATH 20700', 'MATH 20800']}
			]},
			{require:3, classes:['ECON 2', 'ECON 2', 'ECON 2']},
			{require:1, classes:[
				'ECON 2',
				'CMSC 10600', 'CMSC 12100', 'CMSC 12200', 'CMSC 15100', 'CMSC 15200', 'CMSC 16100', 'CMSC 16200',
				'STAT 24500', 'STAT 25100', 'STAT 25300', 'STAT 26100',
				'MATH 20500', 'MATH 20900', 'MATH 27300'
			]}
		],
		link:{
			catalog:'economics/#programrequirements'
		}
	},
	'English and Creative Writing Minor':{
		classes:[
			'CRWR 2',
			'CRWR ',
			{require:4, classes:['ENGL ','ENGL ','ENGL ','ENGL ','CRWR ','CRWR ','CRWR ','CRWR ']},
		],
		notes:'Also requires a portfolio of student work.'
	},
	'English Language and Literature':{
		classes:[
			{require:1, classes:['ENGL 10400', 'ENGL 10600', 'ENGL 10706','ENGL 10800']},
			{require:10, classes:['ENGL ','ENGL ','ENGL ','ENGL ','ENGL ','ENGL ','ENGL ','ENGL ','ENGL ','ENGL ','CRWR ','CRWR ','CRWR ','CRWR ','CRWR ','CRWR ']}
		],
		notes:'Please also account for language and distribution requirements on the college catalog. Those are really annoying to suss out.'
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
		],
		link:{
			catalog:'environmentalscience/#programrequirementsforthebsinenvironmentalscience'
		}
	},
	'Environmental Studies':{
		classes:[
			'ENST 21201', 'ENST 21301',
			{require:1, classes:[
				'STAT 22000', 'STAT 23400', 'STAT 24400'
			]},
			{require:2, classes:GROUPS.ENST.ENV_ECON, max:2, notes:'Two Environmental Economics and Policy track classes', hidden:true},
			{require:2, classes:GROUPS.ENST.SOCI_NATURAL, max:2, notes:'Two Socio-natural Systems and Frameworks track classes', hidden:true},
			{require:2, classes:GROUPS.ENST.ENV_ECON.concat(GROUPS.ENST.SOCI_NATURAL), max:2, notes:'Two classes from either track', hidden:true},
			{require:3, classes:GROUPS.ENST.GENERAL, notes:'Three courses in environmental sciences from an approved list', hidden:true},
			'ENST 29801'
		],
		link:{
			catalog:'environmentalstudies/#summaryofprogram'
		}
	},
	'Environmental Studies Minor':{
		classes:[
			'ENST 21201', 'ENST 21301',
			{require:1, classes:[
				{require:4, classes:GROUPS.ENST.ENV_ECON, hidden:true, notes:'Environmental Economics and Policy'},
				{require:4, classes:GROUPS.ENST.SOCI_NATURAL, hidden:true, notes:'Socio-natural Systems and Frameworks'}
			], notes:'Four courses in one of the two thematic tracks'}
		],
		notes:'Classes must be chosen in consultation with the program director',
		link:{
			catalog:'environmentalstudies/#minorprograminenvironmentalstudies'
		}
	},
	'Gender and Sexuality Studies':{
		classes:[
			'GNSE 15002','GNSE 15003',
			'GNSE 10310',
			{require:10, notes:'Fulfilling either Path A or Path B',
			classes:[
				'GNSE ', 'GNSE ', 'GNSE ', 'GNSE ', 'GNSE ',
				'GNSE ', 'GNSE ', 'GNSE ', 'GNSE ', 'GNSE '
			]},
			'GNSE 29800','GNSE 29900'
		],
		link:{
			catalog:'genderstudies/#summaryofrequirements'
		}
	},
	'Gender and Sexuality Studies Minor':{
		classes:[
			'GNSE 10310', 'GNSE ', 'GNSE ', 'GNSE ', 'GNSE ', 'GNSE '
		],
		link:{
			catalog:'genderstudies/#minorprogramingenderandsexualitystudies'
		}
	},
	'Germanic Studies':{
		classes:[
			'GRMN 20100', 'GRMN 20200', 'GRMN 20300',
			{require:3, classes:['GRMN 21103', 'GRMN 21203', 'GRMN 21303', 'GRMN 21403']},
			{require:6, notes:'Three may be courses in other departments and/or Languages Across Chicago courses',
				classes:['GRMN ', 'GRMN ', 'GRMN ', 'GRMN ', 'GRMN ', 'GRMN ']},
			'GRMN 29900'
		],
		link:{
			catalog:'germanicstudies/#programrequirements'
		}
	},
	'Germanic Studies Minor':{
		classes:[
			'GRMN 20100', 'GRMN 20200', 'GRMN 20300',
			'GRMN ','GRMN ','GRMN ','GRMN ','GRMN ','GRMN '
		],
		link:{
			catalog:'germanicstudies/#minorprogramingermanicstudies'
		}
	},
	'Geographical Studies':{
		classes:[
			'GEOG 20000','GEOG 28200',
			'GEOG 29800',
			{require:8, classes:['GEOG ','GEOG ','GEOG ','GEOG ','GEOG ','GEOG ','GEOG ','GEOG '],
			notes:'Up to three may be in approved related fields.'}
		]
	},
	'Geophysical Sciences BA':{
		classes:[
			angular.copy(SEQUENCES.CHEM3Q110),
			angular.copy(SEQUENCES.MATH3Q130),
			'BIOS 20197',
			'BIOS 20198',
			angular.copy(SEQUENCES.PHYS3Q120),
			'GEOS 13100',
			'GEOS 13200',
			'GEOS 13300',
			{require:1, max:1, classes:GROUPS.GEOS.LISTF, hidden:true, notes:'One Mathematics or Statistics course'},
			{require:4, max:4, classes:GROUPS.GEOS.LISTA, hidden:true, notes:'Four courses from List A'},
			{require:2, classes:[
				'BIOS 2', 'BIOS 2',
				'CHEM 2', 'CHEM 2',
				'GEOS 2', 'GEOS 2',
				'PHYS 2', 'PHYS 2',
				'ASTR 2', 'ASTR 2',
				'MATH 2', 'MATH 2',
				'STAT 2', 'STAT 2',
				'ECON 2', 'ECON 2', 
				'ENST 2', 'ENST 2',
				'PBPL 2', 'PBPL 2',
				'PPHA 2', 'PPHA 2',
				'CMSC 2', 'CMSC 2'
			], hidden:true, notes:'Two additional science courses, up to two can be from List C and/or List F'}
		],
		link:{
			catalog:'geophysicalsciences/#programrequirementsforthebaingeophysicalsciences'
		},
		notes:'Check which science elective courses you are using, as there are restrictions related to the relevant course lists.'
	},
	'Geophysical Sciences BS':{
		classes:[
			angular.copy(SEQUENCES.CHEM3Q110),
			angular.copy(SEQUENCES.MATH3Q130),
			'BIOS 20197',
			'BIOS 20198',
			angular.copy(SEQUENCES.PHYS3Q120),
			'GEOS 13100',
			'GEOS 13200',
			'GEOS 13300',
			{require:2, max:2, classes:GROUPS.GEOS.LISTF, hidden:true, notes:'One Mathematics or Statistics course'},
			{require:3, max:3, classes:GROUPS.GEOS.LISTA, hidden:true, notes:'Three courses from List A'},
			{require:5, classes:[
				'BIOS 2', 'BIOS 2', 'BIOS 2', 'BIOS 2', 'BIOS 2',
				'CHEM 2', 'CHEM 2', 'CHEM 2', 'CHEM 2', 'CHEM 2',
				'GEOS 2', 'GEOS 2', 'GEOS 2', 'GEOS 2', 'GEOS 2',
				'PHYS 2', 'PHYS 2', 'PHYS 2', 'PHYS 2', 'PHYS 2',
				'ASTR 2', 'ASTR 2', 'ASTR 2', 'ASTR 2', 'ASTR 2',
				'MATH 2', 'MATH 2', 'MATH 2', 'MATH 2', 'MATH 2',
				'STAT 2', 'STAT 2', 'STAT 2', 'STAT 2', 'STAT 2',
				'ECON 2', 'ECON 2', 'ECON 2', 'ECON 2', 'ECON 2',
				'ENST 2', 'ENST 2', 'ENST 2', 'ENST 2', 'ENST 2',
				'PBPL 2', 'PBPL 2', 'PBPL 2', 'PBPL 2', 'PBPL 2',
				'PPHA 2', 'PPHA 2', 'PPHA 2', 'PPHA 2', 'PPHA 2',
				'CMSC 2', 'CMSC 2', 'CMSC 2', 'CMSC 2', 'CMSC 2'
			], hidden:true, notes:'Five additional science courses, up to three can be from List C and up to two can be from List F'}
		],
		link:{
			catalog:'geophysicalsciences/#programrequirementsforthebsingeophysicalsciences'
		},
		notes:'Check which science elective courses you are using, as there are restrictions related to the relevant course lists.'
	},
	'History':{
		classes:[
			'HIST 29801','HIST 29802',
			{require:10, noCore:true, classes:['HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ','HIST ']}
		],
		notes:'This is by far the major with the most sane dependencies.',
		link:{
			catalog:'history/#summaryofrequirements'
		}
	},
	'History Minor':{
		noCore:true,
		classes:[
			'HIST ', 'HIST ', 'HIST ', 'HIST ', 'HIST ', 'HIST '
		],
		link:{
			catalog:'history/#minorinhistory'
		}
	},
	'HIPS':{
		classes:[
			{require:1, classes:[
				{require:3, classes:[
					'HIPS 17300', 'HIPS 17400',
					{require:1, classes:['HIPS 17501', 'HIPS 17502']}
				]},
				{require:3, classes:[
					'HIPS 17400', 'HIPS 17402',
					{require:1, classes:['HIPS 17503', 'HIPS 17502']}
				]}
			]},
			{require:1, classes:[
				{require:2, classes:['BIOS 1', 'BIOS 1']},
				{require:2, classes:['BIOS 20186', 'BIOS 20187']},
				{require:2, classes:['BIOS 20196', 'BIOS 20197']},
				{require:2, classes:['BIOS 20234', 'BIOS 20235']}
			]},
			{require:1, classes:[angular.copy(SEQUENCES.CHEM2Q100), angular.copy(SEQUENCES.PHYS2Q120)]},
			angular.copy(SEQUENCES.MATH2Q130),
			{require:3, notes:'In science, social sciences, or mathematics beyond intro level'},
			{require:2, notes:'Tutorials', classes:['HIPS 29', 'HIPS 29']},
			{require:5, notes:'In an area of concentration',
				classes:['HIPS ','HIPS ','HIPS ','HIPS ','HIPS ']},
			'HIPS 29700','HIPS 29800','HIPS 29900','HIPS 29810'
		],
		notes:'History, Philosophy, and Social Studies of Science and Medicine',
		link:{
			catalog:'scienceandmedicinehips/#summaryofrequirements'
		}
	},
	'Human Rights Minor':{
		classes:[
			{require:2, classes:['HMRT 20100', 'HMRT 20200', 'HMRT 20300']},
			'HMRT ', 'HMRT ', 'HMRT '
		],
		link:{
			catalog:'humanrights/#minorprograminhumanrights'
		}	
	},
	'Jewish Studies':{
		classes:[
			'HEBR ', 'HEBR ', 'HEBR ',
			'JWSC 20001', 'JWSC 20002', 'JWSC 20003',
			'JWSC 20004', 'JWSC 20005', 'JWSC 20006',
			'JWSC ','JWSC ','JWSC '
		],
		link:{
			catalog:'jewishstudies/#summaryofrequirements'
		}
	},
	'Jewish Studies Minor':{
		classes:[
			{require:1, classes:[
				{require:3, classes:['HEBR ', 'HEBR ', 'HEBR ']},
				{require:3, classes:['YDDH ', 'YDDH ', 'YDDH ']}
			]},
			{require:1, classes:[
				{require:2, classes:['JWSC 20001', 'JWSC 20002', 'JWSC 20003']},
				{require:2, classes:['JWSC 20004', 'JWSC 20005', 'JWSC 20006']}
			]},
			'JWSC '
		],
		link:{
			catalog:'jewishstudies/#minorinjewishstudies'
		}
	},
	'Latin American Studies':{
		classes:[
			{require:1, classes:[
				{require:3, classes:['LACS 16100', 'LACS 16200', 'LACS 16300']},
				{require:3, classes:['SOSC 24302', 'SOSC 24402', 'SOSC 24502']}
			]},
			{require:1, classes:[
				{require:3, classes:['SPAN 20100', 'SPAN 20200', 'SPAN 20300']},
				{require:3, classes:['PORT 20100', 'PORT 20200', 'PORT 21500']}
			]},
			'LACS ', 'LACS ', 'LACS ', 'LACS ', 'LACS ',
			{require:2, notes:'In the social sciences, must be chosen in consultation with the student affairs administrator'},
			'LACS 29801'
		],
		link:{
			catalog:'latinamericanstudies/#summaryofrequirements'
		}
	},
	'Latin American Studies Minor':{
		classes:[
			{require:1, classes:['LACS 16300', 'SOSC 24502']},
			{require:1, classes:[
				{require:3, classes:['SPAN 20100', 'SPAN 20200', 'SPAN 20300']},
				{require:3, classes:['PORT 20100', 'PORT 20200', 'PORT 21500']}
			]},
			'LACS ', 'LACS ', 'LACS '
		],
		link:{
			catalog:'latinamericanstudies/#summaryofrequirementsminorprograminlatinamericanstudies'
		}
	},
	'Law, Letters, and Society':{
		classes:[
			'LLSO 24200',
			{require:2, classes:GROUPS.LLSO.LETTERS, hidden:true, notes:'Two Letters courses'},
			{require:2, classes:GROUPS.LLSO.SOCIETY, hidden:true, notes:'Two Society courses'},
			{require:6,
				classes:['LLSO ', 'LLSO ', 'LLSO ', 'LLSO ', 'LLSO ', 'LLSO '],
				notes:'Six Complementary courses'
			}
		],
		link:{
			catalog:'lawlettersandsociety/#programrequirements'
		}
	},
	'Linguistics':{
		classes:[
			'LING 20001','LING 20101','LING 20201','LING 20301',
			{require:1, classes:[
				{require:1, classes:(function() {
					const PIE = ['ARME', 'BANG', 'BCSN', 'CATA', 'GREK', 'LATN', 'MOGK', 'CZEC', 'FREN', 'GRMN', 'NORW', 'YDDH', 'HIND', 'ITAL', 'PERS', 'PALI', 'PORT', 'SPAN', 'POLI', 'RUSS', 'MARA', 'SANS', 'URDU', 'AANL' /* Hittite */];
					var out = [];
					for(var dept in LANGUAGES) {
						// ignore proto-indo-european languages
						if(PIE.indexOf(dept) > -1) { continue }
						out.push({
							require:3,
							classes:[dept + ' ', dept + ' ', dept + ' '],
							notes:LANGUAGES[dept],
							hidden:true
						});
					}
					return out;
				})(), notes:'Three quarters of a non-Indo-European language', hidden:true},
				{require:3, classes:['LING ', 'LING ', 'LING ']}
			]},
			{require:6, classes:['LING ','LING ','LING ','LING ','LING ','LING ']}
		]
	},
	'Linguistics Minor':{
		classes:[
			'LING 20001','LING 20101','LING 20201','LING 20301',
			'LING ', 'LING ', 'LING '
		],
		link:{
			catalog:'linguistics/#minorprograminlinguistics'
		}
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
			{require:4, notes:'At least two should be taken in a single department', classes:[
				'ASTR ', 'ASTR ', 'ASTR ', 'ASTR ',
				'CHEM ', 'CHEM ', 'CHEM ', 'CHEM ',
				'CMSC ', 'CMSC ', 'CMSC ', 'CMSC ',
				'GEOS ', 'GEOS ', 'GEOS ', 'GEOS ',
				'PHYS ', 'PHYS ', 'PHYS ', 'PHYS ',
				'STAT ', 'STAT ', 'STAT ', 'STAT ',
				'CPNS ', 'CPNS ', 'CPNS ', 'CPNS ']},
			{require:2, classes:GROUPS.MATH.LOAC, hidden:true, notes:'Two classes from the list of approved classes'},
			{require:3, classes:[
				{require:1, classes:['MATH 25400','MATH 25700']},
				{require:1, classes:['MATH 25500','MATH 25800']},
				{require:1, classes:['MATH 25600','MATH 25900'].concat(GROUPS.MATH.LOAC)}
			]}
		],
		link:{
			catalog:'mathematics/#programrequirements'
		}
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
			{require:4, notes:'At least two should be taken in a single department', classes:[
				'ASTR ', 'ASTR ', 'ASTR ', 'ASTR ',
				'CHEM ', 'CHEM ', 'CHEM ', 'CHEM ',
				'CMSC ', 'CMSC ', 'CMSC ', 'CMSC ',
				'GEOS ', 'GEOS ', 'GEOS ', 'GEOS ',
				'PHYS ', 'PHYS ', 'PHYS ', 'PHYS ',
				'STAT ', 'STAT ', 'STAT ', 'STAT ',
				'CPNS ', 'CPNS ', 'CPNS ', 'CPNS ']},
			{require:3, classes:[
				{require:1, classes:['MATH 25400','MATH 25700']},
				{require:1, classes:['MATH 25500','MATH 25800']},
				{require:1, classes:['MATH 25600','MATH 25900']}
			]},
			{require:1, classes:[
				{require:3, classes:['ASTR ', 'ASTR ', 'ASTR ']},
				{require:3, classes:['CHEM ', 'CHEM ', 'CHEM ']},
				{require:3, classes:['CMSC ', 'CMSC ', 'CMSC ']},
				{require:3, classes:['GEOS ', 'GEOS ', 'GEOS ']},
				{require:3, classes:['PHYS ', 'PHYS ', 'PHYS ']},
				{require:3, classes:['STAT ', 'STAT ', 'STAT ']},
				{require:3, classes:['CPNS ', 'CPNS ', 'CPNS ']}
			]},
			{require:2, classes:GROUPS.MATH.LOAC, hidden:true, notes:'Two classes from the list of approved classes'}
		]
	},
	'Mathematics Minor':{
		classes:[
			{require:1, classes:['MATH 16300', 'MATH 19900'], notes:'May count towards another major.'},
			{require:1, classes:[
				{require:3, classes:['MATH 20300', 'MATH 20400', 'MATH 20500']},
				{require:3, classes:['MATH 20700', 'MATH 20800', 'MATH 20900']}
			]},
			{require:1, classes:[
				{require:2, classes:['MATH 25400', 'MATH 25500']},
				{require:2, classes:['MATH 25700', 'MATH 25800']}
			]},
			'MATH 2'
		],
		link:{
			catalog:'mathematics/#minorprograminmathematics'
		}
	},
	'Applied Mathematics':{
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
				{require:1, classes:['MATH 25500','MATH 25800']}
			]},
			'MATH 27000','MATH 27300','MATH 27500'
		],
		link:{
			catalog:'mathematics/#programrequirements'
		}
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
			{require:4, classes:[
				{require:1, classes:['ECON 20000', 'ECON 20010']},
				{require:1, classes:['ECON 20100', 'ECON 20110']},
				{require:1, classes:['ECON 20200', 'ECON 20210']},
				{require:1, classes:['ECON 20300', 'ECON 20310']}
			]},
			{require:1, classes:['ECON 20900','ECON 21000']},
			'ECON 2','ECON 2'
		]
	},
	'Molecular Engineering Minor':{
		classes:['MENG 20000', 'MENG 29700', 'MENG ', 'MENG ', 'MENG '],
		link:{
			catalog:'molecularengineering/#minorprograminmolecularengineering'
		}
	},
	'Music':{
		noCore:true,
		classes:[
			'MUSI 15100', 'MUSI 15200', 'MUSI 15300',
			'MUSI 27100', 'MUSI 27200', 'MUSI 27300',
			'MUSI 23300', 'MUSI 28500',
			'MUSI 2', 'MUSI 2', 'MUSI 2', 'MUSI 2'
		],
		notes:'Students are required to register in one of the Music Department\'s major ensembles for at least three quarters with consent of the director of undergraduate studies.',
		link:{
			catalog:'linguistics/#minorprograminlinguistics'
		}
	},
	'Music Minor':{
		noCore:true,
		classes:[
			'MUSI 15100', 'MUSI 15200', 'MUSI 15300',
			'MUSI 2', 'MUSI 2', 'MUSI 2', 'MUSI 2'
		],
		notes:'Participation for at leas tthree quarters in one of the Music Department\'s major ensembles.',
		link:{
			catalog:'music/#minorprograminmusic'
		}
	},
	'Norwegian Studies Minor':{
		classes:[
			'NORW 10100', 'NORW 10200', 'NORW 10300',
			{require:3, classes:['NORW 2', 'NORW 2', 'NORW 2', 'NORW 10400', 'NORW 10500']}
		],
		link:{
			catalog:'germanicstudies/#minorprograminnorwegianstudies'
		}
	},
	'Philosophy':{
		classes:[
			{require:2, classes:['PHIL 25000','PHIL 26000','PHIL 27000']},
			'PHIL 20100',
			'PHIL ','PHIL ','PHIL ','PHIL ',
			{require:1, classes:[
				{require:3, classes:['PHIL ','PHIL ', 'PHIL '], notes:'One from field A and two from field B'},
				{require:3, classes:['PHIL ','PHIL ', 'PHIL '], notes:'Two from field A and one from field B'}
			]}
		],
		link:{
			catalog:'philosophy/#programrequirements'
		}
	},
	'Philosophy:Intensive Track':{
		classes:[
			'PHIL 29200', 'PHIL 29300', 'PHIL 29601', 'PHIL 29901', 'PHIL 29902',
			'PHIL ', 'PHIL '
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
			{require:1, classes:[
				'PHYS 21100',
				{require:3, classes:['PHYS 21101','PHYS 21102','PHYS 21103']}
			]},
			'PHYS 22500','PHYS 22700','PHYS 19700',
			{require:3, classes:[
				'PHYS 2','PHYS 2','PHYS 2',
				'MATH 20400', 'MATH 20800', 'MATH 20500','MATH 20900',
				'MATH 2700','MATH 27200','MATH 27300','MATH 27400','MATH 27500',
				'STAT 23400','STAT 24400','STAT 24500','ASTR 24100','ASTR 24200','CHEM 26300','CHEM 26800',
				'CMSC 28510','GEOS 21200','GEOS 23200','BIOS 29326'
			], notes:'Up to two may be outside the Physics department.'}
		]
	},
	'Physics:Astrophysics Specialization':{
		classes:[
			'ASTR 24100', 'ASTR 24200',
			{require:1, classes:[
				{require:1, classes:['ASTR 28200','ASTR 30500']},
				{require:3, classes:['PHYS 29100','PHYS 29200','PHYS 29300']}
			]}
		]
	},
	'Physics Minor':{
		classes:[
			{require:1, classes:['PHYS 13300', 'PHYS 14300']},
			{require:1, classes:['MATH 15300', 'MATH 16300', 'MATH 22000']},
			'PHYS 15400', 'PHYS 18500', 'PHYS 22100', 'PHYS 23400',
			{require:1, classes:['PHYS 19700', 'PHYS 22500', 'PHYS 23500']},
			'PHYS '
		]
	},
	'Political Science':{
		classes:[{require:3, classes:['PLSC 28701', 'PLSC 28801', 'PLSC 28901', 'PLSC 29000']},
			'PLSC 22913',
			'PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC ','PLSC '],
		notes:'Students must take at least one course in three of the four subfields.',
		link: {
			catalog:'politicalscience/#programrequirements'
		}
	},
	'Political Science:BA Thesis':{
		classes:['PLSC 29800', 'PLSC 29900'],
		link:{
			catalog:'politicalscience/#summaryofrequirementsthebathesispath'
		}
	},
	'Psychology':{
		classes:[
			{require:1, classes:['PSYC 20100','STAT 22000']},
			'PSYC 20200',
			{require:4, classes:['PSYC 20300','PSYC 20400','PSYC 20500','PSYC 20600','PSYC 20700']},
			'PSYC ', 'PSYC ','PSYC ','PSYC ','PSYC ','PSYC '
		],
		notes:'Courses without a psychology number must be approved by the Curriculum Committee; petitions must be submitted to the undergraduate program chair.',
		link:{
			catalog:'psychology/#summaryofrequirements'
		}
	},
	'Public Policy':{
		classes:[
			angular.copy(SEQUENCES.MATH2Q130),
			'PBPL 26400',
			'PBPL 22100','PBPL 22200','PBPL 22300',
			{require:1, classes:['ECON 20000','PBPL 20000']},
			{require:1, classes:['STAT 22000','STAT 23400','STAT 24400']},
			{require:3, classes:[
				'ANTH ', 'ANTH ', 'ANTH ',
				'ECON ', 'ECON ', 'ECON ',
				'HIST ', 'HIST ', 'HIST ',
				'LLSO ', 'LLSO ', 'LLSO '
			], notes:'Three courses in an area of specialization.'},
			{require:1, classes:GROUPS.PBPL.METHODS, hidden:true, notes:'One Methods class'},
			{require:1, classes:GROUPS.PBPL.WINDOWS, hidden:true, notes:'One Windows class'},
			'PBPL 29800'
		],
		link:{
			catalog:'publicpolicystudies/#summaryofrequirements'
		}
	},
	'Romance Languages and Literatures':{
		classes:[
			{require:1, classes:[
				{require:3, classes:[
					'FREN 20500', 'FREN 21503', {require:8, classes:[
						'FREN ', 'FREN ', 'FREN ', 'FREN ',
						'FREN ', 'FREN ', 'FREN ', 'FREN '
					], noCore:true, notes:'Eight courses in literature and culture'}
				], notes:'French', hidden:true},
				{require:2, classes:[
					'ITAL 20400', {require:9, classes:[
						'ITAL ', 'ITAL ', 'ITAL ', 'ITAL ',
						'ITAL ', 'ITAL ', 'ITAL ', 'ITAL ', 'ITAL '
					], noCore:true, notes:'Nine courses in literature and culture'}
				], notes:'Italian', hidden:true},
				{require:4, classes:[
					{require:1, classes:['SPAN 20400', 'SPAN 20402', 'SPAN 20500', 'SPAN 20602']},
					'SPAN 21500',
					{require:3, classes:['SPAN 21703', 'SPAN 21803', 'SPAN 21903', 'SPAN 22003']},
					{require:5, classes:['SPAN ', 'SPAN ', 'SPAN ', 'SPAN ', 'SPAN '],
						noCore:true, notes:'Five courses in literature and culture'}
				], notes:'Spanish', hidden:true}
			]}
		],
		link:{
			catalog:'romancelanguagesliteratures/#programrequirements'
		}
	},
	'Romance Languages and Literatures Minor':{
		classes:[
			{require:1, classes:[
				{require:2, classes:[
					'FREN 20500',
					{require:5, classes:['FREN ', 'FREN ', 'FREN ', 'FREN ', 'FREN '], noCore:true,
					notes:'Five literature and culture courses taught in French or including an assessed component in French (including at least one introductory course, and at least one including pre-nineteenth-century material)'}
				], notes:'French', hidden:true},
				{require:2, classes:[
					'ITAL 20400',
					{require:5, classes:['ITAL ', 'ITAL ', 'ITAL ', 'ITAL ', 'ITAL '], noCore:true,
					notes:'Five literature and culture courses taught in Italian or including an assessed component in Italian'}
				], notes:'Italian', hidden:true},
				{require:3, classes:[
					'PORT 21500',
					{require:2, classes:['PORT 21703', 'PORT 21803', 'PORT 20700', 'PORT 27100'], max:2},
					{require:3, classes:['PORT ', 'PORT ', 'PORT '], noCore:true,
					notes:'Two or three literature and culture courses taught in Portuguese (or including an assessed component in Portuguese) and/or history discussion sessions held in Portuguese (or including an assessed component in Portuguese)'}
				], notes:'Portuguese', hidden:true},
				{require:3, classes:[
					{require:1, classes:['SPAN 20400', 'SPAN 20402', 'SPAN 20500', 'SPAN 20602']},
					{require:2, classes:['SPAN 21703', 'SPAN 21803', 'SPAN 21903', 'SPAN 22003'], max:2},
					{require:3, classes:['SPAN ', 'SPAN ', 'SPAN '], noCore:true,
					notes:'Two or three literature and culture courses taught in Spanish'}
				], notes:'Spanish', hidden:true}
			]}
		],
		link:{
			catalog:'romancelanguagesliteratures/#minorprograminromancelanguagesandliteratures'
		}
	},
	'Sociology':{
		classes:[
			'SOCI 20002',
			'SOCI 20005',
			{require:1, classes:['SOCI 20001', 'SOCI 20111', 'SOCI 20140']},
			'SOCI 20004',
			'SOCI ','SOCI ','SOCI ','SOCI ',
			{require:3, classes:['SOCI ','SOCI ','SOCI '],notes:'Three approved courses in sociology or related fields (one may be a reading and research course)'},
			'SOCI 29998'
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
			{require:3, classes:['STAT ','STAT ','STAT '], noCore:true}
		]
	},
	'Statistics BS':{
		classes:[
			angular.copy(SEQUENCES.MATH3Q130),
			{require:1,classes:['MATH 20100','MATH 27300']},
			{require:1,classes:['STAT 24300','MATH 25500','MATH 25800']},
			'STAT 24400', 'STAT 24500','STAT 25100',
			{require:1,classes:['STAT 22400','STAT 34300']},
			{require:1,classes:[
				{require:2,classes:['CMSC 12100','CMSC 12200']},
				{require:2,classes:['CMSC 15100','CMSC 15200']},
				{require:2,classes:['CMSC 16100','CMSC 16200']}
			]},
			{require:3, noCore:true, classes:['STAT ', 'STAT ', 'STAT ']}
		],
		notes:'Also requires a coherent two-quarter sequence at the 20000 level in a field to which statistics can be applied.'
	},
	'Statistics Minor':{
		classes:[
			{require:1, classes:['STAT 22000', 'STAT 23400', 'STAT 24500']},
			'STAT 22400',
			{require:1, classes:['STAT 22200', 'STAT 22600', 'STAT 22700']},
			{require:2, classes:['STAT 2', 'STAT 2']}
		],
		link:{
			catalog:'statistics/#minorprograminstatistics'
		}
	},
	'Visual Arts':{
		noCore:true,
		classes:[
			{require:1, classes:['ARTV 10100','ARTV 10200','ARTV 10300']},
			'ARTV 15000','ARTV 29600','ARTV 29850',
			'ARTV 2','ARTV 2','ARTV 2','ARTV 2','ARTV 2','ARTV'
		],
		notes:'Also requires three electives relevant to the major.'
	}
};
