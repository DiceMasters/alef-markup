let gulp 			= require('gulp'),
	browserSync		= require('browser-sync').create(),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat			= require('gulp-concat'),
	sass			= require('gulp-sass'),
	cleancss		= require('gulp-clean-css'),
	jade 			= require('gulp-jade'),
	minify			= require('gulp-minify'),
	data 			= require('gulp-data'),
	path			= require('path'),
	fs				= require('fs')

gulp.task('sass', function(done) {
	gulp.src('app/scss/*.scss')
		.pipe(concat('General.scss'))
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['>1% in RU', 'ie 11'],
			grid: true,
			cascade: false
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())

	done()
})

gulp.task('bootstrap', function(done) {
	gulp.src('app/bootstrap/scss/**/*.scss')
		.pipe(sass())
		.pipe(concat('bootstrap.min.css'))
		.pipe(cleancss({ level: 2 }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())

	done()
})

gulp.task('jade', function(done) {
	gulp.src('app/*.jade')
		.pipe( data(file => require('./app/data/data.json')))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('app'))

	done()
})

gulp.task('default', function(done) {

	browserSync.init({
		server: './app',
		watch: true,
		ui: {
			port: 8080
		},
		files: ['app/css/*.css', 'app/*.html', 'app/bootstrap/scss/**/*.scss']
	})

	gulp.series(['sass', 'bootstrap', 'jade'])

	done()
})

gulp.watch('app/scss/*.scss', gulp.series(['sass']))
gulp.watch('app/bootstrap/scss/**/*.scss', gulp.series(['bootstrap']))
gulp.watch(['app/*.jade', 'app/templates/*.jade', 'app/data/data.json'], gulp.series(['jade']))