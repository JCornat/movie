var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var gulp = require('gulp');
var fontName = 'icon';

gulp.task('iconfont', function () {
  return gulp.src(['src/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName,
      path: 'src/assets/styles/_icons.scss',
      targetPath: './_icon.scss',
    }))
    .pipe(iconfont({
      fontName,
      normalize: true,
      fontHeight: 1001,
    }))
    .pipe(gulp.dest('src/assets/styles/generated'));
});
