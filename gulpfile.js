const gulp = require('gulp');
const clean_css = require('gulp-clean-css');
const auto_prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const order = require('gulp-order');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const { series, parallel } = require('gulp');
const {src, dest} = require('gulp');

const files_js_order = [
    'src/js/modules/SPA.js',
    'features/**/*.js'
];

const files_js_libs_order = [
    'src/libs/fullcalendar/core/main.js',
    'src/libs/**/*.js'
];

gulp.task('build', function(done){
  console.log('Running build task')
  done()
})

gulp.task('default', function(done){
  console.log('Running default task')
  done()
})

const html = function () {
  return src('./src/**/*.html')
    .pipe(dest('dist'))
}

const js = function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(order(files_js_order, { base: './' }))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({ compress: true }))
    .pipe(gulp.dest('dist/js'));
}

const vendor = function() {
  return src('./src/libs/**/*.js')
    .pipe(order(files_js_libs_order, { base: './' }))
    .pipe(babel({
        presets: ["@babel/preset-env"]
    }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
}

const css = function () {
  return src('./src/css/**/*.css')
    .pipe(clean_css({compatibility: 'ie9'}))
    .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/css/**/*.css", series(css))
  gulp.watch("./src/**/*.html", series(html))
  gulp.watch("./src/js/**/*.js", series(js))
  gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
  gulp.watch("./dist/css/**/*.css").on('change', browserSync.reload);
  gulp.watch("./dist/js/**/*.js").on('change', browserSync.reload);
});

exports.build = parallel(js, html, css, vendor);
