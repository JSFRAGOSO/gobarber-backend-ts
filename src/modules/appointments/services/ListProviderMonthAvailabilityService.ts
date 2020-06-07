import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    avaliable: boolean;
}>;

@injectable()
class ListProvidersMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthByProvider(
            {
                provider_id,
                month,
                year,
            },
        );

        const numberOfDayInMonth = getDaysInMonth(new Date(year, month - 1));
        const eachDayArray = Array.from(
            {
                length: numberOfDayInMonth,
            },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(
                appointment => getDate(appointment.date) === day,
            );

            return {
                day,
                avaliable: appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProvidersMonthAvailabilityService;
