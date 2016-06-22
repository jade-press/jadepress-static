
'use strict'
const mkdir = require('mkdir-p')
,path = require('path')
,fs = require('fs')
,lib = require('./lib')
,cwd = lib.cwd

module.exports = function(ext) {

	let middlewares = ext.middlewares
	,oneYear = 1000 * 60 * 60 * 24 * 365
	,serve = require('koa-static')
	,setting = ext.setting
	,path = require('path')
	,pluginStaticPath = setting.pluginStaticPath || path.resolve(cwd, '_static')

	,filesServ

	console.log(pluginStaticPath)
	//mkdir
	try {

		let staticRes = fs.accessSync(pluginStaticPath)

	} catch(e) {

		console.warn(pluginStaticPath, 'not exist')
		mkdir.sync(pluginStaticPath)

	}

	filesServ = serve( pluginStaticPath, {
		maxAge: oneYear
	})

	middlewares.splice(6, 0, filesServ)

	let extend = {
		middlewares: middlewares
	}

	return extend

////end
}
