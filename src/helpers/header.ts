import { isPlainObject } from './utils'

function normalizedHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      // 使用 normalizedName 替换 name
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 处理 Content-Type
  normalizedHeaderName(headers, 'Content-Type')

  // data为普通对象的情况下，设置Content-Type为application/json;charset=utf-8
  if (isPlainObject(headers)) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return headers
}
