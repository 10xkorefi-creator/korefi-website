import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mjgullrwpdtnhyrwzevn.supabase.co'
const supabaseAnonKey = 'sb_publishable_FcHUsgw81kaOjkcQIFRtzQ_pBZ39XcS'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface BlogPost {
  id: number
  created_at: string
  Name: string
  slug: string
  Description: string | null
  'rich - text': string | null
  Image: string | null
}
