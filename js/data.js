import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rhicogywnttlzdiwjlqa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWNvZ3l3bnR0bHpkaXdqbHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjQ0NzEsImV4cCI6MjA5NDg0MDQ3MX0.69B0vnkYydjRlZYAlGhQrWmo6kqvVui0ThTFL96xs6I'

const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const message = document.getElementById('message').value

  const { data, error } = await supabase
    .from('contacts')
    .insert([
      { name, email, message }
    ])

  if (error) {
    alert('Error!')
    console.error(error)
  } else {
    alert('Saved!')
    console.log(data)
  }
})

async function loadMessages() {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById('messages')
  container.innerHTML = ''

  data.forEach(item => {
    const div = document.createElement('div')
    div.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>${item.email}</p>
      <p>${item.message}</p>
      <hr>
    `
    container.appendChild(div)
  })
}

loadMessages()