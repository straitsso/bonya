import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the public anon (publishable) key.
 * RLS on both tables allows anon INSERT only, so this key can write
 * signups and enquiries but can never read them back.
 */
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
