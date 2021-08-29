import { IBaseForm } from '@/base-ui/base-form'

export const dialogFormConfig: IBaseForm = {
  title: '新建用户',
  formItems: [
    {
      field: 'name',
      type: 'text',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'text',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      rules: [{ required: true }]
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    { field: 'cellphone', type: 'text', label: '电话号码', placeholder: '请输入电话号码' },
    { field: 'roleId', type: 'select', label: '选择角色', placeholder: '请选择角色', options: [] },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    }
  ],
  colLayout: { span: 24 },
  labelPosition: 'right'
}
