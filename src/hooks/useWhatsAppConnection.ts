import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export const useWhatsAppConnection = () => {
  const [qrCode, setQrCode] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const channel = supabase
      .channel('whatsapp-status')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'connection_status'
      }, (payload) => {
        setIsConnected(payload.new.status === 'connected')
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const getQrCode = async () => {
    const response = await fetch('/api/whatsapp/qr')
    const { qr } = await response.json()
    setQrCode(qr)
  }

  return { qrCode, isConnected, getQrCode }
}
