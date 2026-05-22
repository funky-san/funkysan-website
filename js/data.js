import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
 
const SUPABASE_URL = 'https://rhicogywnttlzdiwjlqa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWNvZ3l3bnR0bHpkaXdqbHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjQ0NzEsImV4cCI6MjA5NDg0MDQ3MX0.69B0vnkYydjRlZYAlGhQrWmo6kqvVui0ThTFL96xs6I';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
 
const signupBtn = document.getElementById('signup-button');
const loginBtn  = document.getElementById('login-button');
 
function setMessage(el, text, isError = false) {
  el.textContent = text;
  el.style.color = isError ? 'var(--error, #e55)' : 'var(--success, #5a5)';
}
 
function updateNav(user) {
  signupBtn.textContent = user ? 'account' : 'sign up';
  loginBtn.textContent  = user ? 'log out' : 'login';
}
 
// ── Sign-up ───────────────────────────────────────────────────────────────────
document.getElementById('signup-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const msg      = document.getElementById('signup-message');
 
  setMessage(msg, 'creating account…');
  const { error } = await supabase.auth.signUp({ email, password });
 
  if (error) {
    setMessage(msg, error.message, true);
  } else {
    setMessage(msg, 'check your email to confirm your account!');
    document.getElementById('signup-form').reset();
  }
});
 
// ── Log-in ────────────────────────────────────────────────────────────────────
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const msg      = document.getElementById('login-message');
 
  setMessage(msg, 'logging in…');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 
  if (error) {
    setMessage(msg, error.message, true);
  } else {
    setMessage(msg, `welcome back, ${data.user.email}!`);
    document.getElementById('login-form').reset();
    updateNav(data.user);
  }
});
 
// ── Log-out ───────────────────────────────────────────────────────────────────
loginBtn.addEventListener('click', async e => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
 
  e.preventDefault();
  e.stopImmediatePropagation();
  await supabase.auth.signOut();
  updateNav(null);
});
 
// ── Restore session on page load ──────────────────────────────────────────────
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) updateNav(session.user);
});
 
supabase.auth.onAuthStateChange((_event, session) => {
  updateNav(session?.user ?? null);
});
