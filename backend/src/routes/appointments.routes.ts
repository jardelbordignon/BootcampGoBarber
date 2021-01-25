import { Router } from 'express'
import { generate } from 'shortid'

const appointmentsRouter = Router()

const appointments = []

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const appointment = { id: generate(), provider, date }

  appointments.push(appointment)

  return response.json(appointment)
})

export default appointmentsRouter
