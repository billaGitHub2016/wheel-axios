import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bindUrl } from './helpers/url'
import { transfromRequest } from './helpers/data'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bindUrl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transfromRequest(config.data)
}

export default axios
