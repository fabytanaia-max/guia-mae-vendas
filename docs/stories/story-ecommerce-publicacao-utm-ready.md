# Story: E-commerce Internacional - Publicacao e UTM Ready

## Status
InProgress

## Story
**As a** operador de trafego do e-commerce,  
**I want** paginas e tracking prontos para publicacao com padrao UTM,  
**so that** eu possa lancar campanhas e ler os dados por canal/oferta sem retrabalho.

## Acceptance Criteria
1. Implementar captura de UTM nas landing pages do e-commerce.
2. Persistir atribuicao (UTM) para uso no funil e no checkout.
3. Incluir UTM em eventos de tracking e na estrutura de pedido.
4. Permitir forcar variante de preco via query string (`price_variant=A|B`).
5. Criar arquivo de links de campanha exemplo para Meta e TikTok.
6. Executar quality gates (`npm run lint`, `npm run typecheck`, `npm test`).

## Tasks / Subtasks
- [x] Criar story e definir escopo (AC: 1-6)
- [x] Implementar leitura e persistencia de UTM (AC: 1, 2)
- [x] Enriquecer tracking e pedido com atribuicao (AC: 3)
- [x] Implementar override de variante via URL (AC: 4)
- [x] Criar arquivo de links exemplo (AC: 5)
- [x] Executar quality gates e registrar resultado (AC: 6)

## Dev Notes
- UTM alvo: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- Override de variante: `?price_variant=A` ou `?price_variant=B`.
- As duas paginas usam o mesmo `scripts.js`.

## Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-16 | 0.1 | Story criada | @sm |
| 2026-03-16 | 0.2 | UTM + override de variante implementados | @dev |
| 2026-03-16 | 0.3 | Quality gates executados e registrados | @dev |

## Dev Agent Record
### Agent Model Used
GPT-5 (Codex)

### Debug Log References
- `npm run lint`: sucesso com 41 warnings preexistentes fora do escopo da story.
- `npm run typecheck`: sucesso.
- `npm test`: falha com `spawn EPERM` (jest-worker) no ambiente.

### Completion Notes List
- Captura de UTM implementada e persistida em `localStorage`.
- Eventos de tracking e estrutura de pedido enriquecidos com atribuicao UTM.
- Override de variante de preco por URL implementado via `price_variant=A|B`.
- Arquivo com URLs exemplo para campanhas Meta/TikTok criado.

### File List
- docs/stories/story-ecommerce-publicacao-utm-ready.md
- antigravity/ecommerce-internacional-pt/scripts.js
- antigravity/ecommerce-internacional-pt/campaign-urls.example.md

## QA Results
- Lint: aprovado (warnings preexistentes).
- Typecheck: aprovado.
- Testes: bloqueado por erro de ambiente (`spawn EPERM`).
