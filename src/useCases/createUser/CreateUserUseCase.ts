import { client } from "../../prisma/client"

import { hash } from 'bcryptjs'

type UserRequest = {
  name: string
  password: string
  username: string
}

export class CreateUserUseCase {
  async execute({ name, username, password }: UserRequest) {
    const userAlredyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlredyExists) {
      throw new Error ("User already exists!")
    }

    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    })

    return user
  }
}