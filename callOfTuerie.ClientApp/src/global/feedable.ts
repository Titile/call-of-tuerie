function deepMerge(target: any, source: any) {
  const isObject = (obj: any) => obj && typeof obj === 'object'

  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (targetValue && targetValue['getNew']) {
      sourceValue.forEach((x: any) => {
        const item = target[key].getNew(x)
        target[key].push(item)
      })
    } else if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign(targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

export default class Feedable {
  public feed(options?: any) {
    if (options) deepMerge(this, options)
  }

  public feedObject(target: any, source: any) {
    deepMerge(target, source)
  }
}
