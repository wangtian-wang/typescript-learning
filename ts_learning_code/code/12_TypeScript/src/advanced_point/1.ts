/**
 * 类型保护  类型断言 的区别 使用场景
 *
 */
const valueList = [123, "abc"];
const getRandomValue = () => {
  const number = Math.random() * 10;
  if (number < 5) {
    return valueList[0];
  } else {
    return valueList[1];
  }
};
const item = getRandomValue();
// 报错
if (item.length) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// 类型断言 as 后面是明确的类型 缺点： 太麻烦
if ((item as string).length) {
  console.log((item as string).length);
} else {
  console.log((item as number).toFixed());
}
// typeof  能精确的判断类型  但是只有使用 == 或者 ！==  去精确判断两种类型是和否相等
// 但是typeof 出来的值只能是一下几种  string number boolean symbol
if (typeof item === "string") {
  console.log(item.toString());
} else {
  console.log(item.toFixed());
}
// 使用类型保护 适用于复杂的代码逻辑 返回值的类型为     boolean 也是OK的
function isString(value: number | string): value is string {
  return typeof value === "string";
}
// 确定代码块if里面的类型  else就是其他的类型  ts进行类型的推断  只要能准确推断TODO 编译就通过
if (isString(item)) {
  console.log("is string");
} else {
  console.log("is number");
}
// instanceof

// null undefined 是所有类型的子类型 意思是 声明一个变量 当没有给定类型时 ts 会自动推断类型 ；这个时候 可以将已经赋值的变量赋值为null 或者undefined

// null 和undefined 是严格区分的
// null undefined 是两种不同的类型   string | null | undefined  是单独的类型

// 编译器无法识别嵌套函数的null 所以需要手动处理

function getStr(str: number | null): string {
  function getRes(prefix: string) {
    return prefix + str.toFixed().toString();
  }
  str = str || 0.1;
  return getRes("lion-");
}
getStr(123);

function getStr1(str: number | null): string {
  function getRes(prefix: string) {
    return prefix + str!.toFixed().toString();
  }
  str = str || 0.1;
  return getRes("lion-");
}
getStr1(123);

// 类型别名
type StringType = string;
type PositionType<T> = { a: T; b: T };
// 泛型的使用： 1 先确定T的类型，根据类型给变量赋值
const positionLeft: PositionType<number> = {
  a: 1,
  b: 2,
};
const positionRight: PositionType<string> = {
  a: "a",
  b: "b",
};

// 类型别名只能将类型别名自己  作为属性值来使用自己 否则就会报错
type Animals<T> = {
  food: T;
  children?: Animals<T>;
};

let dog: Animals<string> = {
  food: "meat",
  children: {
    food: "meat",
  },
};

//当接口 使用类型别名时 不能使用 extends implements

// 类型别名 有时候和 接口可以兼容 仅仅当定义的类型成员相同时

// 字面量类型 指定类型为一个具体的值
// 字符串字面量 和字符串字面量类型并不相同

// 字符串字面量包括 数字字符串 | 字符串字面量
// 字符串字面量
type Name = "per";
const person: Name = "per";
const person1: Name = "perper";

// 可辨识联合 要点 定义的每个interface 需要有 一个相同的属性 type 2： type shape = SquareInterface | Rectangle 3实现一个根据type去判断返回shape面积的函数

/*完整性检查 */
//  strictullChecks  指定返回值类型 会自动检查有那种type没有被检查到
// 使用never类型;
//  当一个函数返回值为错误 或者不可能有返回值的时候 可以使用never

interface SquareInterface {
  type: "square";
  width: number;
}
interface Rectangle {
  type: "rectangle";
  width: number;
  heigth: number;
}
interface Circle {
  type: "circle";
  radius: number;
}

type Shape = SquareInterface | Rectangle | Circle;
function assertNever(value: never): never {
  throw new Error("unexpected error");
}
function getArea(shape: Shape): number {
  switch (shape.type) {
    case "square":
      return shape.width * shape.width;
      break;
    case "rectangle":
      return shape.heigth * shape.width;
      break;
    case "circle":
      return Math.PI * shape.radius ** 2;
      break;
    default:
      return assertNever(shape); // 编译阶段提醒我们 没有判断到的情况
  }
}
