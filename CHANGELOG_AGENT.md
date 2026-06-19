# Changelog do Agente

Registre aqui todas as alterações feitas por agentes.

---

## 2026-06-17 — Rebranding mínimo (Fase 4 MVP)

Modelo/agente usado: claude-sonnet-4-6 (Claude Code)

Arquivos alterados:
- `src/app/layout.tsx` — metadados, título, descrição, siteName, appleWebApp
- `src/app/page.tsx` — h1 "IsoCity" → "O Prefeito" + subtítulo, chaves localStorage
- `package.json` — name: "isometric-city" → "o-prefeito"
- `TASKS.md` — setup concluído, próximos milestones adicionados
- `CHANGELOG_AGENT.md` — este registro

Resumo:
Rebranding inicial do fork. Título "IsoCity" substituído por "O Prefeito" em desktop e mobile. Subtítulo "Simulador de Cidade Brasileira" adicionado. Metadados de SEO/OG atualizados. Chaves de localStorage renomeadas para evitar colisão com o original (`oprefeito-*`).

Como testar:
```bash
npm run dev
# Abra http://localhost:3000
# Verifique: título "O Prefeito" e subtítulo "Simulador de Cidade Brasileira" na tela inicial
```

Build/lint:
- `npm run build` — PASSOU (66s, sem erros de TypeScript)

Limitações:
- Textos internos do jogo (dentro do canvas, painéis) ainda estão em inglês via gt-next
- Locale padrão ainda é `en`; pt-BR disponível mas não é padrão
- Nenhum sistema de simulação foi alterado

---

## Template para próximos registros

```md
## YYYY-MM-DD — Nome da tarefa

Modelo/agente usado:

Arquivos alterados:

Resumo:

Como testar:

Build/lint:

Limitações:
```
