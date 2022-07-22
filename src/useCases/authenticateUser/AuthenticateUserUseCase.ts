import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"

type Request = {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: Request) {
    const userAlredyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if(!userAlredyExists) {
      throw new Error("User and/or password incorrect")
    }

    const passwordMatch = compare(password, userAlredyExists.password)

    if (!passwordMatch) {
      throw new Error("User and/or password incorrect")
    }

    const token = sign({ username }, '4986917e-22f1-4fd9-9ab1-c1af7f8654ac-d2891c2e-97af-4336-8d3d-3087235c766f-20107575-9c0b-40fa-b42d-dc226cd42b5d', {
      subject: userAlredyExists.id,
      expiresIn: "20s"
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlredyExists.id)

    return { token, refreshToken }
  }
}