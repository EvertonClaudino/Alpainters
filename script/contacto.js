// contacto.js — Form submission with database integration
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Disable button & show loading
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      A enviar...
    `;
    btn.style.opacity = '0.7';

    const payload = {
      nome:     form.nome.value.trim(),
      contacto: form.contacto.value.trim(),
      email:    form.email.value.trim(),
      servico:  form.servico.value,
      mensagem: form.mensagem.value.trim()
    };

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        // Success state
        btn.innerHTML = `
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Mensagem enviada com sucesso!
        `;
        btn.style.background = '#10b981';
        btn.style.opacity = '1';
        form.reset();

        // Clear success message after 4s
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.opacity = '';
          btn.disabled = false;
        }, 4000);
      } else {
        // Error state
        btn.innerHTML = `
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          ${data.error || 'Erro — tenta novamente'}
        `;
        btn.style.background = '#ef4444';
        btn.style.opacity = '1';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.opacity = '';
          btn.disabled = false;
        }, 3000);
      }
    } catch (err) {
      // Network error
      btn.innerHTML = `
        <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Erro de conexão — verifica a internet
      `;
      btn.style.background = '#ef4444';
      btn.style.opacity = '1';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.opacity = '';
        btn.disabled = false;
      }, 3000);
    }
  });
});
