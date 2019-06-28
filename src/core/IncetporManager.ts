import { ResolveFn, RejectFn } from '../types'

interface Inceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}

export default class InceptorManager<T> {
  private interceptor: Array<Inceptor<T> | null>

  constructor() {
    this.interceptor = []
  }

  /**
   * use方法，返回当前拦截器的下标
   * @param resolve
   * @param reject
   */
  use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
    this.interceptor.push({
      resolved,
      rejected
    })
    return this.interceptor.length - 1
  }

  /**
   * 根据传入的拦截器下标删除拦截器
   * @param id 拦截器下标
   */
  eject(id: number): void {
    if (this.interceptor[id]) {
      this.interceptor[id] = null
    }
  }

  /**
   * 遍历this.interceptors并执行fn回调函数
   * @param fn
   */
  forEach(fn: (interceptor: Inceptor<T>) => void): void {
    this.interceptor.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
