var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2'); 
var sass = require('gulp-sass');

var tsProject = ts.createProject('public/tsconfig.json');

gulp.task('default', function () {        

    gulp.src('./public/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
        
    gulp.src('./public/@angular2-material/button/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
    
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return merge([
		tsResult.dts.pipe(gulp.dest('public/app')),
		tsResult.js.pipe(gulp.dest('public/app'))
	]);
});
