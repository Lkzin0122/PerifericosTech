/**
 * Main JavaScript - Periféricos Tech
 * Funcionalidades principais da home page e utilitários globais
 */

(function() {
  'use strict';

  // ========================================
  // UTILITÁRIOS
  // ========================================

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function formatPrice(price) {
    return window.formatPrice ? window.formatPrice(price) : price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function getDiscountPercent(original, current) {
    return window.getDiscountPercent ? window.getDiscountPercent(original, current) : 0;
  }

  // ========================================
  // RENDERIZAÇÃO DE PRODUTOS
  // ========================================

  function createProductCard(product) {
    const discount = getDiscountPercent(product.originalPrice, product.price);
    const inStock = product.inStock && product.stockCount > 0;
    const isWishlisted = window.Wishlist?.hasItem?.(product.id) || false;

    return `
      <article class="product-card${!inStock ? ' out-of-stock' : ''}" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.images?.[0] || 'https://via.placeholder.com/400x400/1e3a5f/fff?text=Sem+Imagem'}" 
               alt="${product.name}" 
               loading="lazy"
               width="400" height="400">
          
          ${product.badge ? `
            <div class="product-badges">
              <span class="badge badge-${product.badgeType || 'new'}">${product.badge}</span>
              ${discount > 0 ? `<span class="badge badge-sale">-${discount}%</span>` : ''}
            </div>
          ` : discount > 0 ? `
            <div class="product-badges">
              <span class="badge badge-sale">-${discount}%</span>
            </div>
          ` : ''}

          <button class="product-wishlist${isWishlisted ? ' active' : ''}" 
                  data-id="${product.id}" 
                  aria-label="${isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
                  aria-pressed="${isWishlisted}"
                  data-wishlist-action="${isWishlisted ? 'remove' : 'add'}">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="product-info">
          <span class="product-brand">${product.brand}</span>
          <h3 class="product-name">${product.name}</h3>
          
          <div class="product-rating">
            <div class="stars" aria-label="${product.rating} de 5 estrelas">
              ${renderStars(product.rating)}
            </div>
            <span class="rating-value">${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>

          <div class="product-price">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.originalPrice && product.originalPrice > product.price ? `
              <span class="original-price">${formatPrice(product.originalPrice)}</span>
            ` : ''}
          </div>

          <div class="product-actions">
            <button class="btn btn-primary btn-sm add-to-cart-btn" 
                    data-id="${product.id}"
                    ${!inStock ? 'disabled' : ''}
                    aria-label="${inStock ? `Adicionar ${product.name} ao carrinho` : 'Produto indisponível'}">
              ${inStock ? 'Comprar' : 'Indisponível'}
            </button>
            <button class="btn btn-icon btn-sm btn-outline quick-view-btn" 
                    data-id="${product.id}"
                    aria-label="Visualização rápida de ${product.name}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<svg class="filled" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else if (i === fullStars + 1 && hasHalf) {
        html += '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else {
        html += '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      }
    }
    return html;
  }

  function renderProductsGrid(containerId, products, emptyMessage = 'Nenhum produto encontrado') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!products || products.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: var(--space-12);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 64px; height: 64px; margin: 0 auto var(--space-4); opacity: 0.3;">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <p style="color: var(--color-gray-500); font-size: var(--font-size-lg);">${emptyMessage}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(createProductCard).join('');
  }

  // ========================================
  // CATEGORIAS
  // ========================================

  function renderCategories() {
    const container = document.getElementById('categories-grid');
    if (!container || !window.CATEGORIES) return;

    const categoryIcons = {
      mouse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
      keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h12M6 12h10M6 16h8"/></svg>',
      headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-3 9 3M4 14v7"/><path d="M21 14v-7"/><path d="M12 14v7"/></svg>',
      monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
      'mouse-pointer-2': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>'
    };

    container.innerHTML = window.CATEGORIES.map(cat => `
      <a href="categoria.html?cat=${cat.id}" class="category-card" aria-label="${cat.name} (${cat.count} produtos)">
        <div class="category-icon">${categoryIcons[cat.icon] || ''}</div>
        <span>${cat.name}</span>
      </a>
    `).join('');
  }

  // ========================================
  // MARCAS
  // ========================================

  function renderBrands() {
    const container = document.getElementById('brands-grid');
    if (!container || !window.BRANDS) return;

    // SVGs simplificados das logos das marcas
    const brandLogos = {
      'Logitech': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e3a5f" text-anchor="middle">LOGITECH</text></svg>',
      'Razer': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e3a5f" text-anchor="middle">RAZER</text></svg>',
      'Corsair': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#1e3a5f" text-anchor="middle">CORSAIR</text></svg>',
      'Keychron': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="600" font-size="22" fill="#1e3a5f" text-anchor="middle">KEYCHRON</text></svg>',
      'Sony': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e3a5f" text-anchor="middle">SONY</text></svg>',
      'LG': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#1e3a5f" text-anchor="middle">LG</text></svg>',
      'Samsung': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="600" font-size="22" fill="#1e3a5f" text-anchor="middle">SAMSUNG</text></svg>',
      'Ergotron': '<svg viewBox="0 0 120 40"><text x="60" y="28" font-family="Arial, sans-serif" font-weight="600" font-size="20" fill="#1e3a5f" text-anchor="middle">ERGOTRON</text></svg>'
    };

    container.innerHTML = window.BRANDS.map(brand => `
      <a href="marca.html?brand=${encodeURIComponent(brand)}" class="brand-logo" aria-label="${brand}">
        ${brandLogos[brand] || `<span style="font-weight: 600; color: var(--color-gray-600);">${brand}</span>`}
      </a>
    `).join('');
  }

  // ========================================
  // BUSCA
  // ========================================

  function initSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    if (!input || !resultsContainer) return;

    const debouncedSearch = debounce(performSearch, 200);

    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length >= 2) {
        debouncedSearch(query);
      } else {
        hideResults();
      }
    });

    input.addEventListener('focus', () => {
      if (input.value.trim().length >= 2) {
        performSearch(input.value.trim());
      }
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        hideResults();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideResults();
        input.blur();
      }
    });

    function performSearch(query) {
      const results = window.searchProducts ? window.searchProducts(query) : [];
      const limited = results.slice(0, 5);

      if (limited.length === 0) {
        resultsContainer.innerHTML = `
          <div class="search-no-results" style="padding: var(--space-4); text-align: center; color: var(--color-gray-500);">
            Nenhum produto encontrado para "${escapeHtml(query)}"
          </div>
        `;
      } else {
        resultsContainer.innerHTML = limited.map(product => `
          <a href="produto.html?slug=${product.slug}" class="search-result-item" style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); transition: background var(--transition-fast);" onmouseover="this.style.background='var(--color-gray-50)'" onmouseout="this.style.background=''">
            <img src="${product.images?.[0] || ''}" alt="" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm);">
            <div style="flex: 1; min-width: 0;">
              <span style="font-size: var(--font-size-xs); color: var(--color-gray-500); text-transform: uppercase;">${product.brand}</span>
              <div style="font-weight: var(--font-weight-medium); color: var(--color-gray-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</div>
              <span style="font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); color: var(--color-primary);">${formatPrice(product.price)}</span>
            </div>
          </a>
        `).join('') + `
          <a href="busca.html?q=${encodeURIComponent(query)}" class="search-view-all" style="display: block; padding: var(--space-3); text-align: center; color: var(--color-primary); font-weight: var(--font-weight-medium); border-top: 1px solid var(--color-gray-200);">
            Ver todos os resultados para "${escapeHtml(query)}"
          </a>
        `;
      }

      showResults();
    }

    function showResults() {
      resultsContainer.classList.add('active');
    }

    function hideResults() {
      resultsContainer.classList.remove('active');
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ========================================
  // NEWSLETTER
  // ========================================

  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();

      if (!email || !validateEmail(email)) {
        showFormError(input, 'Digite um e-mail válido');
        return;
      }

      // Simular envio
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Cadastrando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Cadastrado!';
        btn.style.background = 'var(--color-accent)';
        btn.style.borderColor = 'var(--color-accent)';
        input.value = '';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          showToast('E-mail cadastrado com sucesso! Verifique sua caixa de entrada.', 'success');
        }, 1500);
      }, 800);
    });

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormError(input, message) {
      input.style.borderColor = 'var(--color-error)';
      input.focus();
      setTimeout(() => input.style.borderColor = '', 3000);
    }
  }

  // ========================================
  // EVENTOS GLOBAIS DE PRODUTOS
  // ========================================

  function initProductEvents() {
    // Add to cart
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart-btn');
      if (btn && !btn.disabled) {
        const productId = parseInt(btn.dataset.id);
        const product = window.getProductById?.(productId);
        if (product) {
          window.Cart?.addItem(product);
        }
      }
    });

    // Quick view
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-view-btn');
      if (btn) {
        const productId = parseInt(btn.dataset.id);
        openQuickView(productId);
      }
    });
  }

  function openQuickView(productId) {
    const product = window.getProductById?.(productId);
    if (!product) return;

    // Criar modal de quick view
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
      <div class="quick-view-overlay" aria-hidden="true"></div>
      <div class="quick-view-panel" role="dialog" aria-modal="true" aria-labelledby="qv-title">
        <button class="quick-view-close" aria-label="Fechar visualização rápida">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="quick-view-content">
          <div class="qv-gallery">
            <img src="${product.images?.[0]}" alt="${product.name}" id="qv-main-img">
            <div class="qv-thumbs">
              ${product.images?.slice(0, 4).map((img, i) => `
                <img src="${img}" alt="${product.name} - visão ${i+1}" class="${i===0?'active':''}" data-index="${i}">
              `).join('')}
            </div>
          </div>
          <div class="qv-info">
            <span class="product-brand">${product.brand}</span>
            <h2 id="qv-title">${product.name}</h2>
            <div class="product-rating">
              <div class="stars">${renderStars(product.rating)}</div>
              <span class="rating-value">${product.rating.toFixed(1)}</span>
              <span class="rating-count">(${product.reviewCount} avaliações)</span>
            </div>
            <div class="product-price" style="margin: var(--space-4) 0;">
              <span class="current-price">${formatPrice(product.price)}</span>
              ${product.originalPrice && product.originalPrice > product.price ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <p style="color: var(--color-gray-600); margin-bottom: var(--space-4); line-height: var(--line-height-relaxed);">${product.description}</p>
            <div class="product-actions">
              <button class="btn btn-primary btn-lg add-to-cart-btn" data-id="${product.id}" style="flex: 1;">Adicionar ao Carrinho</button>
            </div>
            <div style="margin-top: var(--space-6); padding-top: var(--space-4); border-top: 1px solid var(--color-gray-200);">
              <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-3);">Especificações</h4>
              <dl style="display: grid; grid-template-columns: auto 1fr; gap: var(--space-2) var(--space-4); font-size: var(--font-size-sm);">
                ${Object.entries(product.specs || {}).map(([key, value]) => `
                  <dt style="color: var(--color-gray-500);">${key}</dt>
                  <dd style="color: var(--color-gray-900); font-weight: var(--font-weight-medium);">${value}</dd>
                `).join('')}
              </dl>
            </div>
          </div>
        </div>
      </div>
    `;

    // Estilos inline para o modal
    const style = document.createElement('style');
    style.textContent = `
      .quick-view-modal { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: var(--space-4); }
      .quick-view-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); animation: fadeIn 0.2s ease; }
      .quick-view-panel { position: relative; background: var(--color-white); border-radius: var(--radius-xl); max-width: 900px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; animation: slideUp 0.3s ease; box-shadow: var(--shadow-xl); }
      .quick-view-close { position: absolute; top: var(--space-4); right: var(--space-4); width: 40px; height: 40px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: var(--color-gray-500); z-index: 1; background: var(--color-white); box-shadow: var(--shadow-md); }
      .quick-view-close:hover { background: var(--color-gray-100); color: var(--color-gray-900); }
      .quick-view-content { display: grid; grid-template-columns: 1fr 1fr; max-height: 90vh; }
      .qv-gallery { position: relative; background: var(--color-gray-100); padding: var(--space-6); display: flex; flex-direction: column; align-items: center; }
      #qv-main-img { max-width: 100%; max-height: 400px; border-radius: var(--radius-lg); }
      .qv-thumbs { display: flex; gap: var(--space-2); margin-top: var(--space-4); }
      .qv-thumbs img { width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); cursor: pointer; opacity: 0.5; border: 2px solid transparent; transition: all var(--transition-fast); }
      .qv-thumbs img:hover, .qv-thumbs img.active { opacity: 1; border-color: var(--color-primary); }
      .qv-info { padding: var(--space-6); overflow-y: auto; }
      @media (max-width: 768px) { .quick-view-content { grid-template-columns: 1fr; } .qv-gallery { order: -1; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Troca de imagem principal
    modal.querySelectorAll('.qv-thumbs img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const mainImg = modal.querySelector('#qv-main-img');
        mainImg.src = thumb.src;
        modal.querySelectorAll('.qv-thumbs img').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Fechar modal
    const closeModal = () => {
      modal.style.animation = 'fadeOut 0.2s ease forwards';
      setTimeout(() => {
        modal.remove();
        style.remove();
        document.body.style.overflow = '';
      }, 200);
    };

    modal.querySelector('.quick-view-close').addEventListener('click', closeModal);
    modal.querySelector('.quick-view-overlay').addEventListener('click', closeModal);

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });

    // Botão add to cart no modal
    modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      window.Cart?.addItem(product);
      closeModal();
    });
  }

  // ========================================
  // TOAST GLOBAL
  // ========================================

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

  // Expor globalmente
  window.showToast = showToast;

  // ========================================
  // INICIALIZAÇÃO DA HOME PAGE
  // ========================================

  function initHomePage() {
    // Renderizar seções da home
    renderCategories();
    renderBrands();

    // Produtos em destaque
    const featured = window.getFeaturedProducts?.(8) || [];
    renderProductsGrid('featured-grid', featured, 'Nenhum produto em destaque no momento');

    // Lançamentos
    const newProducts = window.getNewProducts?.(8) || [];
    renderProductsGrid('new-grid', newProducts, 'Nenhum lançamento disponível');

    // Inicializar busca
    initSearch();

    // Inicializar newsletter
    initNewsletter();

    // Eventos de produtos
    initProductEvents();

    // Atualizar UI da wishlist após renderizar
    setTimeout(() => window.Wishlist?.updateAllUI?.(), 100);
  }

  // ========================================
  // BOOTSTRAP
  // ========================================

  document.addEventListener('DOMContentLoaded', () => {
    // Inicializar home page se estiver na index
    if (document.getElementById('featured-grid') || document.getElementById('categories-grid')) {
      initHomePage();
    }

    // Inicializar tooltips nativos
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      // Tooltips são feitos via CSS
    });
  });

})();