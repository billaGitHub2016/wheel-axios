import { isDate, isPlainObject } from './utils'

function encode(val: string): string {
  const encodeStr = encodeURIComponent(val)
  return encodeStr
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bindUrl(url: string, params?: any): string {
  let bindUrl = url

  // 删除#的部分
  const markIndex = url.indexOf('#')
  if (markIndex !== -1) {
    bindUrl = bindUrl.slice(0, markIndex)
  }
  if (params) {
    let parts: string[] = []

    const keys = Object.keys(params)
    keys.forEach(key => {
      let value = params[key]

      let values: string[]
      if (Array.isArray(value)) {
        values = value
        key = `${key}[]`
      } else {
        values = [value]
      }

      values.forEach(item => {
        if (item === null || typeof item === 'undefined') {
          return
        }
        if (isDate(item)) {
          item = item.toDateString()
        } else if (isPlainObject(item)) {
          item = JSON.stringify(item)
        }
        parts.push(`${encode(key)}=${encode(item)}`)
      })
    })

    let serializedParams = parts.join('&')
    if (serializedParams) {
      bindUrl += (bindUrl.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  }
  return bindUrl
}

interface URLOrigin {
  protocol: string
  host: string
}

/**
 * 检查请求url是否同源的方法
 * @param requestURL 请求的url
 */
export function isURLSameOrigin(requestURL: string) {
  const requestUrlOrigin = resolveURL(requestURL)

  return (
    requestUrlOrigin.protocol === currentOrigin.protocol &&
    requestUrlOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
