import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.user;

        const listProvidersService = container.resolve(ListProvidersService);

        const providers = await listProvidersService.execute({
            user_id: id,
        });

        delete providers[0].password;
        return response.json(providers);
    }
}

export default new ProvidersController();
