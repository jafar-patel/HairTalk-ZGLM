import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://stjmznhozkqximzlrffw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0am16bmhvemtxeGltemxyZmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzM4MzMsImV4cCI6MjA5MTE0OTgzM30.hX7gLQZfv77eSB4o_FYBruBhSBQgs0hj4JlF7RHqpeI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const isSupabaseConfigured = true
