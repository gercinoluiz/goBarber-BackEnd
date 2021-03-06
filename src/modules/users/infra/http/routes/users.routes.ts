import { Router } from "express"
import ensureAutentication from "@modules/users/infra/http/middlewares/ensureAuthetications";
import multer from "multer";
import uploadConfig from "@config/upload"

import  UsersController from "@modules/users/infra/http/Controllers/UsersControler"
import UpdateUserAvatarController  from "@modules/users/infra/http/Controllers/UpdateUserAvatarController"
import reqChecker from '../../../../../shared/infra/http/celebrate/reqChecker';

const upload = multer(uploadConfig)
const usersRouter = Router();
const usersController = new UsersController()
const updateUserAvatarController = new UpdateUserAvatarController()



usersRouter.post("/", reqChecker.user,  usersController.create)

usersRouter.patch("/avatar", ensureAutentication, upload.single('avatar'), updateUserAvatarController.update)

export default usersRouter;
