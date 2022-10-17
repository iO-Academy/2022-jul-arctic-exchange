const express = require('express')
const routes = require('./Config/routes')
const app = express()
const port = 3500
const cors = require('cors')

app.use(cors())
app.use(express.json())

routes(app)

app.listen(port)