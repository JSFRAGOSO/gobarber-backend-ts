import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.query;
        const user_id = request.user.id;

        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointmentsService.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id: user_id,
        });
        return response.json(classToClass(appointments));
    }
}

export default new ProviderAppointmentsController();
