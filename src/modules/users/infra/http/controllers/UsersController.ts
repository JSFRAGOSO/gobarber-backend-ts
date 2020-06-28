import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createUserService = container.resolve(CreateUserService);

        const { name, email, password } = request.body;

        const user = await createUserService.execute({ name, email, password });

        delete user.password;

        return response.status(201).json(classToClass(user));
    }
}

export default new UsersController();
