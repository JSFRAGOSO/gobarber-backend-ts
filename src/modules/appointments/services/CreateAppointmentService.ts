import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppoitmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationRepository')
        private notificationRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (provider_id === user_id)
            throw new AppError('Provider and User cannot be the same');

        if (isBefore(appointmentDate, Date.now()))
            throw new AppError('Past hours are not allowed');

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
            throw new AppError(
                'Appointments can only be booked between 8:00 and 17:00',
            );

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDateAndProvider(
            appointmentDate,
            provider_id,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This hour is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        const dateFormatted = format(
            appointmentDate,
            "dd/MM/yyyy 'às' HH:mm'h'",
        );

        await this.notificationRepository.create({
            user: provider_id,
            content: `Novo agendamento para o dia ${dateFormatted}`,
        });

        const dateCacheFormatted = format(appointmentDate, 'yyyy-M-d');

        await this.cacheProvider.invalitade(
            `provider-appointments:${provider_id}:${dateCacheFormatted}`,
        );

        return appointment;
    }
}

export default CreateAppoitmentService;
