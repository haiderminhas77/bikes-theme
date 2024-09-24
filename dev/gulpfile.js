`use strict`;

const gulp = require(`gulp`);
const babel = require(`gulp-babel`);
const autoprefixer = require(`gulp-autoprefixer`);
const changed = require(`gulp-changed`);
const cleanCss = require(`gulp-clean-css`);
const concat = require(`gulp-concat`);
const rename = require(`gulp-rename`);
const replace = require(`gulp-replace`);
const uglify = require(`gulp-uglify`);
const cssLint = require(`gulp-csslint`);
const jsLint = require(`gulp-eslint`);
var gutil = require('gulp-util');

/**
 * Asset paths.
**/
const srcJS = `scripts/**/*.js`;
const assetsDir = `../assets/`;
const srcCSS = `styles/**/*.css`;

/**
 * css lint
**/
gulp.task(`css-lint`, () => {
    return gulp.src(srcCSS)
        .pipe(cssLint());
});

/**
 * css build task - compression task for use in build task only
**/
gulp.task(`css-build`, gulp.series(`css-lint`, () => {
    return gulp.src(`styles/*.css`)
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCss())
        .pipe(gulp.dest(assetsDir));
}));

/**
 * css default task for dev (no compression)
**/
gulp.task('css-default', () => {
    return gulp.src(`styles/*.css`).pipe(gulp.dest(assetsDir))
})

/**
 * JS tasks
 *
 * Note: use npm to install libraries and add them below, like the babel-polyfill example
 */
const jsFiles = [
    // `./node_modules/babel-polyfill/dist/polyfill.js`,
    srcJS,
];

/**
 * js task - js default task for dev (no compression)
**/

gulp.task(`js-default`, () => {
    return gulp.src(jsFiles)
        .pipe(babel({
            presets: [`@babel/env`]
        }))
        .pipe(gulp.dest(assetsDir));
});

/**
 * js build task - compression task for use in build task only
**/
gulp.task(`js-build`, () => {
    gutil.log('min task fired')
    return gulp.src(jsFiles)
        .pipe(babel({
            presets: [`@babel/env`]
        }))
        .pipe(jsLint())
        .pipe(uglify())
        .pipe(gulp.dest(assetsDir));
});

/**
 * Images task
 */
gulp.task(`images`, () => {
    return gulp.src(`images/**`)
        .pipe(changed(assetsDir)) // ignore unchanged files
        .pipe(gulp.dest(assetsDir))
});

/**
 * Fonts task
 */
gulp.task(`fonts`, () => {
    return gulp.src(`fonts/**`)
        .pipe(changed(assetsDir)) // ignore unchanged files
        .pipe(gulp.dest(assetsDir))
});

/** 
 * Build task
 */

gulp.task(`build`, gulp.series(`css-build`, `js-build`, `images`, `fonts`))

/**
 * Watch task
 */
gulp.task(`watch`, () => {
    gulp.watch(srcCSS, gulp.series(`css-default`));
    gulp.watch(srcJS, gulp.series(`js-default`));
    gulp.watch(`images/*.{jpg,jpeg,png,gif,svg}`, gulp.series(`images`));
    gulp.watch(`fonts/*.{eot,svg,ttf,woff,woff2}`, gulp.series(`fonts`));
});

/**
 * Default task
 */
gulp.task(`default`, gulp.series(`css-default`, `js-default`, `images`, `fonts`));