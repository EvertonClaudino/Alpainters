document.getElementById('form-contacto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'A enviar...';

  const payload = {
    nome:      form.nome.value.trim(),
    contacto:  form.contacto.value.trim(),
    email:     form.email.value.trim(),
    servico:   form.servico.value,
    mensagem:  form.mensagem.value.trim()
  };

  try {
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      btn.textContent = '✓ Mensagem enviada!';
      form.reset();
    } else {
      btn.textContent = 'Erro — tenta novamente';
    }
  } catch {
    btn.textContent = 'Erro — tenta novamente';
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar Mensagem';
    }, 3000);
  }
});