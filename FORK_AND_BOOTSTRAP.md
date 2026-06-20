# Fork and Bootstrap

## 1. Fazer fork

No GitHub:

1. Abra `https://github.com/amilich/isometric-city`.
2. Clique em `Fork`.
3. Nome recomendado do fork: `o-prefeito` ou `prefeito-simulador-cidade-brasileira`.

## 2. Clonar no Pi 5

```bash
git clone https://github.com/SEU_USUARIO/o-prefeito.git
cd o-prefeito
```

Se o fork mantiver o nome original:

```bash
git clone https://github.com/SEU_USUARIO/isometric-city.git o-prefeito
cd o-prefeito
```

## 3. Branch inicial

```bash
git checkout -b prefeito-brasil-mvp
```

## 4. Copiar os documentos deste ZIP

Copie todos os `.md` para a raiz do repositório, mantendo a pasta `agent-prompts/`.

```bash
unzip prefeito_isocity_agent_docs.zip -d /tmp/prefeito_docs
cp -R /tmp/prefeito_docs/prefeito_isocity_agent_docs/* .
git add .
git commit -m "Add agent docs for O Prefeito Brazilian city builder"
```

## 5. Confirmar estado inicial

```bash
npm install
npm run build
```

## 6. Primeiro prompt ao agente

Use o prompt de `agent-prompts/01_ORCHESTRATOR_MISTRAL.md` para revisar o plano e gerar as primeiras tarefas.

Depois use `agent-prompts/02_CODER_KIMI.md` para implementar a primeira tarefa pequena.
