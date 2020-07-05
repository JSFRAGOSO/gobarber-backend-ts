import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from '../ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
        fakeUsersRepository,
        fakeCacheProvider,
    );
});

describe('ListProviders', () => {
    it('should be able to list providers', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            password: '123456',
            email: 'johndoe@example.com',
        });

        const provider = await fakeUsersRepository.create({
            name: 'Provider',
            password: '123456',
            email: 'provider@example.com',
        });
        const provider2 = await fakeUsersRepository.create({
            name: 'Provider2',
            password: '123456',
            email: 'provider2@example.com',
        });
        const appoinntment = await listProvidersService.execute({
            user_id: user.id,
        });

        expect(appoinntment).toMatchObject([provider, provider2]);
    });
});
