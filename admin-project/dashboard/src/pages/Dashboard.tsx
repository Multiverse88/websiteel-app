import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { api } from '../lib/api'
import StatCard from '../components/StatCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ articles: 0, contacts: 0, newsletter: 0, landingPages: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [articles, contacts, newsletter, landingPages] = await Promise.allSettled([
          api.getArticles(),
          api.getContacts(),
          api.getNewsletter(),
          api.getLandingPages(),
        ])
        setStats({
          articles: articles.status === 'fulfilled' ? (Array.isArray(articles.value) ? articles.value.length : 0) : 0,
          contacts: contacts.status === 'fulfilled' ? (Array.isArray(contacts.value) ? contacts.value.length : 0) : 0,
          newsletter: newsletter.status === 'fulfilled' ? (Array.isArray(newsletter.value) ? newsletter.value.length : 0) : 0,
          landingPages: landingPages.status === 'fulfilled' ? (Array.isArray(landingPages.value) ? landingPages.value.length : 0) : 0,
        })
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="page">
      <div className="page-welcome">
        <h2>Welcome back, {user?.username}</h2>
        <p>Here is an overview of your content.</p>
      </div>
      <div className="stat-grid">
        <StatCard title="Total Articles" value={loading ? '...' : stats.articles} icon="📝" />
        <StatCard title="Contacts" value={loading ? '...' : stats.contacts} icon="✉️" />
        <StatCard title="Newsletter Subscribers" value={loading ? '...' : stats.newsletter} icon="📰" />
        <StatCard title="Landing Pages" value={loading ? '...' : stats.landingPages} icon="🌐" />
      </div>
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <a href="#/articles" className="btn btn--outline">New Article</a>
          <a href="#/landing-pages" className="btn btn--outline">New Landing Page</a>
          <a href="#/redirects" className="btn btn--outline">Add Redirect</a>
          <a href="#/contacts" className="btn btn--outline">View Contacts</a>
        </div>
      </div>
    </div>
  )
}
