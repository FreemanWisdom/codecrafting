import { useOutletContext } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import SEO from '../components/SEO'

function AdminPage() {
  const { user } = useOutletContext()

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Manage CodingGroups site content, projects, and moderation."
        url="/admin"
        noIndex={true}
      />
      <AdminDashboard user={user} />
    </>
  )
}

export default AdminPage
