import breakpoint from '../dist/breakpoint.esm'

test('module import as function', () => {
    expect(typeof breakpoint).toBe('function')
})