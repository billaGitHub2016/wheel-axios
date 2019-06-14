import { isDate, isPlainObject } from '../../../src/helpers/utils'

describe('helpers.utils', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    test('should validate Object', () => {
      expect(isPlainObject({ a: 1 })).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
  })
})
