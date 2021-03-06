
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'
import {Request, Response} from 'express'
import { NextFunction } from 'express';
import AppError from '../../errors/AppError';



const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASS || undefined,
})


const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rate-limit',
    points: 5,
    duration: 1
})


export default async function rateLimiter(request:Request, response:Response, next: NextFunction):Promise<void> {
        try {
            await limiter.consume(request.ip)
            next()
            
        } catch (error) {
            throw new AppError(`Too many request`, 429)
        }
}