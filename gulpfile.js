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

    return tsResult.js.pipe(gulp.dest('./public'))
                      .pipe(zip("deploy.zip"))
                      .pipe(gulp.dest("./"));
});