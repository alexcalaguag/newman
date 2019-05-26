
exports.string_of_enum = function(value) {
	const envs = {
		LOCAL:'LOCAL',
		DEV:'DEV',
		HOMOLOG:'HOMOLOG'
	}
	for (var env in envs){
		if (envs[env] == value){
		 	return env;
		}
	}
	throw new Error('Environment '+ value +' is not defined ');
}

exports.getProperties = function() {
	var PropertiesReader = require('properties-reader');
	return PropertiesReader(__basedir +'/config/config.properties');
}

exports.cleanCassandra = function(resolve, reject) {
	console.log(properties.get(env_selected+'.url'));
	var querys = [];
	properties.each((key, value) => {
		var name = key.substring(0, key.indexOf("."));
		if(name == 'query'){
			var row = { query: value};
			querys.push(row);
		}
	});
	var cassandra = require('cassandra-driver');
	var client = new cassandra.Client({contactPoints:[properties.get(env_selected+'.url')],
																		 localDataCenter:'datacenter1',
																		 keysapce:properties.get(env_selected+'.keyspace')});

	client.batch(querys, { prepare: true },function(err,result){
		client.shutdown();
		resolve("Shutdown Cassandra");
	});
}

exports.executeNewman = function(resolve, reject) {
	var newman = require('newman');
	newman.run({
		collection: require(__basedir +'/'+ properties.get('FOLDER.collection') +'/'+ properties.get('CONFIG.collection-name') +'.postman_collection.json'),
		environment: require(__basedir +'/'+ properties.get('FOLDER.collection') +'/'+env_selected+'.postman_environment.json'),
		reporters: ['html','cli','htmlextra'],
		reporter: {
			html: { export : __basedir +'/'+ properties.get('FOLDER.report') +'/'+ properties.get('CONFIG.collection-name') +'HtmlReport.html'},
			htmlextra: {
				export: __basedir +'/'+ properties.get('FOLDER.report') +'/'+ properties.get('CONFIG.collection-name') +'HtmlReportExtra.html'
			}
		},
		insecure:true,
		timeout:180000
	}).on('start',function(err,args){
		console.log('Running collection '+ properties.get('CONFIG.collection-name') +'.postman_collection.json');
	}).on('done',function(err,summary){
		if(err || summary.error){
			console.erro('Collection run encountered and error.');
		}else {
			console.log('Collection '+properties.get('CONFIG.collection-name')+'.postman_collection.json successfully executed.');
			resolve('Report '+ properties.get('CONFIG.collection-name') +'HtmlReportExtra.html generated successfully in the folder '+ properties.get('FOLDER.report'));
		}
	});
}
