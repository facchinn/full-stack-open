const url = process.env.HEALTHCHECK_URL

if (!url) {
  console.log('HEALTHCHECK_URL is not configured; skipping the external health check.')
  process.exit(0)
}

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 15_000)

try {
  const response = await fetch(url, { signal: controller.signal })
  if (!response.ok) throw new Error(`health check returned ${response.status}`)
  console.log(`health check passed: ${url}`)
} finally {
  clearTimeout(timeout)
}
