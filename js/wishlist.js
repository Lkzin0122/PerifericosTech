/**
 * Lista de Desejos (Wishlist) - Periféricos Tech
 * Gerencia favoritos do usuário com persistência no localStorage
 */

const Wishlist = (function() {
  'use strict';

  // Estado
  let items = [];

  // Elementos DOM
  const elements = {
    countBadge: null
  };

  // Inicialização
  function init() {
    cacheElements();
    loadFromStorage();
    updateCount();
    bindGlobalEvents();
  }

  function cacheElements() {
    elements.countBadge = document.getElementById('wishlist-count');
  }

  function bindGlobalEvents() {
    // Delegação para botões de wishlist em qualquer lugar da página
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.product-wishlist, .wishlist-btn, [data-wishlist-action]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const productId = parseInt(btn.dataset.id || btn.dataset.productId);
      const action = btn.dataset.wishlistAction || (btn.classList.contains('active') ? 'remove' : 'add');

      if (action === 'add' || !btn.classList.contains('active')) {
        addItem(productId);
      } else {
        removeItem(productId);
      }
    });
  }

  // Persistência
  function saveToStorage() {
    try {
      localStorage.setItem('pt_wishlist', JSON.stringify(items));
    } catch (e) {
      console.warn('Falha ao salvar wishlist:', e);
    }
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('pt_wishlist');
      if (stored) {
        items = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Falha ao carregar wishlist:', e);
      items = [];
    }
  }

  // Operações
  function addItem(productId) {
    if (items.includes(productId)) return false;

    items.push(productId);
    saveToStorage();
    updateCount();
    updateUI(productId, true);
    showToast('Adicionado aos favoritos', 'success');
    return true;
  }

  function removeItem(productId) {
    const index = items.indexOf(productId);
    if (index === -1) return false;

    items.splice(index, 1);
    saveToStorage();
    updateCount();
    updateUI(productId, false);
    showToast('Removido dos favoritos', 'info');
    return true;
  }

  function toggle(productId) {
    return hasItem(productId) ? removeItem(productId) : addItem(productId);
  }

  function hasItem(productId) {
    return items.includes(productId);
  }

  function clear() {
    items = [];
    saveToStorage();
    updateCount();
    updateAllUI();
  }

  function getItems() {
    return [...items];
  }

  function getProductItems() {
    return items.map(id => getProductById(id)).filter(Boolean);
  }

  // UI Updates
  function updateCount() {
    if (elements.countBadge) {
      elements.countBadge.textContent = items.length;
      elements.countBadge.style.display = items.length > 0 ? 'flex' : 'none';
    }
  }

  function updateUI(productId, isActive) {
    const selectors = [
      `.product-wishlist[data-id="${productId}"]`,
      `.wishlist-btn[data-id="${productId}"]`,
      `[data-wishlist-action][data-id="${productId}"]`,
      `[data-wishlist-action][data-product-id="${productId}"]`
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (isActive) {
          el.classList.add('active');
          el.setAttribute('aria-pressed', 'true');
          el.setAttribute('data-wishlist-action', 'remove');
        } else {
          el.classList.remove('active');
          el.setAttribute('aria-pressed', 'false');
          el.setAttribute('data-wishlist-action', 'add');
        }
      });
    });
  }

  function updateAllUI() {
    // Atualizar todos os botões na página
    document.querySelectorAll('.product-wishlist, .wishlist-btn, [data-wishlist-action]').forEach(btn => {
      const productId = parseInt(btn.dataset.id || btn.dataset.productId);
      if (productId) {
        const isActive = hasItem(productId);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
        btn.setAttribute('data-wishlist-action', isActive ? 'remove' : 'add');
      }
    });
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
    }, 3000);
  }

  // API pública
  return {
    init,
    addItem,
    removeItem,
    toggle,
    hasItem,
    clear,
    getItems,
    getProductItems,
    updateAllUI
  };
})();

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => Wishlist.init());

// Exportar para uso global
window.Wishlist = Wishlist;