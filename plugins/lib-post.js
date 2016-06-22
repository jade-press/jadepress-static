

'use strict'

const path = require('path')
,mkdir = require('mkdir-p')
,request = require('request')
,pluginStaticPath = require('./index').pluginStaticPath
,fs = require('fs')
,lib = require('./lib')
,writeFile = lib.writeFile
,qr = lib.qr
,createStaticActtion = lib.createStatic
,cwd = lib.cwd

module.exports = function(ext) {
	///start

	const getPosts = ext.getPosts
	,afterChangeActions = ext.afterChangeActions
	,createUrl = ext.tools.createUrl
	,route = ext.setting.publicRoute.post
	,basePath = ext.setting.pluginStaticPath || path.resolve(cwd, '_static')
	


	function* createStatic(action) {

		let opt = {
			_id: action._id
		}

		let post = yield getPosts(opt)
		let url = createUrl(post, action.local.host, route)

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
