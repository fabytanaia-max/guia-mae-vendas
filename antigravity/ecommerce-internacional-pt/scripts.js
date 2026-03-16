/* global window, document, localStorage, FormData */
const ORDER_STATUS = {
  PENDING: 'pending',
  CALLBACK_RECEIVED: 'callback_received',
  PAID: 'paid',
};

const runtime = {
  variant: 'A',
  activeOrder: null,
  attribution: {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  },
  config: {
    offerType: 'main_offer',
    productId: 'kit-hermetico-premium',
    bundleId: '12',
    anchorPrice: '79,90 EUR',
    prices: {
      A: '49,90 EUR',
      B: '44,90 EUR',
    },
  },
};

function ensureDataLayer() {
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
}

function track(eventName, payload = {}) {
  ensureDataLayer();
  window.dataLayer.push({
    event: eventName,
    ts: new Date().toISOString(),
    ...runtime.attribution,
    ...payload,
  });
}

function chooseVariant() {
  const params = new URLSearchParams(window.location.search);
  const forced = params.get('price_variant');
  if (forced === 'A' || forced === 'B') {
    localStorage.setItem('priceVariantEcomV1', forced);
    return forced;
  }

  const key = 'priceVariantEcomV1';
  const existing = localStorage.getItem(key);
  if (existing === 'A' || existing === 'B') {
    return existing;
  }

  const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(key, randomVariant);
  return randomVariant;
}

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  };

  const hasIncomingUtm = Object.values(utm).some((value) => value);
  const storageKey = 'ecomAttributionV1';
  if (hasIncomingUtm) {
    localStorage.setItem(storageKey, JSON.stringify(utm));
    runtime.attribution = utm;
    return;
  }

  const persisted = localStorage.getItem(storageKey);
  if (persisted) {
    try {
      runtime.attribution = JSON.parse(persisted);
    } catch (_error) {
      runtime.attribution = utm;
    }
  } else {
    runtime.attribution = utm;
  }
}

function readPageConfig() {
  const { dataset } = document.body;
  runtime.config = {
    offerType: dataset.offerType || 'main_offer',
    productId: dataset.productId || 'kit-hermetico-premium',
    bundleId: dataset.bundleId || '12',
    anchorPrice: dataset.anchorPrice || '79,90 EUR',
    prices: {
      A: dataset.priceA || '49,90 EUR',
      B: dataset.priceB || '44,90 EUR',
    },
  };
}

function applyPrice(variant) {
  const offer = document.getElementById('preco-oferta');
  const anchor = document.getElementById('preco-ancora');
  const tag = document.getElementById('price-variant');
  if (offer) {
    offer.textContent = runtime.config.prices[variant];
  }
  if (anchor) {
    anchor.textContent = `De ${runtime.config.anchorPrice}`;
  }
  if (tag) {
    tag.textContent = `Variante ${variant}`;
  }
}

function getGatewayAdapter(method) {
  if (method === 'usdc') {
    return {
      provider: 'usdc',
      createCheckoutUrl: () => 'https://pay.example/crypto/usdc',
    };
  }

  return {
    provider: 'local_gateway',
    createCheckoutUrl: () => 'https://pay.example/local-gateway',
  };
}

function generateOrderId() {
  return `ord_${Date.now()}`;
}

function createOrder({ customerName, customerEmail, paymentMethod }) {
  const adapter = getGatewayAdapter(paymentMethod);
  const order = {
    id: generateOrderId(),
    customerName,
    customerEmail,
    paymentMethod,
    provider: adapter.provider,
    checkoutUrl: adapter.createCheckoutUrl(),
    amount: runtime.config.prices[runtime.variant],
    offerType: runtime.config.offerType,
    productId: runtime.config.productId,
    bundleId: runtime.config.bundleId,
    attribution: runtime.attribution,
    status: ORDER_STATUS.PENDING,
    createdAt: new Date().toISOString(),
  };
  runtime.activeOrder = order;
  return order;
}

function updateOrderStatus(nextStatus) {
  if (!runtime.activeOrder) return;
  runtime.activeOrder = {
    ...runtime.activeOrder,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };
}

function renderOrderState() {
  const statusEl = document.getElementById('order-status');
  const debugEl = document.getElementById('order-debug');
  const callbackBtn = document.getElementById('callback-btn');
  const webhookBtn = document.getElementById('webhook-btn');

  if (!runtime.activeOrder) {
    if (statusEl) statusEl.textContent = 'Sem checkout iniciado.';
    if (debugEl) debugEl.textContent = 'Nenhum pedido.';
    if (callbackBtn) callbackBtn.disabled = true;
    if (webhookBtn) webhookBtn.disabled = true;
    return;
  }

  const statusLabel = runtime.activeOrder.status;
  if (statusEl) {
    statusEl.textContent = `Pedido ${runtime.activeOrder.id} em ${statusLabel}.`;
  }
  if (debugEl) {
    debugEl.textContent = JSON.stringify(runtime.activeOrder, null, 2);
  }
  if (callbackBtn) {
    callbackBtn.disabled = runtime.activeOrder.status !== ORDER_STATUS.PENDING;
  }
  if (webhookBtn) {
    webhookBtn.disabled = runtime.activeOrder.status === ORDER_STATUS.PAID;
  }
}

function bindCtas() {
  document.querySelectorAll('[data-track="add_to_cart"]').forEach((button) => {
    button.addEventListener('click', () => {
      track('AddToCart', {
        product: 'kit-hermetico-premium',
        bundle: runtime.config.bundleId,
        offerType: runtime.config.offerType,
        variant: runtime.variant,
        price: runtime.config.prices[runtime.variant],
      });
    });
  });

  document.querySelectorAll('[data-track="initiate_checkout"]').forEach((button) => {
    button.addEventListener('click', () => {
      track('InitiateCheckout', {
        product: runtime.config.productId,
        bundle: runtime.config.bundleId,
        offerType: runtime.config.offerType,
        variant: runtime.variant,
        price: runtime.config.prices[runtime.variant],
      });
      const checkoutSection = document.getElementById('checkout');
      if (checkoutSection) checkoutSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function bindCheckoutFlow() {
  const form = document.getElementById('checkout-form');
  const callbackBtn = document.getElementById('callback-btn');
  const webhookBtn = document.getElementById('webhook-btn');
  if (!form || !callbackBtn || !webhookBtn) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const order = createOrder({
      customerName: String(formData.get('customerName') || '').trim(),
      customerEmail: String(formData.get('customerEmail') || '').trim(),
      paymentMethod: String(formData.get('paymentMethod') || 'local_gateway'),
    });

    track('InitiateCheckout', {
      orderId: order.id,
      provider: order.provider,
      method: order.paymentMethod,
      offerType: runtime.config.offerType,
      variant: runtime.variant,
      price: order.amount,
    });
    renderOrderState();
  });

  callbackBtn.addEventListener('click', () => {
    if (!runtime.activeOrder) return;
    updateOrderStatus(ORDER_STATUS.CALLBACK_RECEIVED);
    track('PaymentCallback', {
      orderId: runtime.activeOrder.id,
      provider: runtime.activeOrder.provider,
    });
    renderOrderState();
  });

  webhookBtn.addEventListener('click', () => {
    if (!runtime.activeOrder) return;
    updateOrderStatus(ORDER_STATUS.PAID);
    track('PaymentWebhookConfirmed', {
      orderId: runtime.activeOrder.id,
      provider: runtime.activeOrder.provider,
      amount: runtime.activeOrder.amount,
    });
    renderOrderState();
  });
}

function init() {
  readAttribution();
  readPageConfig();
  runtime.variant = chooseVariant();
  applyPrice(runtime.variant);
  bindCtas();
  bindCheckoutFlow();
  renderOrderState();

  track('ViewContent', {
    page: 'landing-v1-pt',
    product: runtime.config.productId,
    bundle: runtime.config.bundleId,
    offerType: runtime.config.offerType,
    variant: runtime.variant,
    price: runtime.config.prices[runtime.variant],
  });
}

document.addEventListener('DOMContentLoaded', init);
