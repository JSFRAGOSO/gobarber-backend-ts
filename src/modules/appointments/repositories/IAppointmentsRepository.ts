import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDateAndProvider(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>;
    findAllInMonthByProvider(data: IFindAllInMonthDTO): Promise<Appointment[]>;
    findAllInDayByProvider(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
