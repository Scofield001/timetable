const gulp = require( 'gulp' ),
    autoprefixer = require ('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    concat = require( 'gulp-concat' ),
    cssMin = require('gulp-csso'),
    htmlMin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    sass = require( 'gulp-sass' ),
    tinify = require('gulp-tinify'),
    uglify = require('gulp-uglify'),

    KEY_FOR_TINIFY = '',

    paths = {
        sass: [
            'lib/**/*.css',
            'lib/**/*.scss',
            'blocks/**/*.scss',
        ],
        js: [
            'js/render.js',
            'js/filter.js',
            'js/buttons.js',
            '!js/build.min.js',
        ],
    };

gulp.task('babel', function () {
    gulp.src( paths.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe( concat( 'build.min.js' ))
        .pipe(gulp.dest('dist/js/'))
        .pipe(gulp.dest('js/'));
    gulp.src('js/getJSON.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
    gulp.src( paths.sass )
        .pipe( concat( 'style.scss' ))
        .pipe( sass())
        .pipe(autoprefixer({
            browsers: ['last 4 version'],
            cascade: false
        }))
        .pipe(gulp.dest( 'style/' ))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/style/'))
        .pipe(gulp.dest('style/'));

});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(htmlMin({removeComments: true, collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});
gulp.task('tinify', function() {
    gulp.src('img/**/*')
        .pipe(tinify(KEY_FOR_TINIFY))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('build', function () {
    gulp.src('lib/*.js')
        .pipe(gulp.dest('dist/lib'));
    gulp.src('responses/*.json')
        .pipe(gulp.dest('dist/responses'))
});

gulp.task('default', gulp.series(gulp.parallel('html', 'sass', 'babel')));