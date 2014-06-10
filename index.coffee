express = require("express")
path = require("path")
app = express()

staticMiddleware = express.static(path.join(__dirname, "public"))

app.use staticMiddleware

# try sticking ".html" on the end.
app.use (req, res, next)->
  originalUrl = req.url
  req.url += ".html"
  staticMiddleware(req, res, ()->
    req.url = originalUrl
    next()
  )



app.use express.errorHandler()
exports.app = app
