-- Schema da tabela contactos — Alpainters
-- Compatível com Neon Database (PostgreSQL)

CREATE TABLE IF NOT EXISTS contactos (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(150)  NOT NULL,
  contacto    VARCHAR(30)   NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  servico     VARCHAR(60)   NOT NULL CHECK (servico IN (
                'isolamento-termico',
                'reabilitacao-fachadas',
                'pintura-interior-exterior',
                'vistoria-drones',
                'lavagem-fachadas',
                'limpeza-vidros',
                'toldos-estruturas',
                'servicos-personalizados',
                'servicos-pontuais',
                'outro'
              )),
  mensagem    TEXT          NOT NULL,
  criado_em   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Index para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_contactos_email ON contactos(email);
CREATE INDEX IF NOT EXISTS idx_contactos_criado_em ON contactos(criado_em DESC);
