# Higgsfield Asset Pipeline

## Papel do Higgsfield

Usar Higgsfield para gerar:

- concept art;
- key art;
- retratos de personagens;
- telas de menu;
- materiais promocionais;
- referências de prédios e cenários brasileiros;
- possivelmente assets finais depois de recorte, edição e padronização.

## Papel do agente coder

O agente não deve simplesmente jogar imagens geradas dentro do jogo. Ele deve:

1. criar prompts padronizados;
2. gerar ou solicitar assets via Higgsfield;
3. salvar outputs em pasta separada;
4. registrar origem em `generated_assets_log.md`;
5. validar tamanho, proporção e legibilidade;
6. só então integrar no jogo.

## Instalação CLI

```bash
npm install -g @higgsfield/cli
higgsfield auth login
npx skills add higgsfield-ai/skills
```

## Pastas sugeridas

```text
assets/concepts/higgsfield/
assets/source/higgsfield/
assets/processed/
public/assets/br/
```

## Log obrigatório

Criar/atualizar `generated_assets_log.md` com:

- data;
- prompt;
- modelo usado;
- arquivo de saída;
- licença/termos aplicáveis;
- status: concept, approved, rejected, integrated.

## Fluxo de asset

1. Kimi lê `ART_DIRECTION_BR.md` e `ASSET_MANIFEST.md`.
2. Kimi cria prompts em `prompts/higgsfield_batch_XX.md`.
3. Higgsfield gera imagens.
4. Kimi organiza arquivos.
5. Você aprova.
6. Kimi integra assets aprovados.

## Prompt base

```text
Create an isometric game asset concept for a Brazilian mid-sized city management game.
Subject: [ASSET]
Style: clean isometric city-builder, readable at small scale, warm Brazilian daylight, no real brands, no political party symbols.
Brazilian details: ceramic roof tiles, concrete sidewalks, overhead power lines, small local storefronts, municipal signage in Portuguese, tropical/subtropical street trees.
Camera: orthographic isometric, 3/4 view.
Background: transparent or plain neutral background.
Avoid: photorealism, cinematic depth of field, real logos, real politicians, national flag overuse, stereotypes.
```
