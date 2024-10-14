import breakpoint from '../dist/module.esm'

test('module import as function', () => {
  expect(typeof breakpoint).toBe('function')
})
