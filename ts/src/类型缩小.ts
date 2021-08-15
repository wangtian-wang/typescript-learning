type IdType = number | string
function printId(id: IdType) {
                if (typeof id === 'string') {  // 类型保护
        console.log(id.length);
    } else {
        Math.abs(id)
    }
}