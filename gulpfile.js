const {src, dest, lastRun, watch, series, parallel} = require('gulp');
const rigger = require('gulp-rigger'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync");

const path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/style/main.less',
        js: 'src/js/main.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/style/**/*.less',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Sova"
};

function html() {
    return src(path.src.html)
        .pipe(rigger()) // импортировать один файла в другой (//= header.html)
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
}

function style() {
    return src(path.src.style, {sourcemaps: true}) // инициализировать sourcemap
        .pipe(less()) // скомпилировать LESS код
        .pipe(autoprefixer()) // добавить вендорные префиксы
        .pipe(minifyCSS()) // сжать CSS код
        .pipe(dest(path.build.css, {sourcemaps: true})) // прописать карты
        .pipe(browserSync.reload({stream: true}));
}

function js() {
    return src(path.src.js, {sourcemaps: true}) // инициализировать sourcemap
        .pipe(rigger()) // импортировать один файла в другой (//= map.js)
        .pipe(uglify()) // сжать JS код
        .pipe(dest(path.build.js, {sourcemaps: true})) // прописать карты
        .pipe(browserSync.reload({stream: true}));
}

function image() {
    return src(path.src.img, {since: lastRun(image, 0)})
        .pipe(imagemin({ // сжать картинки
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function cleaner(cb) {
    return rimraf(path.clean, cb); // удалить папку build
}

function watcher() {
    watch([path.watch.html], html);
    watch([path.watch.style], style);
    watch([path.watch.js], js);
    watch([path.watch.img], image);
    watch([path.watch.fonts], fonts);
}

function webserver() {
    browserSync(config);
}

exports.html = html;
exports.style = style;
exports.js = js;
exports.image = image;
exports.fonts = fonts;
exports.clean = cleaner;
exports.build = series(
    cleaner,
    parallel(html, style, js, image, fonts)
);
exports.watch = watcher;
exports.webserver = webserver;
exports.default = series(
    series(
        cleaner,
        parallel(
            html, style, js, image, fonts
        ),
        parallel(
            watcher, webserver
        )
    ),
);
