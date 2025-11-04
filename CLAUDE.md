# CLAUDE.md

Este arquivo fornece orientação ao Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Comandos Rápidos

### Desenvolvimento
```bash
npm run dev       # Inicia servidor Vite com hot reload (http://localhost:5173)
npm run build     # Constrói bundle de produção para dist/
npm run preview   # Visualiza build de produção localmente
npm run deploy    # Faz deploy para GitHub Pages (requer GitHub Pages configurado)
```

### Informações do Projeto
- **Homepage:** https://lucaslagrimante.github.io/aprendeplay
- **Repositório:** Aplicação React privada (não publicada no npm)
- **Versão Node.js:** 20.17.0 (veja `.github/workflows/deploy.yml`)

## Stack de Tecnologias

**Principal:**
- React 18.2.0 com TypeScript 5.5.0
- Vite 5.0.0 (ferramenta de build)
- React Router 6 (roteamento lado do cliente)
- Tailwind CSS 4.0 (estilização)

**Bibliotecas Principais:**
- **Framer Motion 10.12.16** - Todas as animações (entrada de página, interações de botão, confete)
- **i18next 23.0.0** - Internacionalização (3 idiomas: Português, Inglês, Espanhol)
- **Web Speech API (nativa)** - Pronunciação de áudio (veja `src/utils/speak.ts`)
- **Vibration API (nativa)** - Feedback háptico em dispositivos móveis
- **OpenMoji CDN** - SVGs de ícones carregados dinamicamente

## Visão Geral da Arquitetura

### Rotas de Página
- `/` - Página inicial com menu de categorias
- `/letters` - Aprenda letras
- `/numbers` - Aprenda números
- `/colors` - Aprenda cores
- `/colors-quiz` - Jogo interativo de correspondência de cores

### Componentes Principais e Fluxo de Dados

**Páginas (Componentes Container):**
- Cada página (`Letters.tsx`, `Numbers.tsx`, `Colors.tsx`) carrega dados JSON de `src/data/` e renderiza grades de cartões
- `ColorsQuiz.tsx` gerencia o estado do jogo (pergunta atual, pontuação, sequência, lógica de embaralhamento)
- Todas as páginas usam Framer Motion para animações de entrada

**Componentes:**
- `CardAprendizado.tsx` - Cartão reutilizável para itens de aprendizagem; dispara fala ao clicar
- `Navigation.tsx` - Barra de navegação superior com seletor de idioma e links de rotas
- `LanguageSelector.tsx` - Dropdown para alternar entre pt/en/es
- `GameButton.tsx` - Botão estilizado com feedback háptico (usado no quiz)

**Gerenciamento de Estado:**
- Estado de nível de componente com `useState` (simples, sem necessidade de Redux)
- Estado baseado em URL via React Router
- i18next gerencia a preferência de idioma global

**Estrutura de Dados:**
Cada JSON em `src/data/` contém itens com:
```typescript
{ id, pt, en, es, icon, color? }  // color é apenas para colors.json
```

### Internacionalização (i18n)

**Arquivos principais:**
- `src/i18n/index.ts` - Configuração i18next (detecção de idioma, carregamento de tradução)
- `src/i18n/pt.json`, `en.json`, `es.json` - Traduções de texto da UI
- `src/data/*.json` - Traduções de itens de aprendizagem (cores, letras, números todos têm campos pt/en/es)

**Alternância de idioma:**
- Controlada via componente `LanguageSelector` na Navigation
- Persiste na instância i18next durante a sessão
- A pronunciação da Web Speech API se ajusta: `pt-BR`, `es-ES`, `en-US`

### Animações e Interações

**Uso do Framer Motion:**
- Animações de entrada em nível de página com `AnimatePresence`
- Escalas de botão ao passar o mouse/tocar e transições
- Sucesso do quiz: Efeito de partículas (confete) e animações de celebração
- Flip/escala de cartão na interação

**APIs Nativas:**
- **Web Speech API:** `speak(text, lang)` em `src/utils/speak.ts` - chamada ao clicar em cartões
- **Vibration API:** `vibrate(pattern)` em `src/utils/vibrate.ts` - padrões de toque em botões
  - Sucesso: `[30, 50, 30]`
  - Erro: `[100, 50, 100, 50, 100]`
  - Pressão longa: `[200]`

### Lógica do Jogo de Quiz (`ColorsQuiz.tsx`)

Variáveis de estado principais:
- `currentColor` - A cor a adivinhar (selecionada de colors.json)
- `options` - Array de 4 objetos de cor (1 correto, 3 aleatórios)
- `score` - Pontuação total (10 pontos por resposta correta)
- `streak` - Respostas corretas consecutivas
- `answered` - Booleano para evitar multi-clique durante feedback

Fluxo:
1. O sistema escolhe uma cor aleatória de `colors.json`
2. Seleciona 3 outras cores aleatórias como distratores
3. O usuário clica em um dos 4 botões de cor
4. Feedback visual/áudio imediato (som de sucesso toca via speech API)
5. Vibração háptica em dispositivos móveis
6. Avança automaticamente para a próxima pergunta após atraso
7. Ao responder errado, embaralha as opções de cor novamente

## Build e Deploy

**Processo de Build:**
- Vite agrupa React + TS para pasta `dist/`
- CSS do Tailwind é compilado para `index.css`
- Ativos (logos) em `src/assets/` são empacotados
- Ícones OpenMoji carregados dinamicamente do CDN (não empacotados)

**Deployment no GitHub Pages:**
- Configurado em `.github/workflows/deploy.yml`
- Dispara ao fazer push para a branch `main`
- Executa `npm run build` e depois faz deploy da pasta `dist/`
- URL base definida como `/AprendePlay/` em produção (veja `vite.config.ts`)

**Importante:** Atualize o campo `homepage` em `package.json` se estiver fazendo fork:
```json
"homepage": "https://<SEU_USUARIO>.github.io/aprendeplay"
```

## Detalhes de Implementação Importantes

### TypeScript
- Modo strict ativado
- Todos os componentes têm props tipadas via interfaces
- Sem tipos `any` usados

### Tailwind CSS
- Abordagem utilitária para toda a estilização
- `tailwind.config.ts` configurado para escanear todos os arquivos `.tsx`/`.ts`
- Estilos globais em `src/index.css` (diretivas Tailwind)

### Design Responsivo
- Abordagem mobile-first com breakpoints do Tailwind
- Grades de cartões: 2 colunas em mobile, 3 em desktop (`grid-cols-2 md:grid-cols-3`)
- Navegação responsiva com considerações de menu móvel

### Performance
- Vite lida com divisão de código automaticamente
- Ícones carregados sob demanda do CDN (não empacotados)
- Apenas as traduções do idioma ativo carregadas pelo i18next
- Framer Motion configurado para animações aceleradas por GPU

### Sistema de Ícones
- Ícones definidos em JSON por código OpenMoji (ex: `"1F534"` para círculo vermelho)
- Construção de URL: `https://cdn.jsdelivr.net/npm/openmoji@15.0.0/color/svg/{code}.svg`
- Se o CDN falhar ou ícones não carregarem, verifique se o código corresponde à nomenclatura OpenMoji

## Tarefas Comuns de Desenvolvimento

### Adicionando uma Nova Categoria de Aprendizagem
1. Crie `src/data/new-category.json` com estrutura: `[{ id, pt, en, es, icon, color? }, ...]`
2. Crie `src/pages/NewCategory.tsx` - copie padrão de `Colors.tsx` ou `Letters.tsx`
3. Adicione rota a `src/App.tsx`
4. Atualize traduções em `src/i18n/{pt,en,es}.json` para o nome da categoria
5. Atualize menu `Home.tsx` para linkar para a nova categoria

### Adicionando um Novo Idioma
1. Crie `src/i18n/new-lang.json` com todas as chaves de texto da UI
2. Atualize `src/i18n/index.ts` para incluir novo idioma nos recursos
3. Adicione código de idioma às opções de `LanguageSelector.tsx`
4. Adicione idioma aos arquivos JSON de dados (adicione campo `new-lang-code` a cada item)
5. Atualize localidade da Web Speech API em `src/utils/speak.ts` se necessário

### Modificando Regras do Jogo de Quiz
- Lógica em `ColorsQuiz.tsx` a partir da função `handleSelectColor()`
- Incremento de pontuação na chamada `setScore()`
- Lógica de sequência em lógica `setStreak()`
- Atraso de avanço automático em `setTimeout()` dentro da seção de feedback

### Estilizando Componentes
- Use classes de utilidade Tailwind no JSX (sem arquivos CSS necessários para componentes)
- Estilos globais em `src/index.css`
- Animações específicas do componente via Framer Motion `motion.div`, `motion.button`

## Dicas de Debugging

### Web Speech API Não Funcionando
- Teste no Chrome, Edge ou Safari (Firefox tem suporte limitado)
- Verifique erros de síntese de fala no console do navegador
- Verifique se o código de idioma corresponde às configurações de idioma do navegador

### Ícones Não Carregando
- Verifique URL do CDN na aba Network do console
- Verifique formato de código OpenMoji em JSON (deve ser código hex de 4-5 dígitos)
- Fallback: Substitua campo `icon` com emoji diretamente em JSON

### Problemas de Layout
- Use classes responsivas do Tailwind (prefixos `md:`, `lg:`)
- Verifique caminhos de conteúdo em `tailwind.config.ts` se as classes não forem geradas
- Use `@apply` do Tailwind em `src/index.css` para grupos de classes reutilizáveis

### i18n Não Atualizando
- Garanta que a mudança de idioma dispare re-render do React (tratado por `LanguageSelector`)
- Verifique se a chave de tradução existe em todos os arquivos JSON de idiomas
- Verifique se `escapeValue: false` permite HTML se necessário nas traduções

### Problemas de Performance
- Animações Framer Motion: Verifique se props `initial`, `animate`, `exit` estão definidos
- Tamanho do bundle: Execute `npm run build` e verifique saída do console
- Mobile: Teste feedback háptico não bloqueia UI (execute em dispositivo real ou Chrome DevTools modo mobile)

## Padrões de Qualidade de Código

- **TypeScript:** Modo strict aplicado, todos os tipos explicitamente definidos
- **React:** Componentes funcionais com hooks, sem componentes de classe
- **CSS:** Apenas utilidades Tailwind (sem BEM ou outras metodologias CSS)
- **Organização de Arquivo:** Componentes em `src/components/`, páginas em `src/pages/`, dados em `src/data/`
- **Padrões de Componentes:** Props tipadas com interfaces, sem spread de props sem validação

## Notas para Trabalho Futuro

- Nenhuma estrutura de testes atualmente instalada (Jest/Vitest)
- Nenhuma configuração ESLint ou Prettier (poderia ser adicionada se necessário)
- Sem API backend ou banco de dados (totalmente estático, apenas lado do cliente)
- Deployment totalmente automatizado via GitHub Actions (sem necessidade de etapas de build manual)
