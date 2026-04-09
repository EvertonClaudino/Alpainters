// api/contacto.js
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { nome, contacto, email, servico, mensagem } = req.body;

  // Validação básica
  const servicosValidos = [
    'isolamento-termico', 'reabilitacao-fachadas', 'pintura-interior-exterior',
    'vistoria-drones', 'lavagem-fachadas', 'limpeza-vidros',
    'toldos-estruturas', 'servicos-personalizados', 'servicos-pontuais', 'outro'
  ];

  if (!nome || !contacto || !email || !mensagem || !servicosValidos.includes(servico)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO contactos (nome, contacto, email, servico, mensagem)
      VALUES (${nome}, ${contacto}, ${email}, ${servico}, ${mensagem})
    `;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao guardar contacto' });
  }
}