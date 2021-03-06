export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>
    recover<T>(ker: string): Promise<T | null>
    invalidate(key: string): Promise<void>
    invalidatePrefix (previx: string): Promise<void>
}