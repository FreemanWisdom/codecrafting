import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminUser, isSupabaseConfigured, supabase } from '../lib/supabaseClient'

function ProtectedAdminRoute() {
  const location = useLocation()
  const [authState, setAuthState] = useState({
    isLoading: true,
    user: null,
  })

  useEffect(() => {
    let isMounted = true
    let subscription = null

    const syncSession = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (isMounted) setAuthState({ isLoading: false, user: null })
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (isMounted) {
        setAuthState({ isLoading: false, user: session?.user ?? null })
      }
    }

    syncSession()

    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
          setAuthState({ isLoading: false, user: session?.user ?? null })
        }
      })
      subscription = data.subscription
    }
    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])



  if (authState.isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5 blur-[120px] rounded-full -top-40 -left-40"></div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mb-6" />
            <div className="rounded-3xl border border-white/5 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 backdrop-blur-xl">
              Authenticating Admin...
            </div>
        </div>
      </section>
    )
  }

  if (!authState.user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!isAdminUser(authState.user)) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={{ user: authState.user }} />
}

export default ProtectedAdminRoute
