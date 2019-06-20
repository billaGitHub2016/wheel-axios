import { processHeaders, parseHeaders } from '../../../src/helpers/header'

describe('helpers:header', () => {
  describe('processHeaders', () => {
    test('should return json content type while data is plain object', () => {
      const headers: any = {
        'content-type': '123',
        'content-length': 1
      }
      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
      expect(headers['content-type']).toBeUndefined()
      expect(headers['content-length']).toBe(1)
    })
    test('should normalize content-type', () => {
      const headers: any = {
        'content-type': '123',
        'content-length': 1
      }
      processHeaders(headers, null)
      expect(headers['Content-Type']).toBe('123')
    })
    test('should not normalize content-type while header is undefined', () => {
      const headers = processHeaders(undefined, null)
      expect(headers).toBeUndefined()
    })
  })

  describe('parseHeaders', () => {
    test('should parse header string to object', () => {
      const headerStr = `date: Fri, 05 Apr 2019 12:40:49 GMT\r\n
        etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"\r\n
        connection: keep-alive\r\n
        x-powered-by: Express\r\n
        content-length: 13\r\n
        content-type: application/json; charset=utf-8`
      const header = parseHeaders(headerStr)
      expect(header.date).toBe('Fri, 05 Apr 2019 12:40:49 GMT')
      expect(header['content-length']).toBe('13')
    })
    test('should filter the header without key', () => {
      const headerStr = `date: Fri, 05 Apr 2019 12:40:49 GMT\r\n
        etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"\r\n
        connection: keep-alive\r\n
        x-powered-by: Express\r\n
        content-length:\r\n
         : application/json; charset=utf-8`
      const header = parseHeaders(headerStr)
      console.log('----------------------------------- header = ', header)
      expect(header.date).toBe('Fri, 05 Apr 2019 12:40:49 GMT')
      expect(header['content-length']).toBe('')
      expect(header['content-type']).toBeUndefined()
    })
    test('should return undefined while header is empty string', () => {
      const headerStr = ''
      const header = parseHeaders(headerStr)

      expect(header).toBeUndefined()
    })
  })
})
