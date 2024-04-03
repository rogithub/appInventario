import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
//https://github.com/honojs/middleware/tree/main/packages/esbuild-transpiler
import { esbuildTranspiler } from '@hono/esbuild-transpiler/node'

const app = new Hono()

app.use(
  '/static/*',
  serveStatic({
    root: './',
    onNotFound: (path, c) => {
      console.log(`${path} is not found, request to ${c.req.path}`)
    },
  })
)

app.get('/', serveStatic({ path: '/static/index.html' }));

app.get('/static/scripts/**/:scriptName{.+.tsx?}', esbuildTranspiler())

export default app
