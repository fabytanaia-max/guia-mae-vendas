# Story: E-commerce Internacional - Gateway Scaffold (CV)

## Status
InProgress

## Story
**As a** operador do e-commerce em Cabo Verde,  
**I want** um scaffold de checkout com gateway local principal e USDC opcional,  
**so that** eu consiga iniciar validacao comercial com fluxo tecnico pronto para credenciais reais.

## Acceptance Criteria
1. Adicionar bloco de checkout na landing `antigravity/ecommerce-internacional-pt/`.
2. Permitir escolha de metodo: `Local Gateway` e `USDC (Opcional)`.
3. Criar estrutura de pedido com status `pending`.
4. Simular fluxo de `callback` (retorno UX) e `webhook` (confirmacao real).
5. Manter tracking minimo no funil (`ViewContent`, `AddToCart`, `InitiateCheckout`).
6. Criar arquivo de exemplo para credenciais de gateway sem dados sensiveis.

## Tasks / Subtasks
- [x] Criar story e detalhar escopo (AC: 1-6)
- [x] Implementar UI de checkout na landing (AC: 1, 2)
- [x] Implementar logica de pedidos e status (AC: 3, 4)
- [x] Integrar tracking no novo fluxo (AC: 5)
- [x] Adicionar arquivo de configuracao exemplo (AC: 6)
- [x] Executar quality gates e registrar resultado

## Dev Notes
- Sem backend real nesta fase.
- Webhook sera simulado no front para validar o fluxo funcional.
- Confirmacao final deve seguir regra: callback nao fecha pedido, webhook fecha pedido.

## Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-16 | 0.1 | Story criada | @sm |
| 2026-03-16 | 0.2 | Checkout hibrido com callback/webhook simulados | @dev |
| 2026-03-16 | 0.3 | Quality gates executados e registrados | @dev |

## Dev Agent Record
### Agent Model Used
GPT-5 (Codex)

### Debug Log References
- `npm run lint`: sucesso com 41 warnings preexistentes fora do escopo.
- `npm run typecheck`: sucesso.
- `npm test`: falha com `spawn EPERM` (jest-worker) no ambiente.

### Completion Notes List
- Checkout hibrido implementado na landing com escolha entre gateway local e USDC.
- Fluxo de pedido implementado com estados `pending`, `callback_received`, `paid`.
- Regra operacional aplicada: callback atualiza UX; webhook confirma pagamento final.
- Arquivo de credenciais-exemplo criado sem dados sensiveis.

### File List
- docs/stories/story-ecommerce-gateway-scaffold-cv.md
- antigravity/ecommerce-internacional-pt/index.html
- antigravity/ecommerce-internacional-pt/styles.css
- antigravity/ecommerce-internacional-pt/scripts.js
- antigravity/ecommerce-internacional-pt/gateway-config.example.json

## QA Results
- Lint: aprovado (warnings preexistentes).
- Typecheck: aprovado.
- Testes: bloqueado por erro de ambiente (`spawn EPERM`).
