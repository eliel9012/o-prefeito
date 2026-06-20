# macOS/Tauri Plan

## Status atual

- `@tauri-apps/cli 2.11.3` instalado (devDependency)
- `src-tauri/` inicializado com `npx tauri init`
- `src-tauri/tauri.conf.json` configurado (identifier, window size)
- Scripts npm: `tauri:dev`, `tauri:build`, `tauri`

## Fluxo de desenvolvimento (tauri dev)

Funciona **sem** static export:

```bash
# Terminal 1 (ou deixar o Tauri chamar via beforeDevCommand)
npm run dev

# Terminal 2
npm run tauri:dev
```

O Tauri abre webview apontando para `http://localhost:3000`.
Rust precisa estar instalado: https://rustup.rs

## Por que static export não funciona

O app usa:
- Middleware Next.js (`src/proxy.ts`) → não suportado em static export
- Rotas dinâmicas sem `generateStaticParams` (`/coop/[roomCode]`)
- `gt-next` com server components e locale detection
- `@vercel/analytics` com server hooks

`output: 'export'` em `next.config.js` quebraria essas features.

## Plano de distribuição (build real — macOS)

### Opção A: Next.js standalone + sidecar Node (recomendado para MVP)

1. Adicionar ao `next.config.js`:
   ```js
   output: 'standalone'
   ```
2. `npm run build` gera `.next/standalone/`
3. Tauri usa `shell` sidecar para iniciar o servidor Node embutido
4. Webview aponta para `http://localhost:3000`
5. Mais complexo mas mantém todas as features

### Opção B: Separar frontend estático (refatoração futura)

Extrair a parte do jogo como SPA pura sem dependência de server features.
Permite `output: 'export'` e distribuição simples via `frontendDist`.

## tauri.conf.json atual

```json
identifier: "br.com.oprefeito.app"
window: 1280x800, min 1024x700
devUrl: "http://localhost:3000"
frontendDist: "../out"  ← só funciona com Opção B
```

## Próximos passos no Mac

1. Instalar Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
2. `cd /path/to/o-prefeito && npm install`
3. `npm run tauri:dev` — testa fluxo de desenvolvimento
4. Para distribuição: implementar Opção A (standalone sidecar)
5. Ícone final: substituir `src-tauri/icons/` com arte brasileira
6. Notarização e assinatura: fora do escopo MVP

## Ícones provisórios

Gerados pelo `tauri init` em `src-tauri/icons/`.
Substituir antes de distribuição pública com arte de "O Prefeito".
