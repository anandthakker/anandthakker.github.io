gulp = require('gulp')



# Include plugins
clean = require("gulp-clean")
refresh = require("gulp-livereload")
runWintersmith = require("run-wintersmith")
express = require("express")
livereload = require("connect-livereload")
lrserver = require('tiny-lr')()
livereloadport = 35729
serverport = 5000

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
  gulp.src(BUILD_DIR,
    read: false
  ).pipe clean()


#
# Helper task - Tells Livereload to refresh
#
gulp.task "refresh-browser", ->
  gulp.src("config.json",
    read: false
  ).pipe refresh(lrserver)


#
# Build task
#
gulp.task "build", ["clean"], (cb) ->

  # Tell Wintersmith to build
  runWintersmith.build ->

    # Log on successful build
    console.log "Wintersmith has finished building!"

    # Tell gulp task has finished
    cb()


#
# Preview task
#
server = express()
server.use livereload({port: livereloadport})
server.use require('./index.coffee').app

gulp.task "preview", ["build"], ->
  server.listen(serverport)
  lrserver.listen(livereloadport)


#
# Watch task
#
gulp.task "watch", [
  "preview"
], ->

  # Watch Jade template files
  gulp.watch TEMPLATES_DIR + "/**", ["build", "refresh-browser"]

  # Watch all content files
  gulp.watch CONTENT_DIR + "/**", ["build", "refresh-browser"]
