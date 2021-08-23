import { IBaseForm } from '@/base-ui/base-form'

export const dialogFormConfig: IBaseForm = {
  formItems: [
    {
      field: 'name',
      type: 'text',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'text',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 },
  itemStyles: {}
}
