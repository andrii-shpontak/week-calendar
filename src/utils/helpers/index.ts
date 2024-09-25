export const cloneObject = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const isNotEqual = <T>(obj1: T, obj2: T): boolean => {
  return JSON.stringify(obj1) !== JSON.stringify(obj2)
}
