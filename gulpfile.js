
var gulp =  require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

let cssmin = require("gulp-clean-css");
let concat = require("gulp-concat");
let babel = require("gulp-babel");
// var cleanCSS=require('gulp-clean-css')

// const babel = require("gulp-babel");
// const es2015Preset = require("babel-preset-es2015")


gulp.task("copy-html", async function(){
	gulp.src("*.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer"));
});
gulp.task("copy-php", async function(){
	gulp.src("*.php").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer"));
});

gulp.task("copy-css", async function(){
	gulp.src("css/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\css"));
}); 

gulp.task("copy-js", async function(){
	gulp.src("js/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\js"));
}); 

gulp.task("copy-img", async function(){
	gulp.src("img/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\img"));
}); 

// 压缩css
// gulp.task("sass",function(){
//     gulp.src("css/*.css'")
//     .pipe(cleanCSS())
//     .pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\css"));
// });



//监听

gulp.task("watchall",async function(){
    // html
    gulp.watch("*.html", async function(){
        gulp.src("*.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer"));
    });
    //css
    gulp.watch("css/**/*", async function(){
        gulp.src("css/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\css"));
    });
    //js
    gulp.watch("js/**/*", async function(){
        gulp.src("js/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\js"));
    });
    //img
    gulp.watch("img/**/*", async function(){
        gulp.src("img/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\img"));
    });
    //php
    gulp.watch("*.php", async function(){
        gulp.src("*.php").pipe(gulp.dest("D:\\phpStudy\\WWW\\razer"));
    });
    // scss
    gulp.watch("scss/*.scss", async function(){
        gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("D:\\Razer\\css"));
    });

    gulp.watch("./src/css/*.css",async ()=>{
        gulp.src("./src/css/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\js"));
    })

    //  合并并压缩
    gulp.watch("./src/js/*.js",async ()=>{
        gulp.src(["./src/js/index.js","./src/js/goodslist.js"])
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\js"));
    })

    // es6转ES5

    gulp.watch("./src/js/index.js",async ()=>{
        gulp.src(["./src/js/index.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\js"));
    })

    //压缩js
    // gulp.watch("js/*.js",async ()=>{
    //     gulp.src("js/*.js")
    //     .pipe(babel({presets:[es2015Preset]}))
    //     .pipe(uglify())
    //     .pipe(gulp.dest("D:\\phpStudy\\WWW\\razer\\js"));
    // })

    // gulp.watch("scss/*.scss",async ()=>{
    //     gulp.src("scss/*.scss")
    //     .pipe(babel({presets:[es2015Preset]}))
    //     .pipe(sass())
    //     .pipe(minfyCSS())
    //     .pipe(gulp.dest("D:\\Razer\\css"));
    // })
});

