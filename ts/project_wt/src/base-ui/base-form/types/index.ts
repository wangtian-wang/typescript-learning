type IInputType = 'text' | 'password' | 'select' | 'datepicker'
// 定义el-form-item 上面绑定的属性  到时候可以使用 v-bind直接绑定在el-form-item 上面

export interface IFromItem {
  field: string
  type: IInputType
  label: string
  rules?: any[]
  placeholder?: string
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
  cssStyle?: any
}
// 定义 el-form  上面绑定的属性  到时候可以使用 v-bind直接绑定在el-form-上面

export interface IBaseForm {
  formItems: IFromItem[]
  labelWidth?: string
  colLayout?: any
  itemStyles?: any
  labelPosition?: any
}
