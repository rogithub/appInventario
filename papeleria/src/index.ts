import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

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
app.get('/sw.js', serveStatic({ path: '/static/sw.js' }));


export default app
