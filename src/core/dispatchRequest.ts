import { AxiosRequestConfig, AxiosPromise, AxiosResponseConfig } from '../types'
import xhr from './xhr'
import { bindUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/header'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 在请求前就已被取消，则抛出取消reason
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.headers = flattenHeaders(config.headers, config.method!)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bindUrl(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(response: AxiosResponseConfig) {
  const { data } = response
  response.data = transformResponse(data)
  return response
}
