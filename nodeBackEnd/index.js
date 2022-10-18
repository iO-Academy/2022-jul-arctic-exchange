const express = require('express')
const routes = require('./Config/routes')
const app = express()
const cors = require('cors')
const port = 3002

app.use(cors())
app.use(express.json())

routes(app)

app.listen(port)