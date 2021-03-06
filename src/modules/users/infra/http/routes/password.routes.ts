
import { Router } from 'express';
import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ResetPasswordController from '../Controllers/ResetPasswordController';
import reqChecker from '../../../../../shared/infra/http/celebrate/reqChecker';


const passwordRouter = Router()

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController()



passwordRouter.post('/forgot', reqChecker.email, forgotPasswordController.create)
passwordRouter.post('/reset', reqChecker.resetPassword, resetPasswordController.create)


export default passwordRouter;
