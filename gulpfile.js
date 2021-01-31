const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const ejs = require('gulp-ejs');

function style() {
    return gulp.src('./public/source/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.stream())
}

function ejsTemplates() {
    return gulp.src('./views/**/*.ejs')//SHOULD GRAB ALL EJS PAGES 
        .pipe(ejs({}, {}, { ext: '.html' })) //ADD EXTENSION OF .HTML
        .pipe(gulp.dest('./views/')) //AND EXPORT THEM TO THE DIST FOLDER
}

function watch() {
    browserSync.init({
        proxy: 'http://localhost:3030',
        port: 3030,
        ui: false,
        ignore: 'node_modules',
        injectChanges: false,
        browser: 'google chrome'
    });
    gulp.watch('./public/source/scss/**/*.scss', style);
    gulp.watch('./views/**/*.html').on('change', browserSync.reload);
    gulp.watch('./views/**/*.ejs').on('change', browserSync.reload);
    gulp.watch('./public/js/**/*.js').on('change', browserSync.reload);
}


exports.style = style;
exports.ejsTemplates = ejsTemplates;
exports.watch = watch;