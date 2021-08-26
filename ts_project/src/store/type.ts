import { ILoginState } from './login/login-type'

export interface IRootState {
  name?: string
  age?: number
  rolesArray?: any[]
  rolesMenus?: any[]
  department?: any[]
}
export interface IRootWithModule {
  login: ILoginState
}
export type IStoreType = IRootState & IRootWithModule
