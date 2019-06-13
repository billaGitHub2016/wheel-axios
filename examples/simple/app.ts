import axios from '../../src/index'

axios({
    method: 'get',
    url: '/simple/get',
    params: {
        a: 1,
        b: 2
    }
})

// params是数组
axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: [1, 2, 3],
        b: 2
    }
})

// params是日期
axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: new Date(),
        b: 2
    }
})

// params是对象
axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: {
            c: 1,
            d: 2,
        },
        b: 2
    }
})

// params是特殊字符
axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: '@:$',
        b: 2
    }
})

axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2,
    }
})
axios({
    method: 'post',
    url: '/base/buffer',
    data: new Int32Array([21, 31])
})

axios({
    method: 'post',
    url: '/base/post',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    },
    data: {
        a: 1,
        b: 2
    }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})