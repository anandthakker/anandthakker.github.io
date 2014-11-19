gulp = require('gulp')

# Include plugins
clean = require("gulp-clean")
browserSync = require('browser-sync')
wintersmith = require('wintersmith')

#
# Directories
#
BUILD_DIR = "public"
CONTENT_DIR = "contents"
TEMPLATES_DIR = "templates"

#
# Helper task - Cleans everything in build dir
#
gulp.task "clean", ->
  gulp.src(BUILD_DIR, {read: false})
    .pipe clean()

#
# Init browserSync
#
gulp.task 'bs-init', ->
  browserSync.init
    open: false
    port: 5000
    server:
      baseDir: BUILD_DIR


#
# Build task
#
build = (cb) ->
  wintersmith('config.json').build (err)->
    if err then console.error err
    cb()
gulp.task "build", ["clean"], build
gulp.task "build-preview", build


#
# Watch task
#

gulp.task "watch", ["build", "bs-init"], ->
  gulp.watch [TEMPLATES_DIR + "/**"
    CONTENT_DIR + '/**'], ['build-preview', browserSync.reload]
