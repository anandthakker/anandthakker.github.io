express = require("express")
path = require("path")
app = express()

staticMiddleware = express.static(path.join(__dirname, "public"))

app.use staticMiddleware
app.use (req, res, next)->
  req.url += ".html"
  staticMiddleware(req, res, next)


app.use express.errorHandler()
exports.app = app
