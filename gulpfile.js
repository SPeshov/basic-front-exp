
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');

var CSS_LIB = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
];


var CSS_APP = [
    'css/main.css'
];


var JS_LIB = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
];



var JS_APP = [
    'js/**/*.js'
];

/**
*   The location of the resources for deploy
*/
var DESTINATION = 'dest/';
/**
* The single page initial html file. It will be altered
* by this script.
*/
var INDEX_FILE = 'index.html';
/**
* The name of the angular module
*/


/**
* Task for concatenation of the js libraries used
* in this project
*/
gulp.task('concat_js_lib', function () {
    return gulp.src(JS_LIB) // which js files
        .pipe(concat('lib.js')) // concatenate them in lib.js
        .pipe(gulp.dest(DESTINATION)) // save lib.js in the DESTINATION folder
});

/**
* Task for concatenation of the css libraries used
* in this project
*/
gulp.task('concat_css_lib', function () {
    return gulp.src(CSS_LIB) // which css files
        .pipe(concat('lib.css')) // concat them in lib.css
        .pipe(gulp.dest(DESTINATION)) // save lib.css in the DESTINATION folder
});


/**
* Task for concatenation of the js code defined
* in this project
*/
gulp.task('concat_js_app', function () {
    return gulp.src(JS_APP)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('src.js'))
    .pipe(gulp.dest(DESTINATION)).pipe(browserSync.stream());
});

/**
* Task for concatenation of the css code defined
* in this project
*/
gulp.task('concat_css_app', function () {
    return gulp.src(CSS_APP)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(DESTINATION)).pipe(browserSync.stream());
});



gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
});

var tasks = [
    'concat_js_lib',
    'concat_css_lib',
    'concat_js_app',
    'concat_css_app',
    'serve'
];

gulp.task('default', tasks, function () {
    gulp.watch('css/*.css', ['concat_css_app']);
    gulp.watch('js/*.js', ['concat_js_app']);
    gulp.watch('./index.html').on('change', browserSync.reload);
});
