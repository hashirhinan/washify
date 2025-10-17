// pages/index.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect immediately on mount
    router.replace('/scheduler')
  }, [router])

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f3f4f6',
      color: '#374151'
    }}>
      <p>Redirecting to Washify Scheduler…</p>
    </div>
  )
}
