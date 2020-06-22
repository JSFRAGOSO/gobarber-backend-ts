import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.body;
        const user_id = request.user.id;

        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointmentsService.execute({
            day,
            month,
            year,
            provider_id: user_id,
        });
        return response.json(appointments);
    }
}

export default new ProviderAppointmentsController();
