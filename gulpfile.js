
'use strict'

let
gulp = require('gulp')
,watch = require('gulp-watch')
,plumber = require('gulp-plumber')
,newer = require('gulp-newer')
,_ = require('lodash')
,path = require('path')
,fs = require('fs')
,mkdir = require('mkdirp')
,runSequence = require('run-sequence')

var exec = require('child_process').exec
var src = __dirname + '/plugins'
var tar = __dirname + '/node_modules/jadepress-static/'

gulp.task('rm', function() {

	exec('cp -r ' + src + ' ' + tar, function(err) {
		console.log('done')
	})

})

gulp.task('watch',  function () {

	watch(src + '/*.js', function() {
		runSequence('rm')
	})

})

gulp.task('default', ['watch'])
gulp.task('dist', function() {
	runSequence('stylus', 'ugly')
})