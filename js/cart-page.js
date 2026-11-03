/**
 * Página do Carrinho - Periféricos Tech
 * Lista completa de itens, resumo do pedido, ações
 */

(function() {
  'use strict';

  // Elementos DOM
  const elements = {
    itemsList: null,
    subtotalEl: null,
    shippingEl: null,
    totalEl: null,
    freeShippingProgress: null,
    freeShippingRemaining: null,
    clearCartBtn: null,
    checkoutBtn: null,
    checkoutBtnSidebar: null,
    saveForLaterBtn: null
  };

  const FREE_SHIPPING_THRESHOLD = 299.90;
  const STANDARD_SHIPPING = 29.90;

  function init() {
    cacheElements();
    bindEvents();
    render();
  }

  function cacheElements() {
    elements.itemsList = document.getElementById('cart-items-list');
    elements.subtotalEl = document.getElementById('summary-subtotal');
    elements.shippingEl = document.getElementById('summary-shipping');
    elements.totalEl = document.getElementById('summary-total');
    elements.freeShippingProgress = document.getElementById('free-shipping-progress');
    elements.freeShippingRemaining = document.getElementById('free-shipping-remaining');
    elements.clearCartBtn = document.getElementById('clear-cart-btn');
    elements.checkoutBtn = document.getElementById('checkout-btn');
    elements.checkoutBtnSidebar = document.getElementById('checkout-btn-sidebar');
    elements.saveForLaterBtn = document.getElementById('save-for-later-btn');
  }

  function bindEvents() {
    // Delegação para botões de quantidade e remover
    elements.itemsList?.addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('.qty-btn');
      const removeBtn = e.target.closest('.cart-item-remove');

      if (qtyBtn) {
        const itemId = parseInt(qtyBtn.dataset.id);
        const action = qtyBtn.dataset.action;
        updateQuantity(itemId, action);
      }

      if (removeBtn) {
        const itemId = parseInt(removeBtn.dataset.id);
        removeItem(itemId);
      }
    });

    // Limpar carrinho
    elements.clearCartBtn?.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja remover todos os itens do carrinho?')) {
        window.Cart?.clear();
        render();
      }
    });

    // Finalizar compra
    elements.checkoutBtn?.addEventListener('click', goToCheckout);
    elements.checkoutBtnSidebar?.addEventListener('click', goToCheckout);

    // Salvar para depois (mover para wishlist)
    elements.saveForLaterBtn?.addEventListener('click', saveCartForLater);

    // Atualizar quando carrinho mudar (via storage event)
    window.addEventListener('storage', (e) => {
      if (e.key === 'pt_cart') {
        render();
      }
    });

    // Escutar eventos customizados do carrinho
    window.addEventListener('cart-updated', render);
  }

  function render() {
    const items = window.Cart?.items?.() || [];
    renderItems(items);
    renderSummary(items);
    updateCheckoutButtons(items);
  }

  function renderItems(items) {
    if (!elements.itemsList) return;

    if (items.length === 0) {
      elements.itemsList.innerHTML = `
        <div style="text-align: center; padding: var(--space-16) var(--space-4);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 80px; height: 80px; margin: 0 auto var(--space-6); opacity: 0.3;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h2 style="font-size: var(--font-size-2xl); color: var(--color-gray-900); margin-bottom: var(--space-2);">Seu carrinho está vazio</h2>
          <p style="color: var(--color-gray-500); margin-bottom: var(--space-6); max-width: 400px; margin-left: auto; margin-right: auto;">Adicione produtos incríveis ao seu carrinho e finalize a compra.</p>
          <a href="categoria.html" class="btn btn-primary btn-lg">Ver produtos</a>
        </div>
      `;
      return;
    }

    elements.itemsList.innerHTML = items.map(item => `
      <article class="cart-page-item" data-id="${item.id}" style="display: grid; grid-template-columns: 100px 1fr auto auto; gap: var(--space-4); align-items: center; padding: var(--space-4) 0; border-bottom: 1px solid var(--color-gray-100);">
        <div class="cart-item-image" style="width: 100px; height: 100px; border-radius: var(--radius-md); overflow: hidden; background: var(--color-gray-100); flex-shrink: 0;">
          <img src="${item.image}" alt="${item.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="cart-item-info" style="min-width: 0;">
          <p class="cart-item-brand" style="font-size: var(--font-size-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1);">${item.brand}</p>
          <h3 class="cart-item-name" style="font-weight: var(--font-weight-semibold); color: var(--color-gray-900); margin-bottom: var(--space-2); line-height: 1.4;">${item.name}</h3>
          <div class="cart-item-price" style="font-weight: var(--font-weight-bold); color: var(--color-primary);">${formatPrice(item.price)}</div>
          ${item.maxStock && item.quantity >= item.maxStock ? `
            <p style="font-size: var(--font-size-xs); color: var(--color-warning); margin-top: var(--space-1);">Quantidade máxima atingida</p>
          ` : ''}
        </div>
        <div class="cart-item-qty" style="display: flex; align-items: center; justify-content: center;">
          <div class="cart-item-qty-input" style="display: flex; align-items: center; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); overflow: hidden;">
            <button class="qty-btn" data-id="${item.id}" data-action="decrease" aria-label="Diminuir quantidade" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: var(--color-gray-600);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <input type="number" class="qty-value" value="${item.quantity}" min="1" max="${item.maxStock || 99}" data-id="${item.id}" style="width: 60px; text-align: center; border: none; outline: none; font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-gray-900); border-left: 1px solid var(--color-gray-300); border-right: 1px solid var(--color-gray-300);">
            <button class="qty-btn" data-id="${item.id}" data-action="increase" aria-label="Aumentar quantidade" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: var(--color-gray-600);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>
        <div class="cart-item-total" style="text-align: right; min-width: 120px;">
          <div style="font-weight: var(--font-weight-bold); font-size: var(--font-size-lg); color: var(--color-gray-900);">${formatPrice(item.price * item.quantity)}</div>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Remover ${item.name}" style="margin-top: var(--space-2); font-size: var(--font-size-sm); color: var(--color-gray-400); display: flex; align-items: center; justify-content: flex-end; gap: var(--space-1);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remover
          </button>
        </div>
      </article>
    `).join('');

    // Bind events for quantity inputs
    elements.itemsList.querySelectorAll('.qty-value').forEach(input => {
      input.addEventListener('change', (e) => {
        const itemId = parseInt(e.target.dataset.id);
        let value = parseInt(e.target.value) || 1;
        const item = items.find(i => i.id === itemId);
        if (item) {
          value = Math.max(1, Math.min(value, item.maxStock || 99));
          setQuantity(itemId, value);
        }
      });
    });
  }

  function renderSummary(items) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const total = subtotal + shipping;
    const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    const formatPrice = window.formatPrice || (p => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    if (elements.subtotalEl) elements.subtotalEl.textContent = formatPrice(subtotal);
    if (elements.shippingEl) elements.shippingEl.textContent = shipping === 0 ? 'Grátis' : formatPrice(shipping);
    if (elements.totalEl) elements.totalEl.textContent = formatPrice(total);

    // Progresso frete grátis
    if (elements.freeShippingProgress && elements.freeShippingRemaining) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        elements.freeShippingProgress.style.display = 'none';
      } else {
        elements.freeShippingProgress.style.display = 'flex';
        elements.freeShippingRemaining.textContent = formatPrice(freeShippingRemaining);
      }
    }
  }

  function updateCheckoutButtons(items) {
    const hasItems = items.length > 0;
    const disabled = !hasItems;

    [elements.checkoutBtn, elements.checkoutBtnSidebar].forEach(btn => {
      if (btn) {
        btn.disabled = disabled;
        btn.style.opacity = disabled ? '0.5' : '1';
        btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
      }
    });
  }

  function updateQuantity(itemId, action) {
    window.Cart?.updateQuantity(itemId, action);
    // render() será chamado via evento cart-updated
  }

  function setQuantity(itemId, quantity) {
    const items = window.Cart?.items?.() || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const diff = quantity - item.quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        window.Cart?.updateQuantity(itemId, 'increase');
      }
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        window.Cart?.updateQuantity(itemId, 'decrease');
      }
    }
  }

  function removeItem(itemId) {
    window.Cart?.removeItem(itemId);
    // render() será chamado via evento cart-updated
  }

  function goToCheckout() {
    const items = window.Cart?.items?.() || [];
    if (items.length === 0) return;

    // Salvar dados do carrinho para a página de checkout
    sessionStorage.setItem('pt_checkout_data', JSON.stringify({
      items,
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      timestamp: Date.now()
    }));

    window.location.href = 'checkout.html';
  }

  function saveCartForLater() {
    const items = window.Cart?.items?.() || [];
    if (items.length === 0) {
      window.showToast?.('Carrinho vazio', 'info');
      return;
    }

    let saved = 0;
    items.forEach(item => {
      if (window.Wishlist?.addItem(item.id)) {
        saved++;
      }
    });

    if (saved > 0) {
      window.showToast?.(`${saved} item(s) movido(s) para favoritos`, 'success');
    } else {
      window.showToast?.('Itens já estão nos favoritos', 'info');
    }
  }

  function formatPrice(price) {
    return window.formatPrice ? window.formatPrice(price) : price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Inicializar
  document.addEventListener('DOMContentLoaded', init);

})();