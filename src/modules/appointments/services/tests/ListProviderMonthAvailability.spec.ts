import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from '../ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
        fakeAppointmentsRepository,
    );
    fakeUsersRepository = new FakeUsersRepository();
});

describe('ListMonthAvailability', () => {
    it('should be able to list the provider month availability', async () => {
        const provider = await fakeUsersRepository.create({
            name: 'Provider',
            email: 'provider@example.com',
            password: '123456',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 4, 20, 8, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 8, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 9, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 10, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 11, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 12, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 13, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 14, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 15, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 16, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 17, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 21, 8, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                provider_id: provider.id,
                month: 6,
                year: 2020,
            },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, avaliable: true },
                { day: 20, avaliable: false },
                { day: 21, avaliable: true },
                { day: 22, avaliable: true },
            ]),
        );
    });
});
