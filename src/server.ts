import "express-async-errors"
import express, { json, NextFunction, Request, Response } from 'express'
import { router } from './routes'

const app = express()

app.use(json())
app.use(router)
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(500).send({
    status: "Error",
    message: error.message
  })
})

app.listen(3000, () => console.log("Server is running!"))