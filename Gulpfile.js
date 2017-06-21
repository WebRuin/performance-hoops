var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var purify = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');

gulp.task('css-clean', function() {
  return gulp.src('./assets/css/main.css')
    .pipe(purify(['./assets/js/**/*.js', './**/*.html']))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass', function() {
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'))
});

gulp.task('minify-css', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('minify-js', function (cb) {
  pump([
        gulp.src('./assets/js/**/*.js'),
        uglify(),
        gulp.dest('./assets/js/')
    ],
    cb
  );
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./assets/sass/**/*.scss',['styles']);
});

gulp.task('prod', ['css-clean', 'sass', 'minify-css', 'minify-js']);