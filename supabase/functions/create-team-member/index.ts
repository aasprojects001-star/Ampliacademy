import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing authorization')

    const callerClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user: caller } } = await callerClient.auth.getUser()
    if (!caller) throw new Error('Unauthorized')

    const { data: callerProfile } = await callerClient
      .from('profiles').select('role').eq('id', caller.id).single()
    if (!['ceo','admin'].includes(callerProfile?.role)) throw new Error('Only CEO/Admin can create team members')

    const { email, password, full_name, position, permissions } = await req.json()
    if (!email || !password || !full_name) throw new Error('Missing email, password, or full_name')

    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { full_name },
    })
    if (createErr) throw createErr
    if (!newUser.user) throw new Error('User creation failed')

    await new Promise(r => setTimeout(r, 800))

    const { error: profileErr } = await adminClient
      .from('profiles')
      .update({ full_name, role: 'team_member', position: position || '', permissions: permissions || [], approved: true })
      .eq('id', newUser.user.id)
    if (profileErr) throw profileErr

    return new Response(
      JSON.stringify({ success: true, user_id: newUser.user.id, email: newUser.user.email }),
      { headers: { ...cors, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...cors, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
