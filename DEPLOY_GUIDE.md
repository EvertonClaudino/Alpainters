# 🚀 Guia de Deploy — Alpainters na Vercel

## ✅ Checklist Pré-Deploy

- [x] Ficheiro `api/contacto.js` renomeado (era `contact.js`)
- [x] `vercel.json` criado com configuração de headers
- [x] `database/schema.sql` criado
- [x] `package.json` atualizado (sem dependências desnecessárias)
- [ ] `.env` configurado com DATABASE_URL real

---

## 📋 Passo 1: Criar Base de Dados no Neon

1. Acede a [neon.tech](https://neon.tech)
2. Cria conta gratuita
3. Cria projeto chamado "alpainters"
4. Vai a **SQL Editor** e cola o conteúdo de `database/schema.sql`
5. Clica em **Run** para criar a tabela `contactos`
6. Copia a **Connection String** (formato: `postgresql://user:pass@ep-xxx.neon.tech/dbname`)

---

## 📋 Passo 2: Configurar Variáveis na Vercel

1. Vai ao dashboard da Vercel → teu projeto
2. **Settings** → **Environment Variables**
3. Adiciona:
   - **Key:** `DATABASE_URL`
   - **Value:** (tua connection string do Neon)
   - **Environment:** ✅ Production, ✅ Preview, ✅ Development
4. Clica em **Save**

---

## 📋 Passo 3: Deploy

### Opção A — GitHub (Recomendado)

1. Push do código para o GitHub
2. Na Vercel, clica em **Import Project**
3. Seleciona o repo
4. A Vercel deteta automaticamente:
   - `api/*.js` como serverless functions
   - Ficheiros estáticos na raiz
5. Clica em **Deploy**

### Opção B — Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## 📋 Passo 4: Testar

1. Visita o URL do teu deploy (ex: `https://alpainters.vercel.app`)
2. Preenche o formulário de contacto
3. Clica em **Enviar**
4. Deves ver ✓ "Mensagem enviada com sucesso!"

---

## 🔍 Verificar Dados no Banco de Dados

No painel do Neon → **Tables** → `contactos` → **Browse Data**

Ou via SQL:
```sql
SELECT * FROM contactos ORDER BY criado_em DESC;
```

---

## 🐛 Troubleshooting

| Problema | Solução |
|---|---|
| Erro 404 ao enviar | Verifica se `api/contacto.js` existe no repo |
| Erro 500 ao enviar | Verifica `DATABASE_URL` nas variáveis da Vercel |
| Tabela não existe | Executa o SQL do `database/schema.sql` no Neon |
| Formulário não faz submit | Verifica consola do browser (F12) |

---

## 📁 Estrutura do Projeto

```
alpainters/
├── api/
│   └── contacto.js          # Serverless function (Vercel)
├── database/
│   └── schema.sql           # Criação da tabela
├── script/
│   ├── script.js            # JS principal (i18n, etc)
│   └── contacto.js          # Submit do formulário
├── .env.example             # Exemplo (sem credenciais!)
├── vercel.json              # Configuração Vercel
├── package.json             # Dependências mínimas
├── index.html               # Site principal
├── styles.css               # Estilos
└── admin.html               # Painel admin (opcional)
```
