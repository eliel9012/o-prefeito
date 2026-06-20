# Tasks

## Concluído

### Setup
- [x] Fazer fork do IsoCity.
- [x] Clonar no Pi 5.
- [x] Rodar `npm install`.
- [x] Rodar `npm run build`.
- [x] Criar branch `prefeito-brasil-mvp`.
- [x] Adicionar docs do agente.

### Rebranding mínimo (Fase 4 — 2026-06-17)
- [x] Trocar título principal para `O Prefeito` (desktop e mobile).
- [x] Adicionar subtítulo `Simulador de Cidade Brasileira`.
- [x] Atualizar metadados do app (`layout.tsx`).
- [x] Renomear chaves de localStorage para `oprefeito-*`.
- [x] Renomear `name` no `package.json` para `o-prefeito`.
- [x] Build confirmado pós-rebranding.

### Milestone 2 — Locale PT-BR e UI (2026-06-17)
- [x] Definir locale padrão como `pt-BR` no `gt.config.json`.
- [x] Traduzir strings visíveis: metadata coop, "Back to IsoCity", título thumbnail.
- [x] Renomear todas as chaves localStorage para `oprefeito-*` (GameContext, hooks, coop page).
- [x] Nome padrão de nova cidade: "Minha Cidade" (era "IsoCity").
- [x] Tagline brasileira na tela inicial desktop.
- [x] Build confirmado pós-Milestone 2.

### Milestone 3 — Sistema de orçamento municipal (2026-06-19)
- [x] Identificar onde o dinheiro/economia é controlado (`src/lib/simulation.ts`).
- [x] Criar tipos para orçamento municipal (`src/games/isocity/types/municipal.ts`).
- [x] Adicionar receita mensal: IPTU, ISS, taxas diversas, repasse FPM.
- [x] Adicionar despesas: saúde, educação, saneamento, segurança, obras, administração.
- [x] Adicionar popularidade do prefeito (derivada de happiness + penalidades).
- [x] Painel "Orçamento Municipal" acessível via botão "Prefeitura" na TopBar.
- [x] Build confirmado pós-Milestone 3.

---

## Próximos milestones

### Milestone 3 — Sistema de orçamento municipal
- [ ] Identificar onde o dinheiro/economia é controlado.
- [ ] Criar tipos para orçamento municipal.
- [ ] Adicionar receita mensal: IPTU, ISS, repasses federais.
- [ ] Adicionar despesas: saúde, educação, saneamento, segurança, obras.
- [ ] Adicionar popularidade do prefeito.
- [ ] Adicionar painel mensal simplificado.

### Milestone 4 — Eventos brasileiros (2026-06-19)
- [x] Criar evento `buraco_na_rua`.
- [x] Criar evento `enchente` (condição: meses de verão).
- [x] Criar evento `licitacao_emergencial`.
- [x] Criar evento `obra_parada` (condição: caixa baixo).
- [x] Criar evento `ministerio_publico_recomenda` (condição: saúde < 60%).
- [x] Criar evento `camara_pressiona` (condição: happiness < 45).
- [x] Criar evento `crise_saneamento` (condição: água < 50%).
- [x] Criar evento `fiscalizacao_ambiental` (condição: ambiente < 35).
- [ ] Criar evento `lgpd_municipal` (futuro).

### Milestone 5 — Empacotamento macOS/Tauri (2026-06-19)
- [x] Verificar compatibilidade com static export → INCOMPATÍVEL (middleware + gt-next + rotas dinâmicas).
- [x] Adicionar Tauri (`@tauri-apps/cli 2.11.3` devDependency).
- [x] `npx tauri init` → `src-tauri/` gerado.
- [x] Configurar `tauri.conf.json`: identifier, janela 1280x800, devUrl, scripts npm.
- [x] Ícones provisórios em `src-tauri/icons/` (gerados pelo tauri init).
- [x] `MACOS_TAURI_PLAN.md` atualizado com achados e plano de distribuição.
- [ ] Testar `tauri dev` no Mac (requer Rust + macOS).
- [ ] Implementar Next.js standalone sidecar para distribuição real.

### Milestone 6 — Pipeline Higgsfield (assets brasileiros) (2026-06-20)
- [x] Criar log de assets gerados (`generated_assets_log.md`).
- [x] Criar estrutura de pastas (`assets/concepts/higgsfield/`, `assets/processed/`, `public/assets/br/`).
- [x] Gerar concept da Prefeitura Municipal.
- [x] Gerar concept da Câmara Municipal.
- [x] Gerar concept da UBS / Posto de Saúde.
- [x] Gerar concept da Escola Municipal.
- [x] Gerar concept de Buraco na rua (v2, com acento ATENÇÃO).
- [x] Gerar concept de Enchente.
- [x] Gerar concept de Obra parada.
- [x] Gerar concept de Casa popular.
- [x] Todos os 8 concepts aprovados pelo usuário.
- [ ] Processar e integrar assets aprovados no jogo.

### Milestone 9 — Tela inicial brasileira + polish MVP (2026-06-20)
- [x] Hero art na tela inicial desktop: grid 2×2 (Prefeitura, Câmara, Escola, UBS) substituindo SpriteGallery.
- [x] Evento `lgpd_municipal` — dispara no primeiro mês (ano=1, mês=1), humor sobre cookies da prefeitura.
- [x] Hook `useElectionLost` — detecta popularidade < 20 por 3 meses consecutivos.
- [x] Componente `ElectionLostDialog` — dialog "Você perdeu a eleição" com imagem em escala de cinza.
- [x] Integrado nos dois layouts (desktop + mobile) do `Game.tsx`.
- [x] Build confirmado pós-Milestone 9.
- [x] PR aberto para `main`.

### Milestone 8 — Integração de assets brasileiros (2026-06-20)
- [x] Processar 8 assets (2048px → 256px e 512px WebP via ImageMagick).
- [x] Mover para `public/assets/br/` (16 arquivos, 15-67KB cada).
- [x] Criar `EventoToast` — toast com thumbnail do evento + emoji + título + descrição (6s, auto-dismiss).
- [x] Integrar `EventoToast` no layout desktop e mobile do `Game.tsx`.
- [x] Adicionar thumbnail da Prefeitura no cabeçalho do `MunicipalPanel`.
- [x] Mapear evento → imagem (buraco, enchente, obra, câmara, saúde, casa).
- [x] Build confirmado pós-Milestone 8.

### Milestone 7 — Revisão de arquitetura (2026-06-20)
- [x] Revisão de arquitetura pelo Mistral Medium 3.5 via Aider.
- [x] Fix: `useEventosBrasileiros` — remover `state` inteiro do deps (usar só `state.month`/`state.year`); pattern com useRef.
- [x] Fix: `municipalBudget` — proteção contra valores negativos (`Math.max(0, ...)`); refatorar para `OrcamentoService` com `IndicadoresMunicipais`.
- [x] Fix: `eventosBrasileiros` — refatorar para `EventoService` com `EventoMunicipal`; restaurar 8 eventos.
- [x] Fix: `MunicipalPanel` — importar `IndicadoresMunicipais` dos tipos; mover `formatCurrency` para local.
- [x] Fix: `TopBar` — meses em PT-BR; `formatCurrency` local; remover código morto.
- [x] Build confirmado pós-Milestone 7.
