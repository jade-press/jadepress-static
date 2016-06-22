

'use strict'

const path = require('path')
,mkdirLib = require('mkdirp')
,request = require('request')
,fs = require('fs')
,rmrfLib = require('rimraf')

exports.cwd = process.cwd()

exports.mkdir = (file, data) => {

	return new Promise((resolve, reject) => {
		mkdirLib(file, (err) => {
			if(err) reject(err)
			else resolve()
		})
	})

}


exports.rmrf = (file, data) => {

	return new Promise((resolve, reject) => {
		rmrfLib(file, (err) => {
			if(err) reject(err)
			else resolve()
		})
	})

}

exports.writeFile = (file, data) => {

	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if(err) reject(err)
			else resolve()
		})
	})

}

exports.qr = function(args) {
	return new Promise(function(resolve, reject) {
		request(args, function(err, response, body) {
			if(err) reject(err)
			else resolve({
				response: response
				,body: body
			})
		})
	})
}

exports.createStatic = function* (action, url, basePath) {

	let html = yield exports.qr({
		url: url
		,method: 'get'
	})

	html = html.body.toString()


	let dirpath = path.resolve( basePath, url.replace(action.local.host + '/', '') )
	let fpath = path.resolve( basePath, url.replace(action.local.host + '/', ''), 'index.html' )

	console.log(dirpath)
	console.log(fpath)
	//mkdir
	try {

		let staticRes = fs.accessSync(fpath)

	} catch(e) {
		
		yield exports.mkdir(dirpath)

	}

	if(action.type !== 'del') yield exports.writeFile(fpath, html)
	else yield exports.rmrf(dirpath)

	return Promise.resolve()
	
}
