/* global document */
const content = {
  brand: 'IEER',
  badge: 'Instalacoes Eletricas e Energias Renovaveis',
  headline: 'A energia certa para proteger o seu espaco e reduzir custos.',
  subheadline:
    'Com a IEER, voce tem instalacoes eletricas seguras, energia renovavel bem dimensionada e execucao profissional do inicio ao fim.',
  primaryCta: 'Quero um orcamento tecnico',
  finalCtaTitle: 'Vamos desenhar a melhor solucao para o seu caso?',
  finalCtaText: 'Receba uma proposta clara com escopo, prazo e investimento, sem surpresas.',
  contactCta: 'Falar com a IEER no WhatsApp',
  contactLine: 'Sr. Atlano - Atendimento direto: +238 981 26 46',
  whatsappNumber: '2389812646',
  whatsappMessage: 'Ola Sr. Atlano, gostaria de pedir um orcamento tecnico da IEER.',
  footer: 'IEER - Instalacoes Eletricas e Energias Renovaveis',
  highlights: [
    'Mais seguranca eletrica para residencias e negocios.',
    'Menor desperdicio de energia e melhor eficiencia no consumo.',
    'Acompanhamento tecnico para evitar falhas e paragens.',
  ],
  services: [
    {
      title: 'Instalacoes eletricas residenciais',
      text: 'Montagem, renovacao e organizacao de circuitos para dar seguranca e estabilidade no dia a dia.',
    },
    {
      title: 'Instalacoes comerciais',
      text: 'Solucoes para lojas e empresas com infraestrutura preparada para crescimento da operacao.',
    },
    {
      title: 'Energia solar fotovoltaica',
      text: 'Projeto e implementacao com foco em retorno financeiro e autonomia energetica.',
    },
    {
      title: 'Manutencao e diagnostico',
      text: 'Inspecao tecnica, identificacao de riscos e plano de acao para evitar avarias recorrentes.',
    },
  ],
  benefits: [
    {
      title: 'Execucao com criterio tecnico',
      text: 'Cada intervencao segue uma logica de seguranca, desempenho e durabilidade.',
    },
    {
      title: 'Orcamento transparente',
      text: 'Voce sabe antecipadamente o que sera feito, quanto custa e quanto tempo leva.',
    },
    {
      title: 'Eficiência com foco em poupanca',
      text: 'As solucoes sao pensadas para reduzir consumo sem comprometer conforto e operacao.',
    },
    {
      title: 'Suporte apos entrega',
      text: 'A IEER acompanha o pos-servico para garantir funcionamento confiavel.',
    },
  ],
  steps: [
    {
      title: '1. Visita e diagnostico',
      text: 'Levantamos as necessidades reais do local e os pontos de risco ou melhoria.',
    },
    {
      title: '2. Proposta tecnica',
      text: 'Apresentamos solucao recomendada com materiais, prazo de execucao e investimento.',
    },
    {
      title: '3. Execucao e testes',
      text: 'Implementamos o servico com validacao tecnica para garantir seguranca e desempenho.',
    },
    {
      title: '4. Entrega e acompanhamento',
      text: 'Entregamos com orientacao pratica e suporte para manter o sistema estavel.',
    },
  ],
  projects: [
    {
      title: 'Requalificacao eletrica residencial',
      text: 'Atualizacao completa para reduzir riscos, melhorar distribuicao e suportar novos equipamentos.',
    },
    {
      title: 'Adequacao eletrica de espaco comercial',
      text: 'Reforco de capacidade e organizacao tecnica para operar sem interrupcoes por sobrecarga.',
    },
    {
      title: 'Implementacao de energia solar',
      text: 'Sistema pensado para reduzir a fatura mensal e aumentar previsibilidade de custos.',
    },
  ],
};

function setText(key, value) {
  const el = document.querySelector(`[data-text="${key}"]`);
  if (el) el.textContent = value;
}

function renderList(id, items) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    root.appendChild(li);
  });
}

function renderCards(id, items) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
    root.appendChild(card);
  });
}

function renderSteps() {
  const root = document.getElementById('steps-list');
  if (!root) return;
  root.innerHTML = '';

  content.steps.forEach((step, index) => {
    const row = document.createElement('article');
    row.className = 'step';
    row.innerHTML = `
      <div class="step-index">${index + 1}</div>
      <div>
        <h3>${step.title}</h3>
        <p>${step.text}</p>
      </div>
    `;
    root.appendChild(row);
  });
}

function init() {
  setText('brand', content.brand);
  setText('badge', content.badge);
  setText('headline', content.headline);
  setText('subheadline', content.subheadline);
  setText('primaryCta', content.primaryCta);
  setText('finalCtaTitle', content.finalCtaTitle);
  setText('finalCtaText', content.finalCtaText);
  setText('contactCta', content.contactCta);
  setText('footer', content.footer);

  const contactLine = document.getElementById('contact-line');
  if (contactLine) contactLine.textContent = content.contactLine;

  const waUrl = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(content.whatsappMessage)}`;
  document.querySelectorAll('.wa-link').forEach((el) => {
    el.setAttribute('href', waUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  renderList('hero-highlights', content.highlights);
  renderCards('services-list', content.services);
  renderCards('benefits-list', content.benefits);
  renderCards('projects-list', content.projects);
  renderSteps();
}

document.addEventListener('DOMContentLoaded', init);
