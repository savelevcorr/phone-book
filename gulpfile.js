var gulp     = require('gulp'),
	concat   = require('gulp-concat'),
	plumber  = require('gulp-plumber'),
	less     = require('gulp-less'),
	path     = require('path'),
	connect  = require('gulp-connect'),
	opn      = require('opn');


// Deafult task

gulp.task('default', ['connect', 'watch']);

// Concat js
gulp.task('concat', function(){
	return gulp.src([
          './src/vendor/jquery/dist/jquery.min.js',
          './src/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js',
          './src/vendor/jquery.kladr/jquery.kladr.min.js',
	    		'./src/vendor/moment/min/moment-with-locales.min.js',
	    		'src/vendor/underscore/underscore-min.js',
	    		'src/vendor/bootstrap/dist/js/bootstrap.min.js',
	    		'src/vendor/backbone/backbone-min.js'
	    	])
	    .pipe(concat('common.js'))
	    .pipe(gulp.dest('./src/js/'));
});


// Basic compile less
gulp.task('less', function () {
  return gulp.src('src/css/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('src/css/'));
});

// Dev server & liveReload
gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
	gulp.src('./src/index.html')
   		.pipe(connect.reload());
});

gulp.task('watch', function () {
  	gulp.watch(['./src/index.html'], ['html']);
});