# AGENTS.md

Você é um agente de desenvolvimento trabalhando no fork brasileiro do IsoCity.

## Missão

Transformar o projeto `amilich/isometric-city` em **O Prefeito: Simulador de Cidade Brasileira**, um city-builder isométrico com identidade, sistemas e eventos brasileiros.

## Regras obrigatórias

1. Leia `PROJECT_BRIEF.md`, `CURRENT_MILESTONE.md`, `TASKS.md` e `DECISIONS.md` antes de alterar código.
2. Não aumente o escopo sem registrar em `DECISIONS.md`.
3. Não implemente sistemas fora do milestone atual.
4. Faça mudanças pequenas, testáveis e revertíveis.
5. Ao final de cada tarefa, rode pelo menos:
   - `npm run build`
   - `npm run lint`, se disponível e funcional.
6. Se o build quebrar, corrija antes de encerrar.
7. Atualize `CHANGELOG_AGENT.md` depois de cada tarefa.
8. Atualize `TASKS.md` marcando o que foi feito.
9. Não adicionar dependências sem justificar em `DECISIONS.md`.
10. Não usar nomes, assets ou marcas de terceiros sem autorização.
11. Não usar a marca `SimCity` no produto final, apenas como referência interna de gênero.

## Definition of Done

Uma tarefa só está concluída se:

- o projeto instala dependências;
- o jogo abre localmente;
- o build não quebra;
- o recurso novo pode ser testado manualmente;
- `CHANGELOG_AGENT.md` foi atualizado;
- `TASKS.md` foi atualizado;
- limitações conhecidas foram registradas.

## Estrutura mental do projeto

- `src/components/game/` contém o núcleo visual e de interação.
- `src/context/GameContext` coordena estado global do jogo.
- `src/lib/simulation.ts` deve concentrar regras de simulação sempre que possível.
- `src/types/game.ts` deve receber novos tipos de forma organizada.
- A adaptação brasileira deve preferir adicionar camadas e sistemas incrementais em vez de reescrever o renderer.

## Política de alteração

Comece sempre pela menor alteração funcional possível.

Evite:
- reescrever `CanvasIsometricGrid.tsx` inteiro;
- alterar muitos sistemas simultaneamente;
- criar abstrações complexas sem necessidade;
- misturar rebranding, simulação e empacotamento na mesma tarefa.

Prefira:
- uma PR/tarefa por assunto;
- commits pequenos;
- documentação junto com código;
- testes manuais descritos claramente.
