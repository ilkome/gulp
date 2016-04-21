const gulp = require('gulp')
const paths = require('../paths')
const settings = require('../settings')
const browserSync = require('browser-sync')
const gutil = require('gulp-util')
const debug = require('gulp-debug')
const plumber = require('gulp-plumber')
const gulpif = require('gulp-if')
const stylus = require('gulp-stylus')
const prefix = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const combineMq = require('gulp-combine-mq')
const unCSS = require('gulp-uncss')
const concatCSS = require('gulp-concat-css')
const prettify = require('gulp-jsbeautifier')
const rename = require('gulp-rename')


// Compile stylus
// =================================================================================================
gulp.task('stylus', () => {
  return gulp.src(paths.stylus.entry)

    .pipe(plumber(error => {
      gutil.log(gutil.colors.red('stylus error:'), error.message)
    }))

    // Show name of file in pipe
    .pipe(debug({ title: 'stylus:' }))

    // Stylus
    .pipe(stylus())

    // Autoprefixer
    // .pipe(prefix('last 4 version', 'ie 10'))

    // Rename
    .pipe(rename({
      basename: 'styles'
    }))

    .pipe(gulp.dest(paths.stylus.output))
    .pipe(browserSync.stream({ match: '**/*.css' }))
})


// Minify CSS in build folder
// =================================================================================================
gulp.task('css-clean', () => {
  return gulp.src(paths.css.inputClean)

    .pipe(plumber(error => {
      gutil.log(gutil.colors.red('css-clean error:'), error.message)
    }))

    // Show name of file in pipe
    .pipe(debug({ title: 'css clean:' }))

    // Contat all CSS
    .pipe(concatCSS('styles.min.css'))
    .pipe(gulpif(gutil.env.pretty, concatCSS('styles.pretty.css')))

    // Remove unused styles
    .pipe(unCSS(settings.unCSS))

    // Combine Media queries
    .pipe(combineMq(settings.combineMq))

    // Minify
    .pipe(cleanCSS(settings.cleanCSS))

    // Autoprefixer
    .pipe(prefix('last 4 version', 'ie 10'))

    // Prettify
    .pipe(gulpif(gutil.env.pretty, prettify(settings.pretty)))

    .pipe(gulp.dest(paths.css.output))
    .pipe(browserSync.stream({ match: '**/*.css' }))

    .on('end', () => {
      if (gutil.env.pretty) {
        gutil.log('CSS clean:', gutil.colors.green('pretty'))
      } else {
        gutil.log('CSS clean:', gutil.colors.green('minify'))
      }
    })
})