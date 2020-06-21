import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, year, month } = request.body;
        const { provider_id } = request.params;

        const listProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const providers = await listProviderDayAvailabilityService.execute({
            provider_id,
            day,
            year,
            month,
        });

        return response.json(providers);
    }
}

export default new ProviderDayAvailabilityController();
