import { ILoginState } from './login/login-type'

export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState
}
export type IStoreType = IRootState & IRootWithModule
