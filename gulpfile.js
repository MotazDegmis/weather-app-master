const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create()

// compile scss into css 
function style(){
    // 1. where is my scss file
    return src('./scss/**/*.scss', { sourcemaps: true })
    // 2. pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
    // 3. autoprefixer and minify
        .pipe(postcss([autoprefixer(), cssnano()]))
    // 4. where do I save the compiled css?
        .pipe(dest('./css', { sourcemaps: '.' }))
    // 5. stream changes to all browser
        .pipe(browserSync.stream())
}


function run(){
    browserSync.init( {
        server: {
            baseDir: '.'
          }  
    })
    watch('./scss/**/*.scss', style)
    watch('./*.html').on('change', browserSync.reload)
    watch('./js/**/*.js').on('change', browserSync.reload)
}


exports.run = run