import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-htmlmin';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';

// Styles

export const styles = () => {
  return gulp.src('src/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const script = () => {
  return gulp.src('src/js/*.js')
    .pipe(terser())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(gulp.dest('build/js'));
}

// Images

const optimizeImages = () => {
  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'));
}

// WebP

const createWebP = () => {
  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'));
}

// SVG

const optimizeSvg = () => {
  return gulp.src('src/img/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
}

const spriteSvg = () => {
  return gulp.src('src/img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'src/fonts/*.{woff2,woff}',
    'src/*.ico',
    'src/*.webmanifest',
    'src/img/icons/*.svg',
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return deleteAsync('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'src'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('src/sass/**/*.scss', gulp.series(styles));
  gulp.watch('src/*.html').on('change', browser.reload);
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    script,
    optimizeSvg,
    spriteSvg,
    createWebP,
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    script,
    optimizeSvg,
    spriteSvg,
    createWebP,
  ),
  gulp.series(
    server,
    watcher
  ));
