/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp        = require('gulp');
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    del         = require('del'),
    webserver   = require('gulp-webserver');

var config = {
    js: [
        
    ],
    css: [        
        
    ],  
    fonts: [

    ],
    images: [
        
    ]
};

var dest = {
    scripts: 'Scripts/',
    styles:  'Content/',
    images:  'Content/Images/',
    fonts:   'fonts/'
};

gulp.task('clean', function () {
    return del([
        dest.scripts + 'all.min.js', 
        dest.styles + 'all.min.css', 
        dest.fonts + '*'
    ]);
});

gulp.task('fonts', function () {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(dest.fonts));
});

gulp.task('images', function () {
    return gulp.src(config.images)
        .pipe(gulp.dest(dest.images));
});

gulp.task('styles', function () {
    return gulp.src(config.css)
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(dest.styles));
});

gulp.task('scripts', function () {
    return gulp.src(config.js)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('compile', ['clean', 'fonts', 'styles', 'scripts', 'images'], function() {

});

gulp.task('webserver', ['compile'], function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: {
                enable: true, 
                filter: function(fileName) {
                    if (fileName.match(/.html$/) || fileName.match(/.htm$/) || fileName.match(/.css$/) || fileName.match(/.js$/)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            directoryListing: true,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('default', ['webserver'], function () {
    
});