// Load gulp and gulp-load-plugin
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Load utility npm modules
const sequence = require('run-sequence');
const browserSync = require('browser-sync').create();

// Task definitions start here

// Start browserSync server
gulp.task('browserSync', () => {
  browserSync.init({
    host: '192.168.1.9',
    server: {
      baseDir: ['./'],
    },
    reloadDelay: 1800,
    notify: false,
  });
});

// Set watchers
gulp.task('watch', () => {
  plugins.watch(['*.html', '*.js', '*.css'], () => {
    browserSync.reload();
  });
});

// Build Sequences
// ---------------

gulp.task('default', () => {
  sequence(['browserSync'], 'watch');
});
