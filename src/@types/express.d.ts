
/**
 * I am giving more options to Reques of Express.
 * Dont need to do it in JS, only in TS
 */
declare namespace Express {

    export interface Request {
        user: {
            id: string
        }
    }


}
