import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

app.use(
  '/*',
  serveStatic({
    root: './static',
    onNotFound: (path, c) => {
      console.log(`${path} is not found, request to ${c.req.path}`)
    },
  })
)

app.get('/', serveStatic({ path: '/index.html' }));
app.get('/sw.js', serveStatic({ path: '/sw.js' }));


export default app
