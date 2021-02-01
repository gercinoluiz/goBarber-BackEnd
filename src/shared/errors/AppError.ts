import { faIR } from "date-fns/locale";





class AppError extends Error {

    public readonly message: string;
    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;

    constructor(message: string, statuscode = 400) {

        super(message)

        this.message = message;
        this.status = `${statuscode}`.startsWith('4') ? 'fail' : 'error';
        this.statusCode = statuscode;
        this.isOperational = true;                      // Everytime I call this AppError it will be true, if not It is not this custom class,but the Erro class


        Error.captureStackTrace(this, this.constructor)


    }
}


export default AppError;
