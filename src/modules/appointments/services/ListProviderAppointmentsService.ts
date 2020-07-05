import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointment';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<Appointments[]> {
        await this.cacheProvider.save('foi', '?');
        const cacheData = await this.cacheProvider.recover('foi');
        console.log(cacheData);

        const appointments = await this.appointmentsRepository.findAllInDayByProvider(
            {
                provider_id,
                month,
                year,
                day,
            },
        );

        return appointments;
    }
}

export default ListProviderAppointmentsService;
