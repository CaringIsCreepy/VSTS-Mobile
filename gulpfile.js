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

gulp.task('prod', function () {
    var tsResult = tsProject.src(['**/*.ts', '!**/node_modules/**'])
                            .pipe(ts(tsProject));

    var nodeApp = gulp.src(['**/*.js', '**/*.jade', '**/*.html', '**/*.json', 'web.config', '!**/node_modules/**']);

    return merge([
        tsResult.js,
        nodeApp
	]).pipe(zip("deploy.zip"))
      .pipe(gulp.dest('./'));
});