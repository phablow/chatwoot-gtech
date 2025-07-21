import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { useSession, makeWASocket } from '@whiskeysockets/baileys'

serve(async (req) => {
  const { action } = await req.json()
  
  // Configuração inicial do Baileys
  const { state, saveCreds } = await useSession('whatsapp-session')
  
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  })

  sock.ev.on('creds.update', saveCreds)

  if (action === 'get-qr') {
    sock.ev.on('connection.update', (update) => {
      if (update.qr) {
        return new Response(JSON.stringify({ qr: update.qr }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }
    })
  }

  return new Response(JSON.stringify({ status: 'ready' }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
