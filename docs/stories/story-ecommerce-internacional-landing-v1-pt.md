# Story: E-commerce Internacional - Landing v1 PT

## Status
InProgress

## Story
**As a** operador do projeto E-commerce Internacional,  
**I want** uma landing page de validacao em PT-PT para o Kit Hermetico Premium,  
**so that** eu consiga medir interesse real, iniciar testes de preco e capturar intencao de compra.

## Acceptance Criteria
1. Criar a base do projeto em `antigravity/ecommerce-internacional-pt/`.
2. Landing em PT-PT com copy da oferta definida no vault (headline, subheadline, beneficios e FAQ).
3. Exibir bundles Mini (6), Principal (12) e Family (18), com destaque do Kit 12 pecas.
4. Exibir preco ancora `79,90 EUR` e preco de oferta `49,90 EUR`.
5. Implementar teste A/B simples de preco para variante B `44,90 EUR` sem backend.
6. Incluir tracking minimo de eventos: `ViewContent`, `AddToCart`, `InitiateCheckout`.
7. Sem publicacao/deploy nesta fase.

## Tasks / Subtasks
- [x] Preparar estrutura do projeto (AC: 1, 7)
  - [x] Criar pasta `antigravity/ecommerce-internacional-pt/`
  - [x] Criar arquivos base `index.html`, `styles.css` e `scripts.js`
- [x] Criar layout e conteudo da landing (AC: 2)
  - [x] Hero com headline/subheadline/CTAs em PT-PT
  - [x] Blocos de beneficios, prova/confianca e FAQ
- [x] Implementar oferta comercial (AC: 3, 4)
  - [x] Bloco de preco com ancora e oferta
  - [x] Cards de bundles com destaque no kit principal
- [x] Implementar teste A/B de preco (AC: 5)
  - [x] Variacao A/B em front-end com persistencia local
  - [x] Indicacao da variante ativa no DOM
- [x] Implementar tracking minimo (AC: 6)
  - [x] Disparo de `ViewContent` no carregamento
  - [x] Disparo de `AddToCart` e `InitiateCheckout` nos CTAs

## Dev Notes
- Idioma: PT-PT.
- Produto: Kit Hermetico Premium.
- Oferta base: de `79,90 EUR` por `49,90 EUR`.
- Teste B: `44,90 EUR`.
- Tracking via `window.dataLayer` (fallback local sem dependencia externa).

### Testing
- Abrir `index.html` localmente e validar desktop/mobile.
- Validar alternancia A/B por refresh.
- Confirmar eventos no `window.dataLayer`.

## Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-16 | 0.1 | Story criada | @sm |
| 2026-03-16 | 0.2 | Landing v1 implementada | @dev |
| 2026-03-16 | 0.3 | Quality gates executados e registrados | @dev |

## Dev Agent Record
### Agent Model Used
GPT-5 (Codex)

### Debug Log References
- `npm run lint`: sucesso com 41 warnings preexistentes fora do escopo da story.
- `npm run typecheck`: sucesso.
- `npm test`: falha com `spawn EPERM` (jest-worker) no ambiente.

### Completion Notes List
- Landing v1 criada para validacao comercial da oferta.
- Preco A/B implementado sem backend.
- Tracking minimo adicionado para eventos principais do funil.

### File List
- docs/stories/story-ecommerce-internacional-landing-v1-pt.md
- antigravity/ecommerce-internacional-pt/index.html
- antigravity/ecommerce-internacional-pt/styles.css
- antigravity/ecommerce-internacional-pt/scripts.js

## QA Results
- Lint: aprovado (warnings preexistentes).
- Typecheck: aprovado.
- Testes: bloqueado por erro de ambiente (`spawn EPERM`).
