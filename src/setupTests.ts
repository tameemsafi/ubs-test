// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import data from '../data.json'
import '@testing-library/jest-dom'

const server = setupServer(
  rest.get('/data', (req, res, ctx) => {
    return res(ctx.json(data))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
