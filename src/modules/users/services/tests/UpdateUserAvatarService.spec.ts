import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
    it(`should be able to update user's avatar`, async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvder = new FakeStorageProvider();

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            password: '123456',
            email: 'jonasfragoso@rocketseat.com.br',
        });

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvder,
        );

        const response = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: '3be261484f39ff7253fe-image.png',
        });

        expect(response).toHaveProperty('avatar');
    });

    it(`should not be able to update user's avatar when user does not exists`, async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvder = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvder,
        );

        await expect(
            updateUserAvatarService.execute({
                user_id: 'non-existing-user',
                avatarFilename: '3be261484f39ff7253fe-image.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it(`should be able to update user's avatar when user already have an avatar`, async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvder = new FakeStorageProvider();

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            password: '123456',
            email: 'jonasfragoso@rocketseat.com.br',
        });

        const deleteFile = jest.spyOn(fakeStorageProvder, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvder,
        );

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: '3be261484f39ff7253fe-image.png',
        });
        const response = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'updated-image.png',
        });

        expect(response).toHaveProperty('avatar');
        expect(deleteFile).toHaveBeenCalledWith(
            '3be261484f39ff7253fe-image.png',
        );
        expect(response.avatar).toBe('updated-image.png');
    });
});
