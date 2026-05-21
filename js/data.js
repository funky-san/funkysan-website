import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rhicogywnttlzdiwjlqa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWNvZ3l3bnR0bHpkaXdqbHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjQ0NzEsImV4cCI6MjA5NDg0MDQ3MX0.69B0vnkYydjRlZYAlGhQrWmo6kqvVui0ThTFL96xs6I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function loadNames() {
  const { data, error } = await supabase
    .from("TEST")
    .select("name");

  if (error) {
    console.error("Error:", error);
    return;
  }

  data.forEach(row => {
    console.log(row.name);
  });
}

loadNames();