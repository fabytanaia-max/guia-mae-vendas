# Story: E-commerce Internacional - Campaign Launch Pack

## Status
InProgress

## Story
**As a** operador de tráfego,  
**I want** um pack de lançamento com geração de URLs finais e checklist operacional,  
**so that** eu consiga publicar campanhas rapidamente com padrão consistente.

## Acceptance Criteria
1. Criar script para gerar URLs de campanha com `BASE_URL` real.
2. Gerar links para ofertas `main` e `low_ticket`, canais `meta` e `tiktok`, variantes `A` e `B`.
3. Salvar saída em arquivo markdown consumível.
4. Criar checklist de lançamento (tracking, QA, orçamento, decisão 72h).
5. Executar quality gates (`npm run lint`, `npm run typecheck`, `npm test`).

## Tasks / Subtasks
- [x] Criar story e escopo (AC: 1-5)
- [x] Implementar gerador de URLs (AC: 1, 2, 3)
- [x] Criar checklist de lançamento (AC: 4)
- [x] Executar quality gates e registrar resultado (AC: 5)

## Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-16 | 0.1 | Story criada | @sm |
| 2026-03-16 | 0.2 | Gerador de URLs e checklist de lançamento adicionados | @dev |
| 2026-03-16 | 0.3 | Quality gates executados e registrados | @dev |

## Dev Agent Record
### Agent Model Used
GPT-5 (Codex)

### Debug Log References
- `node antigravity/ecommerce-internacional-pt/generate-campaign-urls.js https://example.com/ecommerce-pt`
- `npm run lint`: sucesso com warnings preexistentes fora do escopo.
- `npm run typecheck`: sucesso.
- `npm test`: falha com `spawn EPERM` (jest-worker) no ambiente.

### Completion Notes List
- Script de geração automática de URLs de campanha implementado.
- Arquivo gerado de exemplo criado para uso direto no Ads Manager.
- Checklist de lançamento criado com sequência operacional ponta a ponta.

### File List
- docs/stories/story-ecommerce-campaign-launch-pack.md
- antigravity/ecommerce-internacional-pt/generate-campaign-urls.js
- antigravity/ecommerce-internacional-pt/campaign-urls.generated.md
- antigravity/ecommerce-internacional-pt/launch-checklist.md

## QA Results
- Lint: aprovado (warnings preexistentes).
- Typecheck: aprovado.
- Testes: bloqueado por erro de ambiente (`spawn EPERM`).
