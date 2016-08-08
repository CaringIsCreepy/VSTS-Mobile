var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2'); 
var sass = require('gulp-sass');
var zip = require("gulp-zip");

var tsProject = ts.createProject('tsconfig.json');

gulp.task('dev', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return merge([
        tsResult.js.pipe(gulp.dest('./public'))
	]);
});

gulp.task('prod', ['dev'], function () {
    var nodeApp = gulp.src(['**/*.js', '**/*.jade', '**/*.html', '**/*.json', 'web.config', '!**/spec/**']);

    return nodeApp.pipe(zip("deploy.zip")).pipe(gulp.dest('./'));
});