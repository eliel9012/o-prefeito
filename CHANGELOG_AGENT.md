# Changelog do Agente

Registre aqui todas as alterações feitas por agentes.

---

## 2026-06-17 — Milestone 2: Locale PT-BR e limpeza de strings

Modelo/agente usado: claude-sonnet-4-6 (Claude Code)

Arquivos alterados:
- `gt.config.json` — defaultLocale: "en" → "pt-BR"
- `src/app/coop/[roomCode]/layout.tsx` — metadados em PT-BR, siteName "O Prefeito"
- `src/app/coop/[roomCode]/page.tsx` — chaves localStorage oprefeito-*
- `src/app/thumbnail/layout.tsx` — título OG atualizado
- `src/app/coaster/page.tsx` — "Back to IsoCity" → "Voltar para O Prefeito"
- `src/context/GameContext.tsx` — todas as chaves localStorage oprefeito-*, nome padrão "Minha Cidade"
- `src/hooks/useMultiplayerSync.ts` — chave localStorage oprefeito-*
- `src/hooks/useTipSystem.ts` — chaves localStorage oprefeito-*
- `src/app/page.tsx` — tagline brasileira na tela desktop

Resumo:
Locale padrão definido como pt-BR. Todas as chaves de localStorage renomeadas para `oprefeito-*` de forma consistente em todos os arquivos. Strings visíveis ao usuário traduzidas. Nome padrão de nova cidade trocado de "IsoCity" para "Minha Cidade". Tagline adicionada na tela inicial.

Como testar:
```bash
npm run dev
# http://localhost:3000
# Tela inicial deve mostrar tagline. Novo jogo cria cidade "Minha Cidade".
# Página /coaster tem "Voltar para O Prefeito".
```

Build/lint:
- `npm run build` — PASSOU

Limitações:
- Locale padrão pt-BR está no gt.config.json mas o roteamento de locale depende do middleware do gt-next (sem alteração)
- Textos dentro do canvas do jogo continuam via gt-next i18n (funcionam se o browser estiver em pt-BR)

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
