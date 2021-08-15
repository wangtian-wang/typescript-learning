export interface IAccount {
  name: string
  passward: number
}
export interface ILoginResult {
  id: number
  name: string
  token: string
}
export interface IDataType<T = any> {
  code: number
  data: T
}
