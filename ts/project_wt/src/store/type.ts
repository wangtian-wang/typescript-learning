import { ILoginState } from './login/login-type'

export interface IRootState {
  name?: string
  age?: number
  infoObj?: {
    counter: {
      number: number
    }
  }
}
export interface IRootWithModule {
  login: ILoginState
}
export type IStoreType = IRootState & IRootWithModule
