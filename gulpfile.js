"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require("gulp-sass");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}


// CSS task
function css() {
    console.log('css')
  return gulp
    .src("./sass/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css/"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./sass/**/*", css);
  gulp.watch("./*.html", browserSync.reload);
}

const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.watch = watch;
exports.default = watch;