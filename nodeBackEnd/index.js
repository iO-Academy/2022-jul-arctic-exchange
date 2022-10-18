const express = require('express')
const routes = require('./Config/routes')
const app = express()
const port = 3001

app.use(express.json())

routes(app)

app.listen(port)