export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>;
    recover<T>(key: string): Promise<T | null>;
    invalitade(key: string): Promise<void>;
    invalitadeAllByPrefix(prefix: string): Promise<void>;
}
