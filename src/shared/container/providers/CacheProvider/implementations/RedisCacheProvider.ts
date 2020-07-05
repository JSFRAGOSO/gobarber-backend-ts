import Redis, { Redis as RedisType } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisType;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: string): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const response = await this.client.get(key);

        if (!response) return null;

        return JSON.parse(response) as T;
    }

    public async invalitade(key: string): Promise<void> {
        console.log(key);
    }

    public async invalitadeAllByPrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);
        console.log(keys);
        const pipeline = await this.client.pipeline();

        keys.forEach(key => pipeline.del(key));

        await pipeline.exec();
    }
}
