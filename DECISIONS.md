# Decisions Log

Use este arquivo para registrar decisões que mudam o projeto.

## Template

```md
## YYYY-MM-DD — Título

Decisão:

Motivo:

Alternativas consideradas:

Impacto técnico:

Impacto de escopo:
```

## 2026-06-17 — Nome de trabalho

Decisão: usar `O Prefeito: Simulador de Cidade Brasileira` como nome de trabalho.

Motivo: combina marca curta com subtítulo forte para SEO brasileiro.

Alternativas consideradas: Cidade Legal, Plano Diretor, Prefeitura Simulator Brasil, Município 2040.

Impacto técnico: atualizar metadados, UI, README e assets.

Impacto de escopo: nenhum.

## 2026-06-17 — Usar IsoCity como base

Decisão: usar fork de `amilich/isometric-city` como base.

Motivo: o projeto já tem render isométrico, simulação, trânsito, economia e interface.

Alternativas consideradas: Godot do zero, engine própria, outro template.

Impacto técnico: adaptar Next.js/React/Canvas e empacotar com Tauri.

Impacto de escopo: reduz tempo para MVP, mas exige cuidado com arquitetura existente.
