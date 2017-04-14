/*--  Variables  --*/
var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var batch = require('gulp-batch');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

/*-- Stream Task  --*/
gulp.task('stream', function () {
    gulp.src(['assets/theme/path/theme.scss'])
            .pipe(sass({errLogToConsole: true}))
            .pipe(concat('theme.css'))
            .pipe(gulp.dest('./assets/css'))
            .pipe(minifyCSS({processImport: false}))
            .pipe(concat('theme.min.css'))
            .pipe(gulp.dest('./assets/css'));
});

/*--  Watch Task  --*/
gulp.task('watch', function () {
    watch('assets/theme/**/*.scss', function () {
        gulp.start('stream');
    });
});

/*-- Default Function  --*/
gulp.task('default', function () {
    /*--  place code for your default task here  --*/
    gulp.task('default', ['stream']);
});
