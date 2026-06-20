# Model Routing

## Estratégia recomendada

- **Kimi K2.5**: modelo padrão para coding diário, refatoração pequena e leitura de contexto grande.
- **Kimi K2.7 Code**: tarefas de programação mais longas, mudanças multi-arquivo e debugging difícil.
- **Mistral Medium 3.5**: orquestração, arquitetura, revisão de milestone e decisões estruturais.
- **Higgsfield**: geração de concept art, imagens, assets visuais e material promocional.

## Uso sugerido por fase

| Fase | Modelo principal | Observação |
|---|---|---|
| Auditoria do repo | Mistral Medium 3.5 | Gera plano e riscos |
| Rebranding | Kimi K2.5 | Mudanças textuais/UI |
| Tauri/macOS | Kimi K2.7 Code | Mudanças técnicas multi-arquivo |
| Sistemas brasileiros | Kimi K2.7 Code | Simulação e tipos |
| Revisão de arquitetura | Mistral Medium 3.5 | Depois de cada milestone |
| Assets brasileiros | Higgsfield + Kimi | Kimi cria prompts e organiza outputs |

## Convenção de custo

Use Kimi para 80% das tarefas e Mistral para 20% ou menos.

## Comando Aider com OpenRouter

```bash
export OPENROUTER_API_KEY="COLE_SUA_KEY_AQUI"

# Kimi K2.5
cd o-prefeito
aider --model openrouter/moonshotai/kimi-k2.5

# Kimi K2.7 Code
aider --model openrouter/moonshotai/kimi-k2.7-code

# Mistral Medium 3.5, use para revisão/arquitetura
aider --model openrouter/mistralai/mistral-medium-3-5
```

## Política de uso

- Nunca peça para o modelo implementar o jogo inteiro.
- Sempre peça uma tarefa pequena.
- Sempre exigir build ao fim.
- Sempre exigir atualização de `TASKS.md` e `CHANGELOG_AGENT.md`.
