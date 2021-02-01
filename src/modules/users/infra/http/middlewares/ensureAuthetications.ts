import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '@config/auth'
import AppError from '@shared/errors/AppError'


interface TokenPayload {

    iat: number,
    exp: number,
    sub: string

}

export default function ensureAutentication(request: Request, response: Response, next: NextFunction): void {


    const authHeader = request.headers.authorization

    if (!authHeader) throw new AppError('jwt token is missing', 401)

    // The code bellow separetes the Barear word from the token 7as85osa@!@i@ijidsaoj
    const [, token] = authHeader.split(' ') // The comma says i don want to use the first one from the desistruturation

    // I am using a try here in Order to send a custom error
    try {

        const decoded = verify(token, auth.jwt.secret)

        const { sub } = decoded as TokenPayload // forcing the decoded to have sub inside it **Nice

        request.user = {
            id: sub
        }

        return next();

    } catch {

        throw new AppError('Invalid JWT token', 401)
    }

}
