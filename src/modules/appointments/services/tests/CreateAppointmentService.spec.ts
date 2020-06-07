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
        const appoinntment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123',
        });

        expect(appoinntment).toHaveProperty('id');
        expect(appoinntment.provider_id).toBe('123');
    });
    it('should not be able to create two appointments at same date', async () => {
        const date = new Date();

        await createAppointment.execute({
            date,
            provider_id: '123',
        });

        await expect(
            createAppointment.execute({
                date,
                provider_id: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
