/* global document */

const content = {
  categories: ['Todos', 'Casacos', 'Bonés', 'Lançamentos'],
  products: [
    {
      id: 'casaco-winner',
      category: 'Casacos',
      title: 'Casaco Winner Black',
      summary: 'Conforto térmico com visual premium para o dia a dia.',
      description:
        'Casaco com foco em conforto, presença e autoestima. Ideal para quem quer uma peça versátil com identidade forte.',
      details: ['Envio para todo o Brasil', 'Tamanhos sob consulta', 'Atendimento direto no WhatsApp'],
      combine: ['Boné Winner Black', 'Camiseta Essential Black'],
      media: [
        { type: 'image', src: 'assets/produto-casaco.webp', alt: 'Casaco Dom Winner - visão do produto' },
        { type: 'image', src: 'assets/modelo-homem-casaco.webp', alt: 'Modelo masculino usando o casaco Dom Winner' },
        { type: 'image', src: 'assets/modelo-mulher-casaco.webp', alt: 'Modelo feminina usando o casaco Dom Winner' },
      ],
    },
    {
      id: 'bone-winner',
      category: 'Bonés',
      title: 'Boné Winner Black',
      summary: 'Estilo urbano com acabamento premium e assinatura da marca.',
      description:
        'Boné preto com logo em destaque para completar o visual com atitude. Modelo pensado para uso diário e combinações versáteis.',
      details: ['Envio para todo o Brasil', 'Ajuste traseiro', 'Acabamento premium'],
      combine: ['Casaco Winner Black', 'Linha Dom Winner'],
      media: [
        { type: 'image', src: 'assets/produto-bone.webp', alt: 'Boné Dom Winner - visão do produto' },
        { type: 'image', src: 'assets/modelo-homem-bone.webp', alt: 'Modelo masculino usando o boné Dom Winner' },
        { type: 'image', src: 'assets/modelo-mulher-bone.webp', alt: 'Modelo feminina usando o boné Dom Winner' },
      ],
    },
    {
      id: 'linha-dom-winner',
      category: 'Lançamentos',
      title: 'Linha Dom Winner',
      summary: 'Peças criadas para transmitir confiança, conforto e autoestima.',
      description:
        'Coleção focada no público brasileiro, com linguagem visual premium para destacar o produto e fortalecer a identidade da marca.',
      details: ['Coleção em evolução', 'Drops semanais', 'Atendimento consultivo'],
      combine: ['Boné Winner Black', 'Casaco Winner Black'],
      media: [
        { type: 'image', src: 'assets/logo-claim.jpeg', alt: 'A marca dos vencedores' },
        { type: 'image', src: 'assets/logo-main.jpeg', alt: 'Assinatura oficial da marca Dom Winner' },
      ],
    },
  ],
  looks: ['Midnight Set', 'Urban Formal', 'Core Drop'],
  metrics: [
    { value: 'Confiança', label: 'como sensação principal' },
    { value: 'Autoestima', label: 'como efeito da marca' },
    { value: 'Conforto', label: 'como base de uso diário' },
    { value: 'Brasil', label: 'vendas focadas no país' },
  ],
  benefits: [
    {
      title: 'Acabamento Premium',
      description: 'Tecidos selecionados e controle de qualidade em cada detalhe.',
    },
    {
      title: 'Identidade Forte',
      description: 'Visual premium com linguagem de marca clara, forte e memorável.',
    },
    {
      title: 'Conforto + Presença',
      description: 'Peças feitas para vestir bem e sustentar confiança em qualquer ambiente.',
    },
    {
      title: 'Atendimento Direto',
      description: 'Contato rápido para apresentar modelos, tamanhos e condições.',
    },
  ],
  trustPoints: [
    { title: 'Envio Brasil', text: 'Atendimento e vendas para todo o Brasil.' },
    { title: 'Pagamento seguro', text: 'Fluxo de compra com suporte no WhatsApp.' },
    { title: 'Troca facilitada', text: 'Política de troca alinhada no atendimento.' },
    { title: 'Suporte humano', text: 'Atendimento real para ajudar na escolha.' },
  ],
  drop: {
    main: {
      title: 'Drop Black Confidence',
      text: 'Lote especial com peças premium para elevar presença e autoestima no dia a dia.',
    },
    side: {
      title: 'Próximo drop',
      text: 'Chame no WhatsApp para garantir seu acesso aos próximos lançamentos.',
    },
  },
  testimonials: [
    {
      title: 'Estilo com identidade',
      description:
        'A marca conseguiu entregar visual forte e conforto de verdade. Virei cliente fixo.',
    },
    {
      title: 'Qualidade surpreendente',
      description:
        'O acabamento e o caimento passam muita confiança. Parece uma marca muito maior.',
    },
    {
      title: 'Compra simples',
      description:
        'Fui atendido rápido no WhatsApp e recebi exatamente o que estava procurando.',
    },
  ],
};

let activeCategory = 'Todos';

function renderCategoryNav() {
  const container = document.getElementById('category-nav');
  if (!container) return;

  container.innerHTML = content.categories
    .map(
      (cat) => `<button class="cat-btn ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>`,
    )
    .join('');

  container.querySelectorAll('.cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat') || 'Todos';
      renderCategoryNav();
      renderProducts();
    });
  });
}

function getFilteredProducts() {
  if (activeCategory === 'Todos') return content.products;
  return content.products.filter((item) => item.category === activeCategory);
}

function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;

  const list = getFilteredProducts();

  container.innerHTML = list
    .map(
      (item) => `
      <article class="product-card" data-product-id="${item.id}">
        <img src="${item.media[0].src}" alt="${item.media[0].alt}" />
        <div class="product-info">
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </div>
      </article>
    `,
    )
    .join('');

  container.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      openProductModal(productId);
    });
  });
}

function renderLookbook() {
  const container = document.getElementById('lookbook');
  if (!container) return;

  container.innerHTML = content.looks
    .map(
      (item) => `
      <article class="look">
        <span>${item}</span>
      </article>
    `,
    )
    .join('');
}

function renderMetrics() {
  const container = document.getElementById('metrics');
  if (!container) return;

  container.innerHTML = content.metrics
    .map(
      (item) => `
      <article class="metric">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
      </article>
    `,
    )
    .join('');
}

function renderBenefits() {
  const container = document.getElementById('benefits');
  if (!container) return;

  container.innerHTML = content.benefits
    .map(
      (item) => `
      <article class="bullet">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `,
    )
    .join('');
}

function renderTrustPoints() {
  const container = document.getElementById('trust-points');
  if (!container) return;

  container.innerHTML = content.trustPoints
    .map(
      (item) => `
      <article class="trust-item">
        <strong>${item.title}</strong>
        <span>${item.text}</span>
      </article>
    `,
    )
    .join('');
}

function renderWeeklyDrop() {
  const container = document.getElementById('weekly-drop');
  if (!container) return;

  container.innerHTML = `
    <article class="drop-main">
      <h3>${content.drop.main.title}</h3>
      <p>${content.drop.main.text}</p>
    </article>
    <article class="drop-side">
      <h3>${content.drop.side.title}</h3>
      <p>${content.drop.side.text}</p>
    </article>
  `;
}

function renderTestimonials() {
  const container = document.getElementById('testimonials');
  if (!container) return;

  container.innerHTML = content.testimonials
    .map(
      (item) => `
      <article class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `,
    )
    .join('');
}

function renderMarquee() {
  const container = document.getElementById('marquee');
  if (!container) return;
  const base = 'DOM WINNER | STREETWEAR PREMIUM | A MARCA DOS VENCEDORES | ';
  container.textContent = base.repeat(12);
}

function renderModalMainMedia(item) {
  if (!item) return '';
  if (item.type === 'video') {
    return `<video controls src="${item.src}" aria-label="${item.alt || 'Video do produto'}"></video>`;
  }
  return `<img src="${item.src}" alt="${item.alt || 'Imagem do produto'}" />`;
}

function renderModalGallery(mediaItems) {
  const media = document.getElementById('modal-media');
  if (!media || !Array.isArray(mediaItems) || mediaItems.length === 0) return;

  let activeIndex = 0;

  const render = () => {
    media.innerHTML = `
      <div class="modal-viewer" id="modal-viewer">
        ${renderModalMainMedia(mediaItems[activeIndex])}
      </div>
      <div class="modal-thumbs" id="modal-thumbs">
        ${mediaItems
          .map((item, index) => {
            const thumbInner =
              item.type === 'video'
                ? `<video muted playsinline src="${item.src}" aria-hidden="true"></video>`
                : `<img src="${item.src}" alt="${item.alt || 'Miniatura do produto'}" />`;
            return `
              <button type="button" class="thumb-btn ${index === activeIndex ? 'active' : ''}" data-thumb-index="${index}" aria-label="Ver mídia ${index + 1}">
                ${thumbInner}
              </button>
            `;
          })
          .join('')}
      </div>
    `;

    media.querySelectorAll('.thumb-btn').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const nextIndex = Number(thumb.getAttribute('data-thumb-index'));
        if (Number.isNaN(nextIndex)) return;
        activeIndex = nextIndex;
        render();
      });
    });
  };

  render();
}

function openProductModal(productId) {
  const product = content.products.find((item) => item.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const title = document.getElementById('modal-title');
  const description = document.getElementById('modal-description');
  const media = document.getElementById('modal-media');
  const details = document.getElementById('modal-details');
  const combine = document.getElementById('modal-combine');
  const cta = document.getElementById('modal-cta');

  if (!modal || !title || !description || !media || !details || !combine || !cta) return;

  title.textContent = product.title;
  description.textContent = product.description;

  renderModalGallery(product.media);

  details.innerHTML = product.details.map((item) => `<li>${item}</li>`).join('');
  combine.innerHTML = product.combine.map((item) => `<div class="combine-item">${item}</div>`).join('');

  const message = encodeURIComponent(`Olá, tenho interesse no produto: ${product.title}`);
  cta.href = `https://wa.me/?text=${message}`;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function setupModalClose() {
  const modal = document.getElementById('product-modal');
  const closeButtons = [
    document.getElementById('modal-close'),
    document.getElementById('modal-close-secondary'),
  ].filter(Boolean);
  if (!modal || closeButtons.length === 0) return;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeButtons.forEach((button) => button.addEventListener('click', closeModal));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

function setupCtaLink() {
  const links = [document.getElementById('cta-link'), document.getElementById('floating-cta')];
  const message = encodeURIComponent('Olá, quero conhecer os produtos da Dom Winner.');

  links.forEach((link) => {
    if (!link) return;
    link.href = `https://wa.me/?text=${message}`;
  });
}

function setYear() {
  const el = document.getElementById('year');
  if (!el) return;
  el.textContent = new Date().getFullYear();
}

renderCategoryNav();
renderProducts();
renderLookbook();
renderMetrics();
renderBenefits();
renderTrustPoints();
renderWeeklyDrop();
renderTestimonials();
renderMarquee();
setupModalClose();
setupCtaLink();
setYear();

