import 'reflect-metadata'
import express from 'express'

import routes from './routes'
import './database'
import { tmpDirectory } from './config/upload'

const app = express()

app.use(express.json())

app.use('/files', express.static(tmpDirectory))

app.use(routes)

const port = 3333
app.listen(port, () => console.log('✨ Server running on port '+port))
