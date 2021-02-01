
import { Request, Response, NextFunction } from "express"
import AppError from "./AppError"



const globalErrorHandler = (err: AppError, request: Request, response: Response, next: NextFunction) => {  // If I have four parameters I know It is an Error Handler




    if (err.isOperational) {

        return response.status(err.statusCode).json({
            status: err.status,
            mesage: err.message
        })

    }

    console.log(err.stack)
    console.log(err.message)

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })





}


export default globalErrorHandler
