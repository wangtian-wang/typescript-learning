/**
  这样写 { length: number}这个意思是 接口规范了使用接口的 调用者 必须要有 length 属性 并且 这个length属性是number吗？
 */



interface ILength {
  length: number
}

function getLength<T extends ILength>(arg: T) {
  return arg.length
}

getLength("abc")
getLength(["abc", "cba"])
getLength({length: 100})
