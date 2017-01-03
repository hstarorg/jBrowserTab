require('shelljs/global');
const gulp = require('gulp4');
const umd = require('gulp-umd');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

let needUglify = false;
if (process.argv.indexOf('-c') >= 0) {
  needUglify = true;
}

const umdOpt = {
  exports: file => 'jBrowserTab',
  namespace: file => 'jBrowserTab'
};

gulp.task('clean', done => {
  rm('-rf', 'dist');
  done();
});

gulp.task('umd-wrapper', () => {
  let gulpStream = gulp.src('src/j-browser-tab.js')
    .pipe(umd(umdOpt));
  // 处理压缩任务
  if (needUglify) {
    gulpStream = gulpStream.pipe(uglify())
      .pipe(concat('j-browser-tab.min.js'));
  }
  return gulpStream.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  return gulp.watch('src/**/*.js', gulp.series('umd-wrapper'));
});

gulp.task('dev', gulp.series('clean', 'umd-wrapper', 'watch'));
