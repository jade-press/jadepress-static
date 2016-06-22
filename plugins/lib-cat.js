

'use strict'

const path = require('path')
,mkdir = require('mkdir-p')
,request = require('request')
,fs = require('fs')
,lib = require('./lib')
,writeFile = lib.writeFile
,qr = lib.qr
,createStaticActtion = lib.createStatic
,cwd = lib.cwd

module.exports = function(ext) {
	///start

	const getCats = ext.getCats
	,afterChangeActions = ext.afterChangeActions
	,createUrl = ext.tools.createUrl
	,route = ext.setting.publicRoute.cat
	,path = require('path')
	,basePath = ext.setting.pluginStaticPath || path.resolve(cwd, '_static')


	function* createStatic(action) {

		let opt = {
			_id: action._id
		}
		console.log(action)
		let cat = yield getCats(opt)
		console.log(cat)
		let url = createUrl(cat, action.local.host, route)
		console.log(url)
		var res = yield createStaticActtion(action, url, basePath)

		return Promise.resolve(res)
		
	}

	afterChangeActions.push(createStatic)

	let extend = {
		afterChangeActions: afterChangeActions
	}

	return extend

	////end
}
