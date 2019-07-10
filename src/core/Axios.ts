import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosInceptorManager,
  AxiosResponseConfig,
  ResolveFn,
  RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './IncetporManager'
import mergeConfig from './mergeConfig'

interface interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponseConfig>
}

interface PromiseChain {
  resolved: ResolveFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig

    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponseConfig>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      // 后push的拦截器先执行，这里用unshift使后面的拦截器排在chain的前面
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      // 先push的拦截器先执行
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length > 0) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
