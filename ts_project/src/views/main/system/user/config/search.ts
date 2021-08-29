import { IBaseForm } from '@/base-ui/base-form/types/index'
export const formConfig: IBaseForm = {
  labelWidth: '120px',
  itemStyles: {
    padding: '10px'
  },
  formItems: [
    // {
    //   field: 'id',
    //   type: 'text',
    //   label: 'ID',
    //   placeholder: '请输入用户ID'
    // },
    {
      field: 'name',
      type: 'text',
      label: '用户姓名 :',
      placeholder: '请输入用户名',
      rules: [{ required: true }]
    },
    {
      field: 'realname',
      type: 'text',
      label: '真实姓名 :',
      placeholder: '请输入真实姓名',
      rules: [{ required: true }]
    },
    {
      field: 'cellphone',
      type: 'text',
      label: '手机号码',
      placeholder: '请输入手机号码',
      rules: []
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      rules: [],
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    // {
    //   field: 'sport',
    //   type: 'select',
    //   label: '喜欢的运动',
    //   placeholder: '请选择喜欢的运动',
    //   options: [
    //     { title: '篮球', value: 'basketball' },
    //     { title: '足球', value: 'football' }
    //   ]
    // },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  colLayout: { span: 24 },
  labelPosition: 'right'
}
