var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('styles', function() {
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'))
});

gulp.task('js-min', function (cb) {
  pump([
        gulp.src('./assets/js/**/*.js'),
        uglify(),
        gulp.dest('./assets/js/')
    ],
    cb
  );
});

gulp.task('minify-css', function() {
  return gulp.src('./assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/css/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('./assets/sass/**/*.scss',['styles']);
});