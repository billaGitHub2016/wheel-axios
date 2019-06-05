import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, method = 'get', url, params } = config
  const request = new XMLHttpRequest()

  request.open(method, url)

  request.send(data)
}
