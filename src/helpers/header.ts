import { isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if (key !== normalizeName && key.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[key]
      delete headers[key]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  return headers
}

/**
 * 把服务器返回的headers字符串转换为对象
 * @param headers 服务器返回的headers字符串
 * headers e.g.
 * 'date: Fri, 05 Apr 2019 12:40:49 GMT\r\n
    etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"\r\n
    connection: keep-alive\r\n
    x-powered-by: Express\r\n
    content-length: 13\r\n
    content-type: application/json; charset=utf-8'
 */
export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)

  if (!headers) {
    return
  }

  headers.split('\r\n').forEach(header => {
    let [key, ...val] = header.split(':')
    key = key.trim().toLowerCase()

    if (!key) {
      return
    }
    let value = undefined
    if (val) {
      value = val.join(':').trim()
    }
    parsed[key] = value
  })

  return parsed
}
