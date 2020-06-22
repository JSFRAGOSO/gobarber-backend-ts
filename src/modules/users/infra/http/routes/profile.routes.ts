import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    ProfileController.update,
);
profileRouter.get('/', ProfileController.show);

export default profileRouter;
