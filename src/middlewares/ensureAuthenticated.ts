import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if(!authToken) {
    return response.status(401).send({
      message: "Token is missing"
    })
  }
  const [prefix, token] = authToken.split(' ')

  try {
    verify(token, '4986917e-22f1-4fd9-9ab1-c1af7f8654ac-d2891c2e-97af-4336-8d3d-3087235c766f-20107575-9c0b-40fa-b42d-dc226cd42b5d')

    return next()
  } catch (error) {
    return response.status(401).send({
      message: "Token is invalid."
    })
  }
}