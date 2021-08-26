interface IPerson {
  name: string
  age: number
  height: number
}

const info = {   // 类型推导
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

// 代码会报错
/*    
p 的类型 如果没有注解为 Iperson 那么会自动进行类型推导  否则 有确定的类型就一定的实现这个接口类型
const p: IPerson = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}
*/


/*   info是对象的引用 这样做 等于 将对象的引用赋值给 p  
     freshness擦除 :
        只要info 对象 部分实现了接口Iperson ，那多余的属性会被擦出掉
        ts 只要能检测到类型 就不会报错

*/
const p: IPerson = info

console.log(info)
console.log(p)


function printInfo(person: IPerson) {
  console.log(person)// 但是adress这个属性依旧 不能读取  ts 会推导 IPerson  上面没有这个属性
}


const info1 = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

printInfo(info1)

export {}