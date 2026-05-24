const BASE = import.meta.env.VITE_API_URL || '/api'

async function get(path) {
  const res = await fetch(`${BASE}${path}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const api = {
  stats:        () => get('/stats'),
  courses:      () => get('/courses'),
  experiments:  () => get('/courses/experiments'),
  experiment:   (id) => get(`/courses/experiments/${id}`),
  faq:          () => get('/faq'),
  testimonials: () => get('/testimonials'),
  elements:     (params = '') => get(`/elements${params}`),
  element:      (n) => get(`/elements/${n}`),
  courseDetail: (id) => get(`/courses/${id}/chapters`),
  lesson:       (id) => get(`/courses/lessons/${id}`),
}
