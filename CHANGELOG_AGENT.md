# Changelog do Agente

Registre aqui todas as alterações feitas por agentes.

---

## 2026-06-19 — Milestone 4: Eventos municipais brasileiros

Modelo/agente usado: claude-sonnet-4-6 (Claude Code)

Arquivos criados:
- `src/lib/eventosBrasileiros.ts` — 8 eventos com probabilidade e condição; `sortearEventosMensais()` sorteia máx 2/mês
- `src/hooks/useEventosBrasileiros.ts` — hook que detecta virada de mês e dispara notificações

Arquivos alterados:
- `src/components/Game.tsx` — import + chamada de `useEventosBrasileiros()`

Eventos implementados:
buraco_na_rua (55%), enchente (30% verão), obra_parada (35% caixa<5k),
licitacao_emergencial (25%), camara_pressiona (40% happiness<45),
ministerio_publico_recomenda (18% saúde<60%), crise_saneamento (28% água<50%),
fiscalizacao_ambiental (20% ambiente<35)

Como testar:
```bash
npm run dev
# Iniciar jogo → aumentar velocidade → aguardar virada de mês
# Notificações aparecem no canto com ícone e descrição do evento
```

Build/lint:
- `npm run build` — PASSOU

Limitações:
- Eventos são somente informativos (sem efeito na simulação)
- `lgpd_municipal` não implementado ainda

---

## 2026-06-19 — Milestone 3: Sistema de orçamento municipal brasileiro

Modelo/agente usado: claude-sonnet-4-6 (Claude Code)

Arquivos criados:
- `src/games/isocity/types/municipal.ts` — tipos `ReceitaMunicipal`, `DespesaMunicipal`, `OrcamentoMunicipal`
- `src/lib/municipalBudget.ts` — `calcularOrcamento()` deriva IPTU/ISS/FPM/despesas dos Stats existentes
- `src/components/game/panels/MunicipalPanel.tsx` — painel dialog com receita, despesa, saldo e barra de popularidade

Arquivos alterados:
- `src/games/isocity/types/game.ts` — `activePanel` union + `'municipal'`
- `src/components/game/panels/index.ts` — exporta `MunicipalPanel`
- `src/components/Game.tsx` — renderiza `<MunicipalPanel />` nos dois blocos de painéis
- `src/components/game/TopBar.tsx` — botão "Prefeitura" abre o painel municipal

Resumo:
Painel de orçamento municipal brasileiro adicionado sem tocar na simulação. O calculador `calcularOrcamento` mapeia os Stats/Budget existentes para categorias brasileiras: IPTU (38% da receita), ISS (28%), taxas diversas (10%), repasse FPM (R$30/hab). Despesas mapeadas para saúde, educação, saneamento, segurança, obras, administração. Popularidade derivada do happiness com penalidades por déficit e impostos altos.

Como testar:
```bash
npm run dev
# http://localhost:3000 → iniciar jogo → clicar "Prefeitura" na barra superior
```

Build/lint:
- `npm run build` — PASSOU (68s, sem erros TypeScript)

Limitações:
- Orçamento é read-only (somente visualização) — não afeta a simulação
- FPM é simplificado (R$30/hab fixo, sem considerar faixas populacionais reais)
- Valores em R$ mas jogo ainda usa $ internamente — divergência cosmética

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
