import { axios } from '../index'
import { IAccount, ILoginResult, IDataType } from './login-type'
enum LoginApi {
  LoginInfo = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLogin(account: IAccount) {
  return axios.post<IDataType<ILoginResult>>({
    url: LoginApi.LoginInfo,
    data: account
  })
}
export function userInfo(id: number) {
  return axios.get<IDataType>({
    url: LoginApi.UserInfo + id,
    showLoading: false
  })
}
export function userMenu(id: number) {
  return axios.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu',
    showLoading: false
  })
}
