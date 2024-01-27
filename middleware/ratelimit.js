const { rateLimit } = require('express-rate-limit')

const limiterForNoAuth = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.url === '/api/reset',
})

const limiterForAuthApi = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.url === '/api/reset',
	keyGenerator: (req, res) => req.authUser.username
})

module.exports = {
    limiterForNoAuth,
	limiterForAuthApi
}