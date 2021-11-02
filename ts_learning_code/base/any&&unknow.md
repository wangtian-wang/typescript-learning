```js
any :  可以赋值给任意类型
unknow : 只能赋值给unknow 类型


```

## any unknow null 的关系

> any 是没有类型 不能进行类型推导

> unknow 是不明确类型 可以进行类型推断

```js
let name: string = 'bob';
let pname: number =name as unknow as number
跨类型之间的转换可以使用unknown作为中间桥梁

let name: unknow = '123'
let pname :string = name
不能将name直接赋值使用 会报错 unknown 不能赋值给string类型
let pname:string = name as string
```

## AS

> as 后面跟具体的类型

## 在获取元祖的元素信息时，能自动的推导出元素的类型
