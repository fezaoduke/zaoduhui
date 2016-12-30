'use strict';

//批量替换static.json 文件内的目录 dist 为 static 

var path = require('path')
var fs = require('fs')

var staticJson = {}
fs.readFile('static.json',function(err,data){
	if(err){
		return console.error(err);
	}
	var jsondata = JSON.parse(data);
	var cssdata = jsondata.cssPaths;
	var jsdata = jsondata.jsPaths;
	staticJson.baseUrl = jsondata.baseUrl;
	staticJson.seaUrl = jsondata.seaUrl;
	staticJson.cssPaths={};
	staticJson.jsPaths={};

	var str_v = '';
	for(var v in cssdata){
		str_v = v.replace('dist','static');
		staticJson.cssPaths[v]= str_v; 
	}

	var str_v2 = '';
	for(var v2 in jsdata){
		str_v2 = v2.replace('dist','static');
		staticJson.jsPaths[v2]= str_v2; 
	}

	fs.writeFile('static.json',JSON.stringify(staticJson).replace(/\,/g , ",\n"),function(){
		console.log("dist ======>> static, done!");
	});
})




