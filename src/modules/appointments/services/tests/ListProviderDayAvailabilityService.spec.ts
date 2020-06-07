import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from '../ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;

beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
        fakeAppointmentsRepository,
    );
    fakeUsersRepository = new FakeUsersRepository();
});

describe('ListDayAvailability', () => {
    it('should be able to list the provider month availability', async () => {
        const provider = await fakeUsersRepository.create({
            name: 'Provider',
            email: 'provider@example.com',
            password: '123456',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 14, 0, 0),
            provider_id: provider.id,
        });
        await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 17, 0, 0),
            provider_id: provider.id,
        });

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: provider.id,
            month: 6,
            year: 2020,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, avaliable: false },
                { hour: 9, avaliable: false },
                { hour: 10, avaliable: false },
                { hour: 11, avaliable: false },
                { hour: 14, avaliable: false },
                { hour: 15, avaliable: true },
                { hour: 16, avaliable: true },
                { hour: 17, avaliable: false },
            ]),
        );
    });
});
