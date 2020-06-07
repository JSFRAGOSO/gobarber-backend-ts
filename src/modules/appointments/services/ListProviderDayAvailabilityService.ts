import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    avaliable: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayByProvider(
            {
                provider_id,
                year,
                month,
                day,
            },
        );

        const hourStart = 8;

        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => index + hourStart,
        );

        const available = eachHourArray.map(hour => {
            const hourAppointed = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            const currentDate = new Date(Date.now());
            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                avaliable: !hourAppointed && isAfter(compareDate, currentDate),
            };
        });

        return available;
    }
}

export default ListProviderDayAvailabilityService;
