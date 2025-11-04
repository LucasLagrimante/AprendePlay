# AprendePlay

Projeto educativo multilíngue (pt/en/es) para ensinar números, letras e cores a crianças pequenas.
Gera áudio via *Web Speech API* e usa *OpenMoji* (SVG) via CDN para imagens.

## Como usar localmente

1. Atualize o campo `homepage` em `package.json` para `https://<YOUR_GH_USERNAME>.github.io/aprendeplay`
2. Instale dependências:
```bash
npm install
```
3. Rodar em desenvolvimento:
```bash
npm run dev
```

## Deploy no GitHub Pages

1. Commit e push no GitHub em um repositório chamado `aprendeplay`.
2. Ajuste `homepage` no `package.json`.
3. Rode:
```bash
npm run deploy
```

> O script `deploy` utiliza `gh-pages` e publica a pasta `dist`.

## Estrutura
- `src/components` - componentes reutilizáveis (CardAprendizado, LanguageSelector)
- `src/data` - conteúdos (numbers.json, colors.json, letters.json)
- `src/i18n` - traduções (pt, en, es)
- `src/utils/speak.ts` - utilitário para Web Speech API

## Observações
- A Web Speech API depende do navegador. Teste no Chrome, Edge ou Safari.
- OpenMoji CDN é usada para ícones; versões podem variar. Se algum SVG não carregar, substitua o código do ícone no JSON.
