const { createClient } = supabase;

const client = createClient(
  'https://rhicogywnttlzdiwjlqa.supabase.co',
  'sb_publishable_cJyLYL_1KwVuhBJKJE-0nQ_vrLf9p4E'
);

document.getElementById('nameForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;

  const { error } = await client
    .from('names')
    .insert([{ name }]);

  document.getElementById('status').textContent = error
    ? 'Error: ' + error.message
    : 'Name saved!';
});