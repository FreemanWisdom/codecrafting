import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { SectionBadge, StatusMessage, SummaryCard, LoadingState, ContentPanel } from './admin/DashboardUI'
import { optimizeCloudinaryImage } from '../utils/image'

import OverviewPanel from './admin/OverviewPanel'
import SiteContentManager from './admin/SiteContentManager'
import EngagementManager from './admin/EngagementManager'

const PROJECT_BUCKET_CANDIDATES = ['project-images', 'projects', 'images']

const initialProjectForm = {
  title: '',
  description: '',
  projectUrl: '',
  tech_stack: '',
  problem: '',
  solution: '',
  result: '',
  imageFile: null,
}

const sortNewestFirst = (items = []) =>
  [...items].sort((left, right) => {
    const leftDate = left?.created_at ? new Date(left.created_at).getTime() : 0
    const rightDate = right?.created_at ? new Date(right.created_at).getTime() : 0

    return rightDate - leftDate
  })

const getProjectImage = (project) => project.image_url ?? project.image ?? ''
const getProjectLink = (project) => project.project_url ?? project.link ?? ''
const formatDateTime = (value) => (value ? new Date(value).toLocaleString() : '')
const sanitizeFileName = (value) => value.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/^-+|-+$/g, '')

async function uploadProjectImage(file) {
  const extension = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'project-image'
  const safeName = sanitizeFileName(baseName) || 'project-image'
  const filePath = `projects/${Date.now()}-${safeName}.${extension}`

  let lastError = null

  for (const bucket of PROJECT_BUCKET_CANDIDATES) {
    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

    if (!error) {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath)

      return { bucket, filePath, publicUrl }
    }

    lastError = error
  }

  throw lastError ?? new Error('Unable to upload project image.')
}

async function insertProjectRecord(projectInput, imageUrl) {
  const trimmedUrl = projectInput.projectUrl.trim()
  if (!trimmedUrl) {
    throw new Error('Project URL is required before saving a project.')
  }

  const payloads = [
    {
      title: projectInput.title.trim(),
      description: projectInput.description.trim(),
      project_url: trimmedUrl,
      image_url: imageUrl,
      tech_stack: projectInput.tech_stack.trim(),
      problem: projectInput.problem.trim(),
      solution: projectInput.solution.trim(),
      result: projectInput.result.trim(),
    },
    {
      title: projectInput.title.trim(),
      description: projectInput.description.trim(),
      project_url: trimmedUrl,
      image: imageUrl, // for fallback schema
      tech_stack: projectInput.tech_stack.trim(),
      problem: projectInput.problem.trim(),
      solution: projectInput.solution.trim(),
      result: projectInput.result.trim(),
    },
  ]

  let lastError = null

  for (const payload of payloads) {
    const { data, error } = await supabase.from('projects').insert([payload]).select().single()

    if (!error) {
      return data
    }

    lastError = error
  }

  throw lastError ?? new Error('Unable to save the new project.')
}

function AdminDashboard({ user }) {
  const [projects, setProjects] = useState([])
  const [reviews, setReviews] = useState([])
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [projectFormVersion, setProjectFormVersion] = useState(0)
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)
  const [isSubmittingProject, setIsSubmittingProject] = useState(false)
  const [projectFeedback, setProjectFeedback] = useState(null)
  const [reviewFeedback, setReviewFeedback] = useState(null)
  const [activeProjectDeleteId, setActiveProjectDeleteId] = useState(null)
  const [activeReviewApproveId, setActiveReviewApproveId] = useState(null)
  const [activeReviewDeleteId, setActiveReviewDeleteId] = useState(null)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passwordFeedback, setPasswordFeedback] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const reviewCounts = useMemo(() => {
    const approved = reviews.filter((review) => Boolean(review.approved)).length

    return {
      total: reviews.length,
      approved,
      pending: reviews.length - approved,
    }
  }, [reviews])

  const projectCounts = useMemo(() => {
    const withLiveLink = projects.filter((project) => Boolean(getProjectLink(project))).length
    const withImage = projects.filter((project) => Boolean(getProjectImage(project))).length

    return {
      total: projects.length,
      withLiveLink,
      withImage,
    }
  }, [projects])

  const loadProjects = useCallback(async () => {
    setIsLoadingProjects(true)
    const { data, error } = await supabase.from('projects').select('*')
    if (error) {
      setProjectFeedback({ tone: 'error', message: error.message })
      setProjects([])
    } else {
      setProjects(sortNewestFirst(data ?? []))
    }
    setIsLoadingProjects(false)
  }, [])

  const loadReviews = useCallback(async () => {
    setIsLoadingReviews(true)
    const { data, error } = await supabase.from('reviews').select('*')
    if (error) {
      setReviewFeedback({ tone: 'error', message: error.message })
      setReviews([])
    } else {
      setReviews(sortNewestFirst(data ?? []))
    }
    setIsLoadingReviews(false)
  }, [])

  const loadWaitlistCount = useCallback(async () => {
    const { count, error } = await supabase.from('waitlist').select('*', { count: 'exact', head: true })
    if (!error) setWaitlistCount(count || 0)
  }, [])

  useEffect(() => {
    loadProjects()
    loadReviews()
    loadWaitlistCount()
  }, [loadProjects, loadReviews, loadWaitlistCount])

  const handleProjectInputChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'imageFile') {
      setProjectForm((currentValue) => ({ ...currentValue, imageFile: files?.[0] ?? null }))
      return
    }
    setProjectForm((currentValue) => ({ ...currentValue, [name]: value }))
  }

  const resetProjectForm = () => {
    setProjectForm(initialProjectForm)
    setProjectFormVersion((currentValue) => currentValue + 1)
  }

  const handleAddProject = async (event) => {
    event.preventDefault()
    setProjectFeedback(null)
    const trimmedProjectUrl = projectForm.projectUrl.trim()
    if (!projectForm.title.trim() || !projectForm.description.trim() || !trimmedProjectUrl || !projectForm.imageFile) {
      setProjectFeedback({ tone: 'error', message: 'All fields are required.' })
      return
    }

    setIsSubmittingProject(true)
    let uploadedFile = null
    try {
      uploadedFile = await uploadProjectImage(projectForm.imageFile)
      const createdProject = await insertProjectRecord(projectForm, uploadedFile.publicUrl)
      setProjects((currentValue) => sortNewestFirst([createdProject, ...currentValue]))
      resetProjectForm()
      setProjectFeedback({ tone: 'success', message: 'Project saved.' })
    } catch (error) {
      if (uploadedFile?.bucket && uploadedFile?.filePath) {
        await supabase.storage.from(uploadedFile.bucket).remove([uploadedFile.filePath])
      }
      setProjectFeedback({ tone: 'error', message: error.message })
    } finally {
      setIsSubmittingProject(false)
    }
  }

  const handleDeleteProject = async (project) => {
    if (!project?.id) return
    const confirmed = window.confirm(`Delete project "${project.title}"?`)
    if (!confirmed) return
    setProjectFeedback(null)
    setActiveProjectDeleteId(project.id)
    const { error } = await supabase.from('projects').delete().eq('id', project.id)
    if (error) {
      setProjectFeedback({ tone: 'error', message: error.message })
    } else {
      setProjects((currentValue) => currentValue.filter((item) => item.id !== project.id))
      setProjectFeedback({ tone: 'success', message: 'Project deleted.' })
    }
    setActiveProjectDeleteId(null)
  }

  const handleApproveReview = async (review) => {
    if (!review?.id) return
    setReviewFeedback(null)
    setActiveReviewApproveId(review.id)
    const { error } = await supabase.from('reviews').update({ approved: true }).eq('id', review.id)
    if (error) {
      setReviewFeedback({ tone: 'error', message: error.message })
    } else {
      setReviews((currentValue) => currentValue.map((item) => (item.id === review.id ? { ...item, approved: true } : item)))
      setReviewFeedback({ tone: 'success', message: 'Review approved.' })
    }
    setActiveReviewApproveId(null)
  }

  const handleDeleteReview = async (review) => {
    if (!review?.id) return
    const confirmed = window.confirm('Delete review?')
    if (!confirmed) return
    setReviewFeedback(null)
    setActiveReviewDeleteId(review.id)
    const { error } = await supabase.from('reviews').delete().eq('id', review.id)
    if (error) {
      setReviewFeedback({ tone: 'error', message: error.message })
    } else {
      setReviews((currentValue) => currentValue.filter((item) => item.id !== review.id))
      setReviewFeedback({ tone: 'success', message: 'Review deleted.' })
    }
    setActiveReviewDeleteId(null)
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await supabase.auth.signOut()
    setIsSigningOut(false)
  }
  
  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordFeedback(null)

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ tone: 'error', message: 'Passwords do not match.' })
      return
    }

    if (newPassword.length < 6) {
      setPasswordFeedback({ tone: 'error', message: 'Password must be at least 6 characters.' })
      return
    }

    setIsUpdatingPassword(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) {
        setPasswordFeedback({ tone: 'error', message: error.message })
      } else {
        setPasswordFeedback({ tone: 'success', message: 'Password updated successfully.' })
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      setPasswordFeedback({ tone: 'error', message: 'An unexpected error occurred.' })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const TABS = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'site-content', label: 'Site Content', icon: '📝' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'engagement', label: 'Engagement', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="lg:w-72 bg-slate-950 text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-8">
          <SectionBadge tone="white">CodingGroups Admin</SectionBadge>
          <h1 className="mt-4 text-xl font-black uppercase tracking-tighter">Control Center</h1>
          <p className="mt-2 text-xs text-slate-400 font-medium">Signed in as {user?.email}</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-orange-500 text-slate-950 shadow-xl shadow-orange-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <Link to="/" className="block text-xs font-bold text-slate-500 hover:text-white transition uppercase tracking-widest">View Website →</Link>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full py-4 rounded-3xl bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-500/20 hover:text-rose-400 transition"
          >
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto max-w-6xl mx-auto w-full">
        {/* Mobile Header */}
        <div className="lg:hidden mb-8 flex items-center justify-between">
           <SectionBadge tone="orange">Admin Dashboard</SectionBadge>
           <button onClick={handleSignOut} className="text-xs font-bold uppercase text-slate-500">Sign Out</button>
        </div>

        <header className="mb-12">
           <h2 className="text-4xl font-black text-slate-950 tracking-tighter capitalize">{activeTab.replace('-', ' ')}</h2>
           <p className="mt-2 text-slate-500 font-medium tracking-tight">Manage and monitor your website's data in real-time.</p>
        </header>

        <div className="space-y-12">
          {activeTab === 'overview' && (
            <OverviewPanel 
              projectCounts={projectCounts} 
              reviewCounts={reviewCounts} 
              waitlistCount={waitlistCount}
            />
          )}

          {activeTab === 'site-content' && <SiteContentManager />}

          {activeTab === 'portfolio' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <ContentPanel
                title="Manage Portfolio"
                subtitle="Publish and organize your best work. New projects appear in the list below immediately."
                badge="Portfolio Module"
                actions={
                  <button onClick={loadProjects} className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold transition hover:bg-slate-50">Refresh</button>
                }
               >
                  <div className="grid gap-8 2xl:grid-cols-[400px_1fr]">
                    <div className="space-y-6">
                      <div className="p-6 rounded-[2.5rem] bg-orange-50/50 border border-orange-100 shadow-sm">
                        <h3 className="font-bold text-slate-950 mb-6">Create New Project</h3>
                        <form onSubmit={handleAddProject} className="space-y-4">
                           <input type="text" name="title" value={projectForm.title} onChange={handleProjectInputChange} placeholder="Project Title" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                           <input type="url" name="projectUrl" value={projectForm.projectUrl} onChange={handleProjectInputChange} placeholder="Live Site URL" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                           <input type="text" name="tech_stack" value={projectForm.tech_stack} onChange={handleProjectInputChange} placeholder="Tech Stack (comma separated: React, Supabase, etc.)" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                           <textarea name="description" value={projectForm.description} onChange={handleProjectInputChange} placeholder="Short Description" rows="2" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                           
                           <div className="pt-4 border-t border-slate-100">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Case Study Details</h4>
                             <div className="space-y-4">
                               <textarea name="problem" value={projectForm.problem} onChange={handleProjectInputChange} placeholder="The Challenge (Problem Statement)" rows="3" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                               <textarea name="solution" value={projectForm.solution} onChange={handleProjectInputChange} placeholder="The Solution (Architecture & Process)" rows="3" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                               <textarea name="result" value={projectForm.result} onChange={handleProjectInputChange} placeholder="The Result (Metrics & Outcome)" rows="3" className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400" />
                             </div>
                           </div>
                           <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                             <input type="file" name="imageFile" accept="image/*" onChange={handleProjectInputChange} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-950 file:text-white" />
                           </div>
                           {projectFeedback && <StatusMessage tone={projectFeedback.tone}>{projectFeedback.message}</StatusMessage>}
                           <button type="submit" disabled={isSubmittingProject} className="w-full py-4 rounded-full bg-slate-950 text-white font-bold text-sm shadow-xl hover:bg-slate-800 disabled:opacity-50">
                             {isSubmittingProject ? 'Saving...' : 'Publish Project'}
                           </button>
                        </form>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {isLoadingProjects ? <LoadingState /> : projects.length === 0 ? <p className="text-center p-12 text-slate-400">No projects found.</p> : projects.map(project => (
                        <article key={project.id} className="p-5 rounded-[2.5rem] border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition">
                          <div className="w-full md:w-32 aspect-video md:aspect-square rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
                             {getProjectImage(project) && (
                               <img
                                 src={optimizeCloudinaryImage(getProjectImage(project), 400)}
                                 alt={`${project.title} preview`}
                                 className="w-full h-full object-cover"
                                 loading="lazy"
                               />
                             )}
                          </div>
                          <div className="flex-1">
                             <h4 className="font-bold text-slate-950">{project.title}</h4>
                             <p className="mt-1 text-xs text-slate-500 line-clamp-2">{project.description}</p>
                             <div className="mt-4 flex flex-wrap gap-3 items-center">
                                {getProjectLink(project) && <a href={getProjectLink(project)} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase text-orange-600 hover:underline">Link →</a>}
                                <button onClick={() => handleDeleteProject(project)} className="ml-auto text-[10px] font-black uppercase text-rose-500 hover:text-rose-700">Delete</button>
                             </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
               </ContentPanel>
            </div>
          )}

          {activeTab === 'engagement' && (
            <EngagementManager 
              reviews={reviews}
              reviewCounts={reviewCounts}
              reviewFeedback={reviewFeedback}
              activeReviewApproveId={activeReviewApproveId}
              activeReviewDeleteId={activeReviewDeleteId}
              handleApproveReview={handleApproveReview}
              handleDeleteReview={handleDeleteReview}
              loadReviews={loadReviews}
            />
          )}

          {activeTab === 'settings' && (
            <ContentPanel title="Account Settings" badge="System" subtitle="Manage your administrative credentials and preferences.">
               <div className="max-w-xl space-y-6">
                 <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest mb-4">Admin Profile</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-200">
                         <span className="text-sm text-slate-500 font-medium">Email Address</span>
                         <span className="text-sm text-slate-950 font-bold">{user?.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-200">
                         <span className="text-sm text-slate-500 font-medium">Access Level</span>
                         <SectionBadge tone="orange">Super Admin</SectionBadge>
                      </div>
                    </div>
                 </div>
                 <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest mb-6">Security</h3>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                          required
                          minLength={6}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                          required
                          minLength={6}
                        />
                      </div>
                      
                      {passwordFeedback && (
                        <StatusMessage tone={passwordFeedback.tone}>
                          {passwordFeedback.message}
                        </StatusMessage>
                      )}

                      <button
                        type="submit"
                        disabled={isUpdatingPassword}
                        className="w-full py-4 rounded-full bg-slate-950 text-white font-bold text-sm shadow-xl hover:bg-slate-800 disabled:opacity-50 transition-all"
                      >
                        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                      </button>
                    </form>
                 </div>
                 <p className="text-[11px] text-slate-400 font-medium italic">Security Tip: Use a strong, unique password to protect your admin access.</p>
               </div>
            </ContentPanel>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
