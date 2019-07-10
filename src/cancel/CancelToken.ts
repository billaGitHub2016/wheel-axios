import { CancelExcutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  // promise 是关键，用于创建一个pending状态的promise，promise被resolve后，执行取消请求的操作
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(excutor: CancelExcutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    excutor(message => {
      // this.reason存在表示取消请求函数已被调用，return
      if (this.reason) {
        return
      }

      // 调用resolvePromise方法，this.promise变为resolve状态
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      token,
      cancel
    }
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
