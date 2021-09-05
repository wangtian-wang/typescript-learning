import { coordinateData } from './coordinate-data'
export function covertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCord = coordinateData[data[i].name]
    if (geoCord) {
      res.push({
        name: data[i].name,
        value: geoCord.concat(data[i].value)
      })
    }
  }
  return res
}
