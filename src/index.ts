import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bindUrl } from './helpers/url'
import { transfromRequest } from './helpers/data'
import { processHeaders } from './helpers/header'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformHeader(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bindUrl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transfromRequest(config.data)
}

function transformHeader(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
