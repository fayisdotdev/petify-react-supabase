// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vkejkahfiajaiblmiadg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZWprYWhmaWFqYWlibG1pYWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTk1MjYsImV4cCI6MjA3NjM3NTUyNn0.tjc-YB_e7MfpFFVYWKZK25jE2Ln9yTSJNeFGhmpo0bU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
