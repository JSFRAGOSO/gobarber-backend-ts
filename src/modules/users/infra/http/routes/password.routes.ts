import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import forgotPasswordController from '../controllers/ForgotPasswordController';
import resetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.create,
);
passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    resetPasswordController.create,
);

export default passwordRouter;
