var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2'); 

var tsProject = ts.createProject('public/tsconfig.json');

gulp.task('default', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return merge([
		tsResult.dts.pipe(gulp.dest('public/app')),
		tsResult.js.pipe(gulp.dest('public/app'))
	]);
});