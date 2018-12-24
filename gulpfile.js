// Load gulp and gulp-load-plugin
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// Load utility npm modules
const browsersync = require('browser-sync').create();

// Start browserSync server
gulp.task('serve', () => {
  browsersync.init({
    host: '192.168.1.10',
    server: {
      baseDir: './',
    },
    reloadOnRestart: true,
    reloadDelay: 1000,
    notify: false,
    open: false,
  });
});

// Set watchers
gulp.task('watch', () => {
  plugins.watch(['*.html', '*.js', '*.css'], () => {
    browsersync.reload();
  });
});

// Serve and watch files
gulp.task('default', gulp.series('serve', 'watch'));
