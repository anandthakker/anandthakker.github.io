express = require("express")
path = require("path")
app = express()
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.static(path.join(__dirname, "public"))
app.use express.errorHandler()
exports.app = app