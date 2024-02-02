import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bdvhiizjigklgnlfzxfc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdmhpaXpqaWdrbGdubGZ6eGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODU4MDIsImV4cCI6MjAyMjQ2MTgwMn0.Si3nBLq2HM3WlEBStccJOSjloJmq37auchTeRdMt_rU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
