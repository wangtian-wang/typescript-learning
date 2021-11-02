## void

     let name :void = undefined| null 是合法的 除此之外 不能再赋值为其他类型

     function get():void{

     }
     函数的返回值是undefined

     function get():void | string{
         return null | undefined | 'string'
     }
     void作为函数的返回值 函数可以返回的类型为 null ， string

## never

    常用于函数内部发生了错误 等 函数体的代码不能完全执行完毕
    啥都不返回

## null undefined

> 默认情况下 undefined null 可以作为其他类型的值
> strictNullCheck 修改配置项开启严格的 null 检查

## 类型推断

    可以根据值类型推断变量的类型约束
    可以根据上下文推断等号右面的内容
        window.onmousedown = (e) => {
            console.log(e) e会被推断为 MouseEvent类型
        }

## 类型兼容性

```js
interface IInfo {
  name: string;
  cars: {
    name: string,
  };
}
let p: IInfo;

const obj = { name: "lucy", cars: { name: "benz" } ,gender: 'female};

p = obj  编译通过

接口会深度递归检查 变量的值 是否符合接口的定义，属性少则报错，多了属性不报错
```

## 函数的兼容性

> 参数个数

```js
let x = (a: number) => 0;
let y = (b: string, c: boolean) => 0;

y = x 编译OK
x = y 编译失败;
等号右边的参数个数 < 左边的参数个数
```

> 参数类型

1. 参数类型不相同 函数之间不能赋值

> 可选参数和剩余参数

1. 函数定义中 参数位置出现了...的用法 函数调用的时候也必须使用这种用法 但是确保函数的参数 arr 不是数组 return cb(...arr)

```js
const getSum = (arr: number[], cb: (...argus: number[]) => number) :number){
    return cb(...arr)
};

const res = getSum([1,2,3],(...argus: number[]): number => {
    return argus.reduce((prev,next) => {
        return prev + next
    },0)
})
```

> 参数参数双向协变

1. 若两个函数的参数类型相同，那这两个函数可以相互赋值

```js
let funA = (arg: number | string): void => {};
let funB = (arg: number): void => {};
funA = funB;
funB = funA;
```

## 返回值类型

1. 返回值类型是联合类型 = 返回值类型是单一类型
2. 返回值类型是单一类型 =/= 返回值类型是联合类型
3. 等号左边的函数参数返回值类型 包含 等号右边的函数参数返回值类型 赋值成功

```js
let x = (): string | number => 0;
let y = (): string => 0;
x = y   ok ;
y = x   error;
```

## 函数重载

1. 函数实现体的函数重载个数相同，那这两个函数可以相互赋值

```js
function fn(arg1:number,arg2: number):number;
function fn1(arg1:string,arg2:string):string;
function fnn(arg1:any,arg2:any){
    return arg1 + arg2

function foo(arg1:number,arg2: number):number;
function foo1(arg1:any,arg2:any){
    return arg1 + arg2
}

const func = fnn;
fnn = foo1 报错 fnn 两个函数重载体 foo1有一个函数重载体
```

## 枚举

## 数字枚举类型只和数字类型的值兼容 和其他枚举类型都不兼容

```js
enum status {
    on,
    off
}
enum fruit{
    apple,
    peach
}

let s = status.on;
s = fruit.apple 报错
```

## 类

1. 比较两个类型为类的值的兼容性的时候，只比较类的实例成员，类的静态属性构造函数等不比较

```js
 class PeopleClass {
     public static age: number
     constructor(public name:string){}
 }
  class animalClass {
     public static age:string
     constructor(public name:string){}
 }
  class FoodClass {

     constructor(public name:boolean){}
 }
 let animal : animalClass;
 let people : PeopleClass;
 let food:FoodClass
 animal = people  ok ;
 animal = food  失败 实例上的name属性类型不相同

```

2. 私有成员 priviate protected

```js
class peopleClass {
    private age: number
    constructor(){}
}
class otherClass {
    private age: number
    constructor(){}
}
class childClass extends peopleClass {
    constructor(){
        super()
    }
}

const children : peopleClass = new childClass()  ok ;
const other:peopleClass = new otherClass()   报错 因为构造器没有相同的属性


```

## 泛型

```js
interface Data<T> {}
let data1: Data<number>;
let data2: Data<string>;

data1 = data2  ok

interface Data<T> {
    data: T
}
let data1: Data<number>;
let data2: Data<string>;

data1 = data2  报错 属性data不兼容
```

> 参数个数
> 参数个数
> 参数个数
