import AppError from '@shared/errors/AppError';
import CreateAppointmentService from '../CreateAppointmentService';
import FakeAppointmentRepository from '../../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;

let createAppointment: CreateAppointmentService;
beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
});

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appoinntment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '123',
            user_id: '123456',
        });

        expect(appoinntment).toHaveProperty('id');
        expect(appoinntment.provider_id).toBe('123');
    });

    it('should not be able to create two appointments at same date', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        const date = new Date(2020, 4, 10, 13);

        await createAppointment.execute({
            date,
            provider_id: '123',
            user_id: '123456',
        });

        await expect(
            createAppointment.execute({
                date,
                provider_id: '123',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on the past', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: '123',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with provider and user being the same', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: '123',
                user_id: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8:00', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                provider_id: '123',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment after 17:00', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 16).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 18),
                provider_id: '123',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
