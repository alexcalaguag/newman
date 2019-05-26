global.__basedir = __dirname;

const util = require(__basedir + '/util/util');
const param_env = process.argv[2];
global.properties = util.getProperties();
global.env_selected = util.string_of_enum(param_env);


console.log('Execution of the regressive test '+properties.get('CONFIG.collection-name')+' in the '+ env_selected +' environment');

var promiseStep1 = new Promise(function(resolve,reject){
	util.cleanCassandra(resolve,reject);
});

var promiseStep2 = new Promise(function(resolve,reject){
	console.log("Successful data cleansing");
	util.executeNewman(resolve,reject);
})

promiseStep1.then(value => promiseStep2)
						.then(value => {console.log(value);});
