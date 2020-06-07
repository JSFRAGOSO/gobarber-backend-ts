import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class MonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = 'e34e017a-74ce-4440-ab0a-2c83651ec3b5';
        const month = 4;
        const year = 2020;

        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const providers = await listProviderMonthAvailabilityService.execute({
            provider_id,
            month,
            year,
        });

        return response.json(providers);
    }
}

export default new MonthAvailabilityController();
