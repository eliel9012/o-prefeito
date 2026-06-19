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

### Milestone 6 — Pipeline Higgsfield (assets brasileiros)
- [ ] Criar log de assets gerados.
- [ ] Gerar concept da Prefeitura.
- [ ] Gerar concept da Câmara Municipal.
- [ ] Gerar concept da UBS.
- [ ] Gerar concept da Escola Municipal.
- [ ] Gerar concept de buraco/enchente/obra parada.

### Milestone 7 — Revisão de arquitetura
- [ ] Revisão de arquitetura pelo Mistral Medium 3.5 via Aider.
