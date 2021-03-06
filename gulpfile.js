var gulp       	= require('gulp');
var compass 	= require('gulp-compass');
var cleanCSS 	= require('gulp-clean-css');
var gcmq 	   	= require('gulp-group-css-media-queries');
var uglify 		= require('gulp-uglify');

// Styles
gulp.task('scss', function() {
	return gulp.src('src/scss/style.scss')
		.pipe(compass({
			css: 'dist/css',
			sass: 'src/scss',
			sourcemap: false
		}))
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('src/js/functions.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Libs
gulp.task('libs', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/bootstrap/dist/css/bootstrap.min.css'
		])
		.pipe(gulp.dest('dist/libs'));
});

// Icons
gulp.task('icons', function () {
	return gulp.src('src/icons/**/*.{eot,ttf,woff,woff2,svg}')
		.pipe(gulp.dest('dist/icons'));
});

// Default
gulp.task('default', ['scss','scripts', 'libs', 'icons']);

// Dev
gulp.task('dev', ['default'], function() {
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/js/functions.js', ['scripts']);
	gulp.watch('src/icons/**/*.{eot,ttf,woff,woff2,svg}', ['icons']);
});