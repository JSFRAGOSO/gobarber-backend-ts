import { Router } from 'express';
import forgotPasswordController from '../controllers/ForgotPasswordController';
import resetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
