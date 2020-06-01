import gulp from 'gulp';
import del from 'del';
import paths from '../utils/paths';

gulp.task('dev-clean', (cb) => {
    del.sync([paths.devDistDir], {force: true});
    cb();
});

gulp.task('dist-clean', (cb) => {
    del.sync([paths.distDir], {force: true});
    cb();
});

gulp.task('clean', gulp.parallel('dev-clean', 'dist-clean'));
