
exports.string_of_enum = function(value) {
	const env = {
		LOCAL:'LOCAL',
		DEV:'DEV',
		HOMOLOG:'HOMOLOG'
	}
	for (var k in env){ 
		if (env[k]==value){
		 	return k;
		}
	}
	throw new Error('Enviroment '+value+' is not defined ');		
}

exports.getProperties = function() {
	var PropertiesReader = require('properties-reader');
	return PropertiesReader('./config/config.properties');	
}

exports.cleanCassandra = function(resolve, reject) {

	console.log(properties.get(enum_env+'.url'));
	var querys = [];
	properties.each((key, value) => {
		var name = key.substring(0, key.indexOf("."));
		if(name == 'query'){
			var obj1 = { query: value};
			querys.push(obj1);
		}
	})
	console.log(querys);

	/*var cassandra = require('cassandra-driver');
	var client = new cassandra.Client({contactPoints:[properties.get(enum_env+'.url')],localDataCenter:'datacenter1',keysapce:''});

	var query = properties.get('query.query1');
	client.execute(query,function(err,result){
		resolve("Limpeza de dados realizada com sucesso");

	});*/

	resolve("Limpeza de dados realizada com sucesso");
}

exports.executeNewman = function(resolve, reject) {

	/*
	var newman=require('newman');

	newman.run({
		collection:require('./collection/API-ADM.postman_collection.json'),
		environment:require('./collection/'+enum_env+'.postman_enviroment.json'),
		reporters: ['html','cli','htmlextra'],
		reporter:{
			html:{export :'./report/htmlReport.html'},
			htmlextra:{export:'.report/htmlReportExtra.html'}
		},
		insecure:true,
		timeout:180000
	}).on('start',function(err,args){
		console.log('running a collection...');
	}).on('done',function(err,summary){
		if(err,summary.error){
			console.erro('collection run encountered and error.');

		}else {
			console.log('collection run completed.');
			resolve('relatorio gerado');
		}
	});*/
				resolve('relatorio gerado');
}

