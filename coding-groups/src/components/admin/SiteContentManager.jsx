import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { uploadImage } from '../../utils/cloudinary'
import { optimizeCloudinaryImage } from '../../utils/image'
import { StatusMessage, ContentPanel, LoadingState } from './DashboardUI'

const IMAGE_STRUCTURE = [
  {
    id: 'home',
    label: 'Home Section',
    fields: [
      { key: 'home_hero_bg', label: 'Hero Background Image', type: 'image' },
      { key: 'home_secondary_image', label: 'Secondary Image', type: 'image' },
    ],
  },
  {
    id: 'services',
    label: 'Services Section',
    fields: [{ key: 'services_bg', label: 'Background Image', type: 'image' }],
  },
  {
    id: 'learn',
    label: 'Learn Section',
    fields: [{ key: 'learn_bg', label: 'Background Image', type: 'image' }],
  },
  {
    id: 'portfolio',
    label: 'Portfolio Section',
    fields: [{ key: 'portfolio_bg', label: 'Background Image', type: 'image' }],
  },
  {
    id: 'about',
    label: 'About Section',
    fields: [
      { key: 'about_bg_main', label: 'Main Background Image', type: 'image' },
      { key: 'portfolio_bg', label: 'About Second Image', type: 'image', reused: true, reusedLabel: 'Uses Portfolio Background Image' },
      { key: 'about_last_image', label: 'Last Image', type: 'image' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Section',
    fields: [{ key: 'contact_bg', label: 'Background Image', type: 'image' }],
  },
  {
    id: 'faqs',
    label: 'FAQs Section',
    fields: [{ key: 'faqs_bg', label: 'Background Image', type: 'image' }],
  },
  {
    id: 'legal',
    label: 'Legal Section',
    fields: [{ key: 'legal_bg', label: 'Background Image', type: 'image' }],
  },
]

const SiteContentManager = () => {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState({})
  const [feedback, setFeedback] = useState(null)
  
  // Requirement 1: ADD STATE for file, previewUrl, uploadedUrl
  // Each key will have { file, previewUrl, uploadedUrl }
  const [localStates, setLocalStates] = useState({})

  const fetchContent = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('site_content').select('*')
      if (error && error.code !== 'PGRST116' && !error.message.includes('not found')) {
        console.error('Error fetching site content:', error)
      }

      if (data) {
        const contentMap = {}
        data.forEach((item) => {
          contentMap[item.key] = item.value
        })
        setContent(contentMap)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      Object.values(localStates).forEach((state) => {
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl)
      })
    }
  }, [localStates])

  const handleUpdate = async (key, value) => {
    setFeedback(null)
    try {
      const { error } = await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })
      if (error) throw error
      setContent((prev) => ({ ...prev, [key]: value }))
      setFeedback({ tone: 'success', message: 'Updated successfully!' })
    } catch (error) {
      console.error('Update failed:', error)
      setFeedback({ tone: 'error', message: error.message || 'Update failed' })
    }
  }

  const handleImageUpload = async (key, file) => {
    if (!file) return

    // Requirement 2: HANDLE FILE SELECT
    // Instant preview using URL.createObjectURL
    const previewUrl = URL.createObjectURL(file)
    setLocalStates((prev) => ({
      ...prev,
      [key]: { file, previewUrl, uploadedUrl: null },
    }))

    setUploading((prev) => ({ ...prev, [key]: true }))
    setFeedback(null)

    try {
      // Requirement 4: AFTER UPLOAD
      const data = await uploadImage(file)
      
      // Save secure_url to uploadedUrl and replace preview
      setLocalStates((prev) => ({
        ...prev,
        [key]: { ...prev[key], uploadedUrl: data.secure_url },
      }))

      await handleUpdate(key, data.secure_url)
    } catch (error) {
      console.error('Upload failed:', error)
      setFeedback({ tone: 'error', message: error.message || 'Upload failed' })
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }))
    }
  }

  // Requirement 1 & 5: DELETE FUNCTION & UX IMPROVEMENT
  const handleDeleteImage = async (key) => {
    if (!window.confirm('Are you sure you want to remove this image? It will revert to the default site asset.')) return
    
    setUploading((prev) => ({ ...prev, [key]: true }))
    setFeedback(null)
    
    try {
      // 1. Update Database to empty string
      await handleUpdate(key, '')
      
      // 2. Clear local state and revoke blob
      setLocalStates((prev) => {
        const newState = { ...prev }
        if (newState[key]?.previewUrl) {
          URL.revokeObjectURL(newState[key].previewUrl)
        }
        delete newState[key]
        return newState
      })
      
      setFeedback({ tone: 'success', message: 'Image removed successfully.' })
    } catch (error) {
      console.error('Delete failed:', error)
      setFeedback({ tone: 'error', message: error.message || 'Delete failed' })
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }))
    }
  }

  if (loading) return <LoadingState label="Syncing Image Map..." />

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ContentPanel
        title="Site Image Manager"
        subtitle="Manage global background images and assets. Most images are shared across multiple pages to ensure consistency."
        badge="Asset CMS"
        actions={
          <button
            type="button"
            onClick={fetchContent}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Sync Data
          </button>
        }
      >
        {feedback && (
          <div className="mb-8">
            <StatusMessage tone={feedback.tone}>{feedback.message}</StatusMessage>
          </div>
        )}

        <div className="space-y-12">
          {IMAGE_STRUCTURE.map((section) => (
            <div key={section.id} className="rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-8">
              <h3 className="mb-8 text-xl font-bold text-slate-950 underline decoration-orange-500/30 decoration-4 underline-offset-8">
                {section.label}
              </h3>

              <div className="grid gap-10">
                {section.fields.map((field) => {
                  const currentValue = content[field.key] || ''
                  const isUploading = uploading[field.key]
                  
                  // Requirement 3 & 5: DISPLAY PREVIEW & FALLBACK
                  const fieldState = localStates[field.key] || {}
                  const displayUrl = fieldState.uploadedUrl || fieldState.previewUrl || currentValue

                  return (
                    <div key={field.key} className="grid lg:grid-cols-[240px_1fr] gap-8">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">{field.label}</h4>
                        <p className="mt-1 text-[10px] font-bold text-slate-400">KEY: {field.key}</p>
                        {field.info && (
                           <div className="mt-2 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full inline-block">{field.info}</div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="relative aspect-video w-full sm:w-64 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
                          {displayUrl ? (
                            <img
                              src={optimizeCloudinaryImage(displayUrl, 800)}
                              className="h-full w-full object-cover"
                              alt={`${field.label} preview`}
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                              No Image
                            </div>
                          )}
                          {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                              <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          {field.reused ? (
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest">
                                🔗 {field.reusedLabel}
                              </div>
                              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                Changing the Portfolio background will automatically update this image.
                              </p>
                            </div>
                          ) : displayUrl ? (
                            <div className="flex flex-wrap gap-3">
                              <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(field.key, e.target.files[0])}
                                  disabled={isUploading}
                                />
                                {isUploading ? 'Replacing...' : 'Replace Image'}
                              </label>
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(field.key)}
                                disabled={isUploading}
                                className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-6 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
                              >
                                {isUploading ? 'Removing...' : 'Remove Image'}
                              </button>
                            </div>
                          ) : (
                            <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(field.key, e.target.files[0])}
                                disabled={isUploading}
                              />
                              {isUploading ? 'Uploading...' : 'Upload Image'}
                            </label>
                          )}
                          {!field.reused && (
                            <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
                              Recommended: 1920x1080px (Hero) or 1200x800px (Secondary).
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ContentPanel>
    </div>
  )
}

export default SiteContentManager
