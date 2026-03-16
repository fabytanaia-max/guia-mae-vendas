# Story: E-commerce Internacional - Low Ticket Variant v1 (PT)

## Status
InProgress

## Story
**As a** operador do e-commerce internacional,  
**I want** uma variante de landing focada em oferta low ticket (Mini Kit),  
**so that** eu possa testar aquisicao com menor friccao e comparar CAC/CPP com a oferta principal.

## Acceptance Criteria
1. Criar variante de landing em `antigravity/ecommerce-internacional-pt/low-ticket.html`.
2. Exibir oferta focada no Mini Kit (6 pecas) com faixa de preco low ticket.
3. Manter checkout hibrido (gateway local + USDC opcional).
4. Manter tracking de funil com identificacao de oferta (`offer_type=low_ticket`).
5. Atualizar checklist e file list na story.
6. Executar quality gates (`npm run lint`, `npm run typecheck`, `npm test`).

## Tasks / Subtasks
- [x] Criar story e definir escopo (AC: 1-6)
- [x] Criar variante low ticket da landing (AC: 1, 2)
- [x] Reutilizar checkout hibrido existente (AC: 3)
- [x] Ajustar tracking para identificar oferta low ticket (AC: 4)
- [x] Atualizar story com logs e file list (AC: 5)
- [x] Executar quality gates (AC: 6)

## Dev Notes
- Faixa low ticket para teste: 24,90 EUR vs 19,90 EUR.
- Oferta principal continua em `index.html`.
- Variante low ticket deve ser usada em campanha dedicada.

## Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-16 | 0.1 | Story criada | @sm |
| 2026-03-16 | 0.2 | Variante low ticket implementada | @dev |
| 2026-03-16 | 0.3 | Quality gates executados e registrados | @dev |

## Dev Agent Record
### Agent Model Used
GPT-5 (Codex)

### Debug Log References
- `npm run lint`: sucesso com 41 warnings preexistentes fora do escopo da story.
- `npm run typecheck`: sucesso.
- `npm test`: falha com `spawn EPERM` (jest-worker) no ambiente.

### Completion Notes List
- Criada landing dedicada para teste low ticket (`low-ticket.html`).
- Script comum atualizado para ler configuracao por pagina via `data-*` no `body`.
- Tracking inclui identificacao de oferta (`offerType`) no funil e no checkout.
- Checkout hibrido mantido com fluxo `pending -> callback_received -> paid`.

### File List
- docs/stories/story-ecommerce-low-ticket-variant-v1-pt.md
- antigravity/ecommerce-internacional-pt/low-ticket.html
- antigravity/ecommerce-internacional-pt/scripts.js

## QA Results
- Lint: aprovado (warnings preexistentes).
- Typecheck: aprovado.
- Testes: bloqueado por erro de ambiente (`spawn EPERM`).
