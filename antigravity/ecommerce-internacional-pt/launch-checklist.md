# Launch Checklist - E-commerce PT

## 1) Publicacao
- [ ] Subir `index.html`, `low-ticket.html`, `styles.css`, `scripts.js`
- [ ] Confirmar carregamento mobile e desktop
- [ ] Confirmar que checkout aparece em ambas as paginas

## 2) Tracking
- [ ] Abrir URL com UTM e validar persistencia no browser
- [ ] Clicar CTA e validar `AddToCart` no `window.dataLayer`
- [ ] Iniciar checkout e validar `InitiateCheckout`
- [ ] Simular callback/webhook e validar mudanca de status

## 3) Campanhas
- [ ] Gerar URLs finais: `node generate-campaign-urls.js <BASE_URL>`
- [ ] Usar links de `campaign-urls.generated.md` no Ads Manager
- [ ] Separar campanhas por oferta: `main` e `low_ticket`
- [ ] Ativar variantes A/B de preco

## 4) Orcamento e Janela
- [ ] Definir budget diario (72h sem mudancas bruscas)
- [ ] Registrar horario de inicio exato
- [ ] Nao editar criativos no meio da janela de leitura

## 5) Decisao 72h
- [ ] Ler CTR, AddToCart, InitiateCheckout e custo por compra
- [ ] Comparar `main` vs `low_ticket`
- [ ] Decidir: escalar, ajustar ou pausar
