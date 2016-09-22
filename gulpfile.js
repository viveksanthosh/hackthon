"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var babelify = require('babelify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/scripts/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.css',
            'src/css/*.css'
        ],
        dist: './dist',
        dep: './dep',
        images: './src/images/*.*',
        mainJs: './src/scripts/main.js',
        fonts:'node_modules/bootstrap/dist/fonts/*.*'
    }
};

//Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});


gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('fonts', function () {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});


gulp.task('build', function () {
    gulp.src(config.paths.dist + '/*.html')
        .pipe(gulp.dest(config.paths.dep));

    gulp.src(config.paths.dist + '/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(config.paths.dep + '/css'));

    gulp.src(config.paths.dist + '/images/*.*')
        .pipe(gulp.dest(config.paths.dep + '/images'));

    gulp.src(config.paths.dist + '/scripts/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dep + '/scripts'));

});

gulp.task('default', ['html', 'fonts', 'js', 'css', 'images', 'lint', 'open', 'watch']);

