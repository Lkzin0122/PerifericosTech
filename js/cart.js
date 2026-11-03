/**
 * Carrinho de Compras - Periféricos Tech
 * Gerencia estado do carrinho, persistência no localStorage e UI
 */

const Cart = (function() {
  'use strict';

  // Estado
  let items = [];
  let isOpen = false;

  // Elementos DOM
  const elements = {
    toggle: null,
    sidebar: null,
    overlay: null,
    closeBtn: null,
    content: null,
    footer: null,
    countBadge: null
  };

  // Inicialização
  function init() {
    cacheElements();
    loadFromStorage();
    bindEvents();
    render();
    updateCount();
  }

  function cacheElements() {
    elements.toggle = document.getElementById('cart-toggle');
    elements.sidebar = document.getElementById('cart-sidebar');
    elements.overlay = document.getElementById('cart-overlay');
    elements.closeBtn = document.getElementById('cart-close');
    elements.content = document.getElementById('cart-content');
    elements.footer = document.getElementById('cart-footer');
    elements.countBadge = document.getElementById('cart-count');
  }

  function bindEvents() {
    // Toggle carrinho
    elements.toggle?.addEventListener('click', toggle);
    elements.closeBtn?.addEventListener('click', close);
    elements.overlay?.addEventListener('click', close);

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) close();
    });

    // Delegação de eventos no conteúdo do carrinho
    elements.content?.addEventListener('click', handleContentClick);
  }

  function handleContentClick(e) {
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
  }

  // Persistência
  function saveToStorage() {
    try {
      localStorage.setItem('pt_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Falha ao salvar carrinho:', e);
    }
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('pt_cart');
      if (stored) {
        items = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Falha ao carregar carrinho:', e);
      items = [];
    }
  }

  // Operações do carrinho
  function addItem(product, quantity = 1) {
    const existingIndex = items.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      const newQty = items[existingIndex].quantity + quantity;
      if (newQty > (product.stockCount || 99)) {
        showToast('Estoque insuficiente', 'error');
        return false;
      }
      items[existingIndex].quantity = newQty;
    } else {
      if (quantity > (product.stockCount || 99)) {
        showToast('Estoque insuficiente', 'error');
        return false;
      }
      items.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0] || '',
        brand: product.brand,
        quantity,
        maxStock: product.stockCount || 99
      });
    }

    saveToStorage();
    render();
    updateCount();
    showToast(`${product.name} adicionado ao carrinho`, 'success');
    open();
    return true;
  }

  function removeItem(productId) {
    items = items.filter(item => item.id !== productId);
    saveToStorage();
    render();
    updateCount();
    showToast('Item removido do carrinho', 'info');
  }

  function updateQuantity(productId, action) {
    const item = items.find(i => i.id === productId);
    if (!item) return;

    if (action === 'increase') {
      if (item.quantity >= item.maxStock) {
        showToast('Quantidade máxima atingida', 'warning');
        return;
      }
      item.quantity++;
    } else if (action === 'decrease') {
      item.quantity--;
      if (item.quantity <= 0) {
        removeItem(productId);
        return;
      }
    }

    saveToStorage();
    render();
    updateCount();
  }

  function clear() {
    items = [];
    saveToStorage();
    render();
    updateCount();
  }

  function getTotalItems() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getSubtotal() {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function getItemCount(productId) {
    const item = items.find(i => i.id === productId);
    return item ? item.quantity : 0;
  }

  // UI
  function toggle() {
    isOpen ? close() : open();
  }

  function open() {
    isOpen = true;
    elements.sidebar?.classList.add('active');
    elements.overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    elements.toggle?.setAttribute('aria-expanded', 'true');
    render();
  }

  function close() {
    isOpen = false;
    elements.sidebar?.classList.remove('active');
    elements.overlay?.classList.remove('active');
    document.body.style.overflow = '';
    elements.toggle?.setAttribute('aria-expanded', 'false');
  }

  function render() {
    renderContent();
    renderFooter();
  }

  function renderContent() {
    if (!elements.content) return;

    if (items.length === 0) {
      elements.content.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p>Seu carrinho está vazio</p>
          <a href="categoria.html" class="btn btn-primary">Continuar comprando</a>
        </div>
      `;
      return;
    }

    elements.content.innerHTML = items.map(item => `
      <article class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">${formatPrice(item.price)}</span>
        </div>
        <div class="cart-item-controls">
          <div class="cart-item-qty">
            <button class="qty-btn" data-id="${item.id}" data-action="decrease" aria-label="Diminuir quantidade">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" data-id="${item.id}" data-action="increase" aria-label="Aumentar quantidade">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" aria-label="Remover ${item.name}">Remover</button>
        </div>
      </article>
    `).join('');
  }

  function renderFooter() {
    if (!elements.footer) return;

    const subtotal = getSubtotal();
    const shipping = subtotal >= 299.90 ? 0 : 29.90;
    const total = subtotal + shipping;

    elements.footer.innerHTML = `
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Frete</span>
          <span>${shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
        </div>
        ${shipping > 0 ? `
          <div class="summary-row" style="font-size: var(--font-size-xs); color: var(--color-accent);">
            <span>Frete grátis acima de R$ 299,90</span>
            <span>Faltam ${formatPrice(299.90 - subtotal)}</span>
          </div>
        ` : ''}
        <div class="summary-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>
      <div class="cart-actions">
        <a href="carrinho.html" class="btn btn-secondary btn-lg">Ver Carrinho</a>
        <a href="checkout.html" class="btn btn-primary btn-lg">Finalizar Compra</a>
      </div>
    `;
  }

  function updateCount() {
    const count = getTotalItems();
    if (elements.countBadge) {
      elements.countBadge.textContent = count;
      elements.countBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Toast notifications
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Fechar notificação">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.style.animation = 'slideInRight 0.25s ease reverse';
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slideInRight 0.25s ease reverse';
        setTimeout(() => toast.remove(), 250);
      }
    }, 4000);
  }

  // API pública
  return {
    init,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    getTotalItems,
    getSubtotal,
    getItemCount,
    open,
    close,
    toggle,
    items: () => [...items]
  };
})();

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => Cart.init());

// Exportar para uso global
window.Cart = Cart;