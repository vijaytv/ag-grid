var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var concat = require('gulp-concat');
var proxy = require('http-proxy-middleware');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer')

var watchify = require('watchify');

gulp.task('default', function(callback){
  runSequence('build',callback);
})

gulp.task('copy-css', function(){

})

gulp.task('mock-server',function(){
    nodemon({
      script: 'mockServer.js'
    , ext: 'js hbs'
    , watch: ['mocks']
    , env: { 'NODE_ENV': 'development' }
    })
})

gulp.task('index', function(){

})

function bundle (bundler) {
    return bundler
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
}

gulp.task('watch', function () {
    var watcher = watchify(browserify('app/scripts/main.js', watchify.args));

    bundle(watcher);

    watcher.on('update', function () {
        bundle(watcher);
    });

    watcher.on('log', gutil.log);
});

gulp.task('js', function () {
    return bundle(browserify('app/scripts/main.js'));
});


gulp.task('copy-app', function(){
  return gulp.src(['./app/**/*.html','./app/**/*.css'])
          .pipe(gulp.dest('./dist'));
})


gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: 3000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/api', {
                    target: 'http://localhost:3200',
                    changeOrigin:true
                })
            ]
        }

    });
});


gulp.task('clean', function(callback){
  del(['./dist/*'],{force: true, callback })
})

gulp.task('build',['clean','copy-css','copy-app','js','watch'])

gulp.task('start',['build','mock-server','connect'])
