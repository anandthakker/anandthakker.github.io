gulp = require('gulp')

# Include plugins
clean = require("gulp-clean")
runWintersmith = require("run-wintersmith")
browserSync = require('browser-sync')

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
    port: 5000
    server:
      baseDir: BUILD_DIR


#
# Build task
#
build = (cb)->
  # Tell Wintersmith to build
  runWintersmith.build ->
    # Log on successful build
    console.log "Wintersmith has finished building!"
    # Tell gulp task has finished
    cb()
gulp.task "build", ["clean"], build
gulp.task "build-preview", build # build without clean, for use in preview.



#
# Watch task
#

gulp.task "watch", ["build-preview", "bs-init"], ->

  # Watch Jade template files
  gulp.watch TEMPLATES_DIR + "/**", ["build-preview", browserSync.reload]

  # Watch all content files
  gulp.watch CONTENT_DIR + "/**", ["build-preview", browserSync.reload]
