import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://rhicogywnttlzdiwjlqa.supabase.co'
// Replace with your actual anon/public key — process.env doesn't work in browsers
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWNvZ3l3bnR0bHpkaXdqbHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjQ0NzEsImV4cCI6MjA5NDg0MDQ3MX0.69B0vnkYydjRlZYAlGhQrWmo6kqvVui0ThTFL96xs6I'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Modal open/close ──────────────────────────────────────────────────────────
const modal        = document.getElementById('auth-modal')
const modalTitle   = document.getElementById('modal-title')
const authForm     = document.getElementById('auth-form')
const submitBtn    = document.getElementById('auth-submit')
const switchLink   = document.getElementById('auth-switch-link')
const switchText   = document.getElementById('auth-switch-text')
const closeBtn     = document.getElementById('modal-close')
const authMsg      = document.getElementById('auth-message')
const navSignUp    = document.getElementById('nav-signup')
const navLogin     = document.getElementById('nav-login')
const navLogout    = document.getElementById('nav-logout')
const navUsername  = document.getElementById('nav-username')

let authMode = 'login' // 'login' | 'signup'

function openModal(mode) {
  authMode = mode
  authMsg.textContent = ''
  authMsg.className = 'auth-message'
  authForm.reset()
  updateModalMode()
  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modal.classList.remove('open')
  document.body.style.overflow = ''
}

function updateModalMode() {
  if (authMode === 'signup') {
    modalTitle.textContent = 'create account'
    submitBtn.textContent  = 'sign up'
    switchText.innerHTML   = 'already have an account? <a id="auth-switch-link" href="#">log in</a>'
  } else {
    modalTitle.textContent = 'welcome back'
    submitBtn.textContent  = 'log in'
    switchText.innerHTML   = "don't have an account? <a id='auth-switch-link' href='#'>sign up</a>"
  }
  // Re-attach listener after innerHTML swap
  document.getElementById('auth-switch-link').addEventListener('click', e => {
    e.preventDefault()
    authMode = authMode === 'login' ? 'signup' : 'login'
    authMsg.textContent = ''
    updateModalMode()
  })
}

navSignUp.addEventListener('click', e => { e.preventDefault(); openModal('signup') })
navLogin.addEventListener('click',  e => { e.preventDefault(); openModal('login')  })
closeBtn.addEventListener('click', closeModal)
modal.addEventListener('click', e => { if (e.target === modal) closeModal() })
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })

// ── Form submit ───────────────────────────────────────────────────────────────
authForm.addEventListener('submit', async e => {
  e.preventDefault()
  const email    = document.getElementById('auth-email').value.trim()
  const password = document.getElementById('auth-password').value

  submitBtn.disabled = true
  submitBtn.textContent = authMode === 'signup' ? 'signing up…' : 'logging in…'
  authMsg.textContent = ''
  authMsg.className = 'auth-message'

  try {
    if (authMode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      showMessage('check your email to confirm your account!', 'success')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      showMessage('logged in!', 'success')
      setTimeout(closeModal, 800)
    }
  } catch (err) {
    showMessage(err.message, 'error')
  } finally {
    submitBtn.disabled = false
    updateModalMode()
  }
})

function showMessage(msg, type) {
  authMsg.textContent = msg
  authMsg.className = `auth-message ${type}`
}

// ── Session state ─────────────────────────────────────────────────────────────
async function syncNav() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    navSignUp.style.display  = 'none'
    navLogin.style.display   = 'none'
    navLogout.style.display  = 'inline'
    navUsername.style.display = 'inline'
    navUsername.textContent  = session.user.email.split('@')[0]
  } else {
    navSignUp.style.display  = 'inline'
    navLogin.style.display   = 'inline'
    navLogout.style.display  = 'none'
    navUsername.style.display = 'none'
  }
}

navLogout.addEventListener('click', async e => {
  e.preventDefault()
  await supabase.auth.signOut()
  syncNav()
})

supabase.auth.onAuthStateChange(() => syncNav())
syncNav()