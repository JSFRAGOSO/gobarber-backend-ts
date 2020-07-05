import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from '../ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
        fakeAppointmentsRepository,
        fakeCacheProvider,
    );
    fakeUsersRepository = new FakeUsersRepository();
});

describe('ListProviderAppointmentsService', () => {
    it('should be able to list the appointments on a specific day', async () => {
        const provider = await fakeUsersRepository.create({
            name: 'Provider',
            email: 'provider@example.com',
            password: '123456',
        });

        const appointment1 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 14, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });
        const appointment2 = await fakeAppointmentsRepository.create({
            date: new Date(2020, 5, 20, 17, 0, 0),
            provider_id: provider.id,
            user_id: '123456',
        });

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 20, 11).getTime();
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: provider.id,
            month: 6,
            year: 2020,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
