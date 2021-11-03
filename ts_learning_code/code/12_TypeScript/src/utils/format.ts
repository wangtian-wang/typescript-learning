/**
   命名空间 用 namespace 来声明
   命名空间内部的函数或者方法 必须使用export导出 才能在其他的模块里面使用
    在其他模块里面使用的方式为 import { 关键字定义的命名空间的名字} from 'path'


 */





export namespace time {
  export function format(time: string) {
    return "2222-02-22"
  }

  export function foo() {

  }

  export let name: string = "abc"
}

export namespace price {
  export function format(price: number) {
    return "99.99"
  }
}

