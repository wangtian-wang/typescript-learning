/**
    给接口默认类型
 */


interface IPerson<T1 = string, T2 = number> {
  name: T1
  age: T2
}

const p: IPerson = {
  name: "why",
  age: 18
}

/**
  这样的写法会报错 ： 因为对象不能自己推导出类型
 interface Person<T1, T2> {
    name: T1
    age: T2
  }
  
  const p1: Person = {
    name: "why",
    age: 18
  }
 */
export {}
