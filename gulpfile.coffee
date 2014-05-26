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
DEPLOY_DIR = "../asphalt/anandthakker/home"

#
# Helper task - Cleans everything in build dir
#
gulp.task "clean", ->
  gulp.src(BUILD_DIR, {read: false})
    .pipe clean()

gulp.task "clean-deploy", ->
  gulp.src(DEPLOY_DIR + "/public", {read: false})
    .pipe clean({force: true})

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
# Deploy task
#
gulp.task "deploy", ["build", "clean-deploy"], ->
  gulp.src(BUILD_DIR + "/**")
    .pipe(gulp.dest(DEPLOY_DIR + "/public"))
  gulp.src("index.coffee")
    .pipe(gulp.dest(DEPLOY_DIR))


server = express()
server.use livereload({port: livereloadport})
server.use require('./index.coffee').app

#
# Watch task
#
gulp.task "watch", ["build-preview"], ->

  server.listen(serverport)
  lrserver.listen(livereloadport)

  # Watch Jade template files
  gulp.watch TEMPLATES_DIR + "/**", ["build-preview", "refresh-browser"]

  # Watch all content files
  gulp.watch CONTENT_DIR + "/**", ["build-preview", "refresh-browser"]
