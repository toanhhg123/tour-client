import { Router } from 'express'
import * as client from 'prom-client'

const register = new client.Registry()
register.setDefaultLabels({
  app: 'agent-service'
})

const httpRequestTimer = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000]
})

client.collectDefaultMetrics({ register })

const router = Router()

router.get('/metrics', function (req, res) {
  res.setHeader('Content-Type', register.contentType)

  register.metrics().then((data) => res.status(200).send(data))
})

router.get('/tweets', async (req, res) => {
  const start = Date.now()
  try {
    console.log('performent running')
  } finally {
    const responseTimeInMs = Date.now() - start
    httpRequestTimer
      .labels(req.method, req.route.path, res.statusCode.toString())
      .observe(responseTimeInMs)
  }
})

export default router
