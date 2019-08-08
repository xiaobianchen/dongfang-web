const gulp = require('gulp');
const ftp = require('gulp-ftp');
const util = require('gulp-util');

gulp.task('qaFtp', function () {
    return gulp.src(['./build/**/*']).pipe(ftp({
        host: '192.168.102.199',
        pass: 'BingkunCdn',
        port: 21,
        remotePath: 'crm',
        user: 'cdn'
    })).pipe(util.noop())
});

