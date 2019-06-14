import { bindUrl } from '../../../src/helpers/url'

describe('helpers.url', () => {
  describe('bindUrl', () => {
    test('should support null param', () => {
      expect(bindUrl('/foo')).toBe('/foo')
    }),
      test('should support params', () => {
        expect(bindUrl('/foo', { a: 1, b: 2 })).toBe('/foo?a=1&b=2')
      })

    test('should ignore null or undefinded params', () => {
      expect(bindUrl('/foo', { a: 1, b: null, c: undefined, d: 2 })).toBe('/foo?a=1&d=2')
    })

    test('should support special character', () => {
      expect(
        bindUrl('/foo', {
          a: '@',
          b: ':',
          c: '$',
          d: ',',
          e: '+',
          f: '[',
          g: ']'
        })
      ).toBe('/foo?a=@&b=:&c=$&d=,&e=%2B&f=[&g=]')
    })

    test('should support Array params', () => {
      expect(bindUrl('/foo', { arr: [1, 2, 3] })).toBe('/foo?arr[]=1&arr[]=2&arr[]=3')
    })

    test('should support Date params', () => {
      const now = new Date()
      expect(bindUrl('/foo', { date: now })).toBe(
        `/foo?date=${now.toDateString()}`.replace(/ /g, '+')
      )
    })

    test('should remove hash', () => {
      expect(bindUrl('/foo#bar')).toBe('/foo')
    })

    test('should support plain object params', () => {
      const plainObj = {
        bar: 1
      }
      expect(
        bindUrl('/foo', {
          a: plainObj
        })
      ).toBe(`/foo?a=${encodeURI(JSON.stringify(plainObj))}`)
    })

    test('should support url with params', () => {
      expect(bindUrl('/foo?a=1', { b: 2 })).toBe('/foo?a=1&b=2')
    })

    test('should support empty params', () => {
      expect(bindUrl('/foo', {})).toBe('/foo')
    })
  })
})
