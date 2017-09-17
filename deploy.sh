#!/bin/bash
# From https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
set -e

cd build
git init

# copy circle.yml so that CircleCI knows not to build master
cp ../circle.yml .

# inside this git repo we'll pretend to be a new user
git config user.name "CI Robot"
git config user.email "robot@anandthakker.net"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

echo "Deploying to GitHub pages"
# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "${GH_REF}" master
