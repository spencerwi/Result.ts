var gulp = require("gulp");
var merge = require("merge2");

var typescript = require("gulp-typescript");
var uglifyjs = require("gulp-uglifyjs");

var run = require("gulp-run");

var rimraf = require("rimraf");

gulp.task('clean', function(cb){
    rimraf("./dist", cb);
})
gulp.task('build', ['clean'], function(){
    var tsProject = typescript.createProject('tsconfig.json', {typescript: require("typescript")});
    var compiledTS = tsProject.src().pipe(typescript(tsProject));

    return merge([
        compiledTS.dts.pipe(gulp.dest('dist')),
        compiledTS.js.pipe(gulp.dest('dist'))
                     .pipe(uglifyjs("optional.min.js", {
                        preserveComments: "all"
                     }))
                     .pipe(gulp.dest('dist'))
    ]);
});
gulp.task('test', ['clean', 'build'], function(){
    return gulp.src('test/result_spec.ts')
               .pipe(typescript({
                   typescript: require("typescript"),
                   module: 'commonjs'
               }))
               .pipe(gulp.dest('test'))
               .pipe(run('node', {verbosity: 3, cwd: 'test'}))
});
gulp.task('cleanup-after-test', ['test'], function(done){
    rimraf('./test/result_spec.js', done);
})

gulp.task("default", ['cleanup-after-test'])
