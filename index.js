const util = require('./util/util');
const param_env = process.argv[2];

global.enum_env = util.string_of_enum(param_env);
global.properties = util.getProperties();

console.log('Execute Regression Test '+ enum_env);

var promiseStep1 = new Promise(function(resolve,reject){
	util.cleanCassandra(resolve,reject);
});

var promiseStep2 = new Promise(function(resolve,reject){
	util.executeNewman(resolve,reject);
})

promiseStep1.then(value => promiseStep2)
			.then(value => {
				console.log(value);	
});