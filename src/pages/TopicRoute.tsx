import { Navigate, useParams } from 'react-router-dom'
import { TOPIC_BY_SLUG } from '@/topics'
import { TopicPage } from '@/components/docs/TopicPage'

export function TopicRoute() {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/" replace />
  const topic = TOPIC_BY_SLUG[slug]
  if (!topic) return <Navigate to="/" replace />
  return <TopicPage topic={topic} />
}
