import { request } from 'express';
import multer from 'multer';
import path from "path"
import crypto from "crypto"



const tempFolder = path.resolve(__dirname, '..', '..', 'temp')
const uploadFolder = path.resolve(tempFolder, 'uploads' )

export default {


    tempFolder,
    uploadFolder,

    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp'),
        filename(request, file, callback) {
            const filehash = crypto.randomBytes(10).toString('hex')

            const filename = `${filehash}-${file.originalname}`;

            return callback(null, filename)
        },

    })



}
