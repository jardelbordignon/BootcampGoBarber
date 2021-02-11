export default interface ICacheProvider {

  set(key: string, value:any): Promise<void>
  get<T>(key: string): Promise<T | null>
  remove(key: string): Promise<void>
  removePrefix(prefix: string): Promise<void>

}
