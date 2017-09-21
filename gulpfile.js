//  gulp.js

var gulp = require("gulp");
var merge = require("merge-stream");

gulp.task("copyCSS", () => {
    gulp.src("./node_modules/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("./web/css"));
});

gulp.task("copyJS", () => {
    var bootstrap = gulp.src("./node_modules/bootstrap/dist/js/bootstrap.min.js")
                        .pipe(gulp.dest("./web/js"));

    var jquery = gulp.src("./node_modules/jquery/dist/jquery.min.js")
                     .pipe(gulp.dest("./web/js"));

    return merge(bootstrap, jquery);
});

gulp.task("copyStatic", ["copyCSS", "copyJS"])