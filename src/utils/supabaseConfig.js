
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nxflyehglfvrxhphmngc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54Zmx5ZWhnbGZ2cnhocGhtbmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMzY1OTAsImV4cCI6MjA0NTcxMjU5MH0.d5NR0Dk-2eRQKXmka7vK6Xg6q3UHFK9WwV4dbok9mX4"
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = { supabase }