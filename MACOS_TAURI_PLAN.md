# macOS/Tauri Plan

## Objetivo

Empacotar o jogo como app macOS usando Tauri.

## Por que Tauri

O projeto já é web/Next/React/Canvas. Tauri permite empacotar uma aplicação web como app desktop com menor peso do que Electron.

## Tarefas

1. Confirmar que o app funciona como frontend estático.
2. Ajustar `next.config.mjs` ou `next.config.ts`:

```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

3. Confirmar que `npm run build` gera a pasta `out`.
4. Instalar Tauri:

```bash
npm install -D @tauri-apps/cli
npm run tauri init
```

5. Configurar `src-tauri/tauri.conf.json`:

```json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:3000",
    "frontendDist": "../out"
  }
}
```

6. Definir metadata:

- productName: `O Prefeito`
- identifier: `br.com.saberlegal.oprefeito` ou `br.com.elieljunior.oprefeito`
- version: `0.1.0`

7. Testar:

```bash
npm run tauri dev
npm run tauri build
```

## Atenção

- Build macOS deve ser feito em macOS.
- Notarização e assinatura ficam fora do MVP.
- Salvar/carregar precisa ser testado dentro do app empacotado.
