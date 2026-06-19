# QA Checklist

## Depois de cada tarefa

- [ ] `npm install` não quebra.
- [ ] `npm run build` passa.
- [ ] `npm run lint` passa ou a falha foi documentada.
- [ ] O jogo abre em `npm run dev`.
- [ ] A alteração pode ser testada manualmente.
- [ ] Não há erro crítico no console.
- [ ] `TASKS.md` foi atualizado.
- [ ] `CHANGELOG_AGENT.md` foi atualizado.

## Teste manual básico

1. Abrir o jogo.
2. Criar ou carregar cidade.
3. Mover câmera.
4. Construir algo.
5. Verificar dinheiro/orçamento.
6. Esperar passagem de tempo.
7. Ver se eventos aparecem.
8. Salvar e recarregar.

## Teste macOS/Tauri

1. Rodar `npm run build`.
2. Rodar `npm run tauri dev`.
3. Conferir menu/tela cheia/janela.
4. Conferir save/load dentro do app.
5. Rodar `npm run tauri build`.
6. Abrir o `.app` gerado.
