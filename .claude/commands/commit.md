---
name: commit
description: Realiza commits Git automaticamente com análise de diff, geração inteligente de mensagem e conformidade com padrões do projeto.
model: haiku
---

Realize o commit das alterações atuais seguindo o fluxo abaixo:

## 1️⃣ Validação Inicial

1. Execute `git status` para verificar mudanças
2. Identifique untracked files que podem ser adicionados (EXCLUINDO sensíveis: .env, secrets, credentials.json, etc)
3. Execute `git add` para adicionar os untracked files seguros
4. Se houver arquivos sensíveis, avise o desenvolvedor e NÃO os adicione

## 2️⃣ Análise de Código

1. Execute `git diff HEAD` para entender todas as alterações
2. Analise os arquivos modificados para inferir:
   - **Tipo**: feat, fix, refactor, docs, style, test, chore, perf, build
   - **Escopo**: área afetada (tributos, parcelas, api, ui, core, dev, etc)
   - **Descrição**: resumo objetivo do que foi alterado

## 3️⃣ Extração de Metadados

1. Identifique se há breaking changes nas alterações
2. Liste os arquivos impactados

## 4️⃣ Geração de Mensagem de Commit

Siga o formato obrigatório do `.gitmessage`:

```
<tipo>(<escopo>): <mensagem curta>

- Mudança 1
- Mudança 2
```

**Exemplo:**
```
#17698 chore(dev): adicionar padrões de commit e instruções Claude

- Adicionar comando automático de commit em .claude/commands/commit.md
- Adicionar template padrão .gitmessage com formato obrigatório
- Adicionar instruções CLAUDE.md com políticas de desenvolvimento
```

## 5️⃣ Apresentação para Revisão

Apresente ao desenvolvedor:
1. **Status**: resultado do `git status`
2. **Mudanças**: resumo do `git diff`
3. **Mensagem**: a mensagem de commit gerada
4. **Pergunta**: Você aprova este commit? (aguarde resposta explícita)

## 6️⃣ Execução do Commit

Após aprovação explícita do desenvolvedor:

1. Execute `git commit` com a mensagem gerada (SEM adicionar rodapés como "Generated with Claude Code")
2. Valide o sucesso: `git log -1 --format=%B`
3. Se pre-commit hooks modificarem arquivos:
   - Avise o desenvolvedor
   - Solicite permissão para fazer amend
   - Execute: `git add .` + `git commit --amend --no-edit`

## ✅ Checklist Obrigatório

- [ ] Verificou `git status` e listou mudanças
- [ ] Adicionou untracked files seguros (sem sensíveis)
- [ ] Analisou `git diff` para entender alterações
- [ ] Inferiu tipo, escopo e descrição corretos
- [ ] Gerou mensagem seguindo `.gitmessage`
- [ ] Apresentou mudanças para revisão
- [ ] Obteve aprovação EXPLÍCITA do desenvolvedor
- [ ] Executou commit com a mensagem gerada
- [ ] Validou sucesso com `git log`

## ⚠️ Proteções Mantidas

- ❌ NUNCA commiteará arquivos sensíveis (.env, credentials, secrets)
- ❌ NUNCA fará push sem comando explícito
- ✅ SEMPRE solicita aprovação explícita antes de commit
- ✅ SEMPRE valida sucesso do commit